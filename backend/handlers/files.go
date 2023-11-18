package handlers

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

// FileHandler returns a random list of Words
type FileHandler struct {
	Router *mux.Router
}

// NewFileHandler creates a new list handler
func NewFileHandler(router *mux.Router) *FileHandler {
	return &FileHandler{
		Router: router,
	}
}

// ServeHTTP implements the http.Handler interface
func (h *FileHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.Router.ServeHTTP(w, r)
}

// RegisterRoutes registers routes for the list handler
func (h *FileHandler) RegisterRoutes() {
	h.Router.HandleFunc("/files/audio/{path:.*}", h.GetAudioFile)
	h.Router.HandleFunc("/files/pictures/{path:.*}", h.GetPictureFile)
}

// GetAudioFile returns audio file
func (h *FileHandler) GetAudioFile(w http.ResponseWriter, r *http.Request) {
	path := "." + r.URL.Path
	fmt.Println(path)
	http.ServeFile(w, r, path)
}

// GetList returns a random list of Words
func (h *FileHandler) GetPictureFile(w http.ResponseWriter, r *http.Request) {
	path := "." + r.URL.Path
	fmt.Println(path)
	http.ServeFile(w, r, path)
}
