package handlers

import (
	"net/http"

	"github.com/gorilla/mux"
)

// SiteHandler serves the frontend
type SiteHandler struct {
	Router *mux.Router
}

// NewSiteHandler creates a new list handler
func NewSiteHandler(router *mux.Router) *SiteHandler {
	return &SiteHandler{
		Router: router,
	}
}

// ServeHTTP implements the http.Handler interface
func (h *SiteHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.Router.ServeHTTP(w, r)
}

// RegisterRoutes registers routes for frontend handler
func (h *SiteHandler) RegisterRoutes() {
	h.Router.HandleFunc("/upload", h.ServeReactApp)
	h.Router.HandleFunc("/{path:.*}", h.GetFrontendFiles)
}

// Getfrontendfiles returns frontend files
func (h *SiteHandler) GetFrontendFiles(w http.ResponseWriter, r *http.Request) {
	path := "./public" + r.URL.Path
	http.ServeFile(w, r, path)
}

func (h *SiteHandler) ServeReactApp(w http.ResponseWriter, r *http.Request) {
	path := "./public/index.html"
	http.ServeFile(w, r, path)
}
