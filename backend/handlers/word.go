package handlers

import (
	"encoding/json"
	"io"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"samgates.io/wordfun/models"
)

// WordHandler returns a random list of Words
type WordHandler struct {
	Router *mux.Router
	db     *gorm.DB
}

// NewWordHandler creates a new list handler
func NewWordHandler(router *mux.Router, db *gorm.DB) *WordHandler {
	return &WordHandler{
		Router: router,
		db:     db,
	}
}

// ServeHTTP implements the http.Handler interface
func (h *WordHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.Router.ServeHTTP(w, r)
}

// RegisterRoutes registers routes for the list handler
func (h *WordHandler) RegisterRoutes() {
	h.Router.HandleFunc("/word", h.GetWordResults).Methods("GET")
	h.Router.HandleFunc("/word", h.CreateWordResult).Methods("POST")
}

// GetWords returns a list of activity for a user
func (h *WordHandler) GetWordResults(w http.ResponseWriter, r *http.Request) {
	results := []models.WordResult{}
	err := h.db.Find(&results).Error
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}

func (h *WordHandler) CreateWordResult(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	wordResult := models.WordResult{}
	err = json.Unmarshal(body, &wordResult)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	wordResult.ID = uuid.NewString()
	wordResult.CreatedAt = time.Now()

	err = h.db.Save(&wordResult).Error
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(wordResult)
}
