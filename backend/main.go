package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"samgates.io/wordfun/handlers"
	"samgates.io/wordfun/utils"
)

func main() {
	// create router
	router := mux.NewRouter()

	// connect to db
	db := utils.SetupDB()

	// add routes
	TextToSpeechHandler := handlers.NewTextToSpeechHandler(router)
	TextToSpeechHandler.RegisterRoutes()

	lessonHandler := handlers.NewLessonHandler(router, db)
	lessonHandler.RegisterRoutes()

	wordHandler := handlers.NewWordHandler(router, db)
	wordHandler.RegisterRoutes()

	fileHandler := handlers.NewFileHandler(router)
	fileHandler.RegisterRoutes()

	siteHandler := handlers.NewSiteHandler(router)
	siteHandler.RegisterRoutes()

	handler := cors.Default().Handler(router)

	port, ok := os.LookupEnv("WORDFUN_PORT")
	if !ok {
		panic("WORDFUN_PORT not set")
	}
	fmt.Println("Server started on port", port)
	http.ListenAndServe(fmt.Sprintf(":%s", port), handler)
}
