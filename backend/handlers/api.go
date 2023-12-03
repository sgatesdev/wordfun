package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"sync"

	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	"cloud.google.com/go/texttospeech/apiv1/texttospeechpb"

	"github.com/gorilla/mux"
	models "samgates.io/wordfun/models"
)

// TextToSpeechHandler handles stocks
type TextToSpeechHandler struct {
	Router *mux.Router
}

// NewTextToSpeechHandler creates a new stock handler
func NewTextToSpeechHandler(router *mux.Router) *TextToSpeechHandler {
	return &TextToSpeechHandler{
		Router: router,
	}
}

// ServeHTTP implements the http.Handler interface
func (h *TextToSpeechHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.Router.ServeHTTP(w, r)
}

// RegisterRoutes registers routes for the stock handler
func (h *TextToSpeechHandler) RegisterRoutes() {
	h.Router.HandleFunc("/generate", h.handleGenerateAudio).Methods("POST")
}

// handleGenerateAudio handles generating audio for a batch of words
func (h *TextToSpeechHandler) handleGenerateAudio(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	words := models.GenerateRequest{}
	err = json.Unmarshal(body, &words)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// generate audio files
	ctx := r.Context()

	client, err := texttospeech.NewClient(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	//
	var wg sync.WaitGroup
	statusChannel := make(chan string)

	for _, word := range words.Words {
		wg.Add(1)
		go func(word string) {
			defer wg.Done()

			err, msg := generateAudioFile(client, ctx, word)
			if err != nil {
				statusChannel <- fmt.Sprintf("Finished job %s", word)
			} else {
				statusChannel <- msg
			}
		}(word)
	}

	go func() {
		wg.Wait()
		close(statusChannel)
	}()

	statusRes := make([]string, 0)
	for status := range statusChannel {
		statusRes = append(statusRes, status)
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(statusRes)
}

func generateAudioFile(client *texttospeech.Client, ctx context.Context, text string) (error, string) {
	// Perform the text-to-speech request on the text input with the selected
	// voice parameters and audio file type.
	req := texttospeechpb.SynthesizeSpeechRequest{
		// Set the text input to be synthesized.
		Input: &texttospeechpb.SynthesisInput{
			InputSource: &texttospeechpb.SynthesisInput_Text{Text: text},
		},
		// Build the voice request, select the language code ("en-US") and the SSML
		// voice gender ("neutral").
		Voice: &texttospeechpb.VoiceSelectionParams{
			LanguageCode: "en-US",
			SsmlGender:   texttospeechpb.SsmlVoiceGender_NEUTRAL,
		},
		// Select the type of audio file you want returned.
		AudioConfig: &texttospeechpb.AudioConfig{
			AudioEncoding: texttospeechpb.AudioEncoding_MP3,
		},
	}

	resp, err := client.SynthesizeSpeech(ctx, &req)
	if err != nil {
		return err, ""
	}

	// The resp's AudioContent is binary.
	path, ok := os.LookupEnv("AUDIO_FILES_DIR")
	if !ok {
		log.Fatal("AUDIO_FILES_DIR not set")
	}
	filename := fmt.Sprintf("%s%s.mp3", path, text)
	err = ioutil.WriteFile(filename, resp.AudioContent, 0777)
	if err != nil {
		return err, ""
	}
	return nil, fmt.Sprintf("Audio content written to file: %v", filename)
}
