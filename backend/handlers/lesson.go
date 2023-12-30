package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"samgates.io/wordfun/models"
)

// LessonHandler returns a random list of Words
type LessonHandler struct {
	Router *mux.Router
	db     *gorm.DB
}

// NewLessonHandler creates a new list handler
func NewLessonHandler(router *mux.Router, db *gorm.DB) *LessonHandler {
	return &LessonHandler{
		Router: router,
		db:     db,
	}
}

// ServeHTTP implements the http.Handler interface
func (h *LessonHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.Router.ServeHTTP(w, r)
}

// RegisterRoutes registers routes for the list handler
func (h *LessonHandler) RegisterRoutes() {
	h.Router.HandleFunc("/lesson", h.GetLesson).Methods("GET")
	h.Router.HandleFunc("/lesson", h.SaveLesson).Methods("POST")
}

// GetLesson returns a random collection of Words
func (h *LessonHandler) GetLesson(w http.ResponseWriter, r *http.Request) {
	path, ok := os.LookupEnv("AUDIO_FILES_DIR")
	if !ok {
		w.WriteHeader(http.StatusInternalServerError)
		log.Fatal("AUDIO_FILES_DIR not set")
	}

	path = strings.ReplaceAll(path, "\"", "")
	files, err := os.Open(path)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Fatal(err)
	}

	defer files.Close()

	// geta list of all files in the directory
	fileInfo, err := files.Readdir(-1)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Fatal(err)
	}

	// get list of words successfully spelled in last 5 days from db
	recentWords := h.getRecentWords()

	// get a random list of files
	words := make([]models.Word, 0)
	backupWords := make([]models.Word, 0)

	for _, v := range fileInfo {
		filename := strings.Split(v.Name(), ".")
		word := filename[0]
		wordModel := models.Word{
			Word:      word,
			AudioFile: "/files/audio/" + v.Name(),
		}

		if _, ok := recentWords[word]; !ok {
			words = append(words, wordModel)
		} else {
			fmt.Println("IGNORED: ", word)
			backupWords = append(backupWords, wordModel)
		}
	}

	finalWordList := make([]models.Word, 0)

	// get two words with length less than 4
	addWordsByLengthToCollection(words, backupWords, &finalWordList, 1, 4, 2)

	// get 5 words with length from 4-6
	addWordsByLengthToCollection(words, backupWords, &finalWordList, 4, 6, 5)

	// get 3 words with length from 7+
	addWordsByLengthToCollection(words, backupWords, &finalWordList, 7, 100, 3)

	// shuffle words
	finalWordList = shuffleWords(finalWordList, len(finalWordList))

	for _, v := range finalWordList {
		fmt.Println(v.Word)
	}

	// return the list of words
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(finalWordList)
}

func (h *LessonHandler) getRecentWords() (words map[string]bool) {
	recentWords := []models.WordResult{}
	err := h.db.Where("created_at >= NOW() - INTERVAL '5 days'").Find(&recentWords).Error
	if err != nil {
		return nil
	}

	words = make(map[string]bool)
	for _, v := range recentWords {
		words[v.Word] = true
	}
	return words
}

func shuffleWords(incomingWords []models.Word, number int) (words []models.Word) {
	// randomly sort slice and return only 10
	rand.Shuffle(len(incomingWords), func(i, j int) { incomingWords[i], incomingWords[j] = incomingWords[j], incomingWords[i] })
	if len(incomingWords) < number {
		number = len(incomingWords)
	}
	words = incomingWords[:number]
	return words
}

func addWordsByLengthToCollection(incomingWords []models.Word, backupWords []models.Word, outgoingCollection *[]models.Word, charLengthBegin int, charLengthEnd int, numItems int) {
	allWordsInSelection := make([]models.Word, 0)
	for _, v := range incomingWords {
		if len(v.Word) >= charLengthBegin && len(v.Word) < charLengthEnd {
			allWordsInSelection = append(allWordsInSelection, v)
		}
	}

	// go with backups
	if len(allWordsInSelection) < numItems {
		for _, v := range backupWords {
			if len(v.Word) >= charLengthBegin && len(v.Word) < charLengthEnd {
				allWordsInSelection = append(allWordsInSelection, v)
			}
		}
	}

	fmt.Println("Char length:", charLengthBegin, "-", charLengthEnd, ". Total words:", len(allWordsInSelection))
	randomWordsInSelection := shuffleWords(allWordsInSelection, numItems)
	*outgoingCollection = append(*outgoingCollection, randomWordsInSelection...)
}

// SaveLesson saves a lesson to the db
func (h *LessonHandler) SaveLesson(w http.ResponseWriter, r *http.Request) {
	// save the lesson to the db
	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	req := models.LessonReq{}
	err = json.Unmarshal(body, &req)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	lesson := models.Lesson{
		ID:        uuid.NewString(),
		CreatedAt: time.Now(),
		Words:     strings.Join(req.Words, ","),
	}

	err = h.db.Save(&lesson).Error
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(lesson)
}
