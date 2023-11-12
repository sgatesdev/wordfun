package handlers

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

// AudioHandler returns a random list of Words
type AudioHandler struct {
	Router *mux.Router
}

// NewAudioHandler creates a new list handler
func NewAudioHandler(router *mux.Router) *AudioHandler {
	return &AudioHandler{
		Router: router,
	}
}

// ServeHTTP implements the http.Handler interface
func (h *AudioHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.Router.ServeHTTP(w, r)
}

// RegisterRoutes registers routes for the list handler
func (h *AudioHandler) RegisterRoutes() {
	h.Router.HandleFunc("/audio/{path:.*}", h.GetAudioFile)
}

// GetList returns a random list of Words
func (h *AudioHandler) GetAudioFile(w http.ResponseWriter, r *http.Request) {
	path := "./" + r.URL.Path
	fmt.Println(path)
	http.ServeFile(w, r, path)
}
