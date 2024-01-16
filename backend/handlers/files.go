package handlers

import (
	"net/http"
	"os"

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
	h.Router.HandleFunc("/files/worksheets/{path:.*}", h.GetWorksheetFile)
}

// serve audio file
func (h *FileHandler) GetAudioFile(w http.ResponseWriter, r *http.Request) {
	path := prependPath(r.URL.Path)
	http.ServeFile(w, r, path)
}

// serve picture file
func (h *FileHandler) GetPictureFile(w http.ResponseWriter, r *http.Request) {
	path := prependPath(r.URL.Path)
	http.ServeFile(w, r, path)
}

// serve worksheet sPDF
func (h *FileHandler) GetWorksheetFile(w http.ResponseWriter, r *http.Request) {
	path := prependPath(r.URL.Path)
	http.ServeFile(w, r, path)
}

// prepend path with . if local mode
func prependPath(path string) string {
	if localMode() {
		return "." + path
	}
	return path
}

func localMode() bool {
	val, ok := os.LookupEnv("WORDFUN_LOCAL_MODE")
	if ok && val == "true" {
		return true
	}
	return false
}
