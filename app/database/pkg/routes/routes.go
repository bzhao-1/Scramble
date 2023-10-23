package routes

import (
	"github.com/gorilla/mux"
)

// list of routes for application
var RegisterRoutes = func(router *mux.Route) {
	router.HandleFunc("/letterScores/{letter}", models.updateGameHandler).Methods("POST")
}
