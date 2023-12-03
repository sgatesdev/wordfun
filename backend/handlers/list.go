package handlers

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"samgates.io/wordfun/models"
)

// ListHandler returns a random list of Words
type ListHandler struct {
	Router *mux.Router
}

// NewListHandler creates a new list handler
func NewListHandler(router *mux.Router) *ListHandler {
	return &ListHandler{
		Router: router,
	}
}

// ServeHTTP implements the http.Handler interface
func (h *ListHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.Router.ServeHTTP(w, r)
}

// RegisterRoutes registers routes for the list handler
func (h *ListHandler) RegisterRoutes() {
	h.Router.HandleFunc("/list", h.GetList).Methods("GET")
}

// GetList returns a random list of Words
func (h *ListHandler) GetList(w http.ResponseWriter, r *http.Request) {
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

	// get a random list of files
	words := make([]models.Word, 0)
	for _, v := range fileInfo {
		w := strings.Split(v.Name(), ".")
		words = append(words, models.Word{
			Word:      w[0],
			AudioFile: "/files/audio/" + v.Name(),
		})
	}

	// randomly sort slice and return only 10
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(words), func(i, j int) { words[i], words[j] = words[j], words[i] })
	words = words[:10]

	// return the list of words
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(words)
}
