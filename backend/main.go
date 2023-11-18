package main

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"samgates.io/wordfun/handlers"
)

func main() {
	// create router
	router := mux.NewRouter()

	// add routes
	TextToSpeechHandler := handlers.NewTextToSpeechHandler(router)
	TextToSpeechHandler.RegisterRoutes()

	listHandler := handlers.NewListHandler(router)
	listHandler.RegisterRoutes()

	fileHandler := handlers.NewFileHandler(router)
	fileHandler.RegisterRoutes()

	handler := cors.Default().Handler(router)

	http.ListenAndServe(":8080", handler)
}
