package controllers

import (
	"encoding/json"
	"errors"
	"net/http"

	"Scramble/app/backend/pkg/models"

	"github.com/gorilla/mux"
)

type AppController struct {
	AppInterface models.App
}

type AppControllerInterface interface {
	AppCreateGame(w http.ResponseWriter, r *http.Request)
	AppJoinGame(w http.ResponseWriter, r *http.Request)
	AppUpdateMove(w http.ResponseWriter, r *http.Request)
	AppStartGame(w http.ResponseWriter, r *http.Request)
}

// Homepage
func HomePage(w http.ResponseWriter, r *http.Request) {
	welcomeMsg := "Welcome to Scramble!"

	json.NewEncoder(w).Encode(welcomeMsg)
}

// API endpoint to create new game
func (a *AppController) AppCreateGame(w http.ResponseWriter, r *http.Request) {
	// unmarshal json response
	headerContentType := r.Header.Get("Content-Type")
	if headerContentType != "application/json" {
		errorResponse(w, "Content Type is not application/json", http.StatusUnsupportedMediaType)
		return
	}

	var createGameResp models.PlayerNameResp
	var unmarshalErr *json.UnmarshalTypeError

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&createGameResp)
	if err != nil {
		if errors.As(err, &unmarshalErr) {
			errorResponse(w, "Bad Request. Wrong Type provided for field "+unmarshalErr.Field, http.StatusBadRequest)
		} else {
			errorResponse(w, "Bad Request "+err.Error(), http.StatusBadRequest)
		}
		return
	}

	newGameID, err := a.AppInterface.CreateGame(createGameResp.PlayerName)
	if err != nil {
		errorResponse(w, "Not able to create new game: "+err.Error(), http.StatusBadRequest)
		return
	}

	resp := apiResponse {
		GameID: &newGameID,
		Valid: true,
	}

	json.NewEncoder(w).Encode(resp)
}

// API endpoint to join game using unique ID
func (a *AppController) AppJoinGame(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	gameID := vars["gameID"]

	// unmarshal json response
	headerContentType := r.Header.Get("Content-Type")
	if headerContentType != "application/json" {
		errorResponse(w, "Content Type is not application/json", http.StatusUnsupportedMediaType)
		return
	}

	var joinGameResp models.PlayerNameResp
	var unmarshalErr *json.UnmarshalTypeError

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&joinGameResp)
	if err != nil {
		if errors.As(err, &unmarshalErr) {
			errorResponse(w, "Bad Request. Wrong Type provided for field "+unmarshalErr.Field, http.StatusBadRequest)
		} else {
			errorResponse(w, "Bad Request "+err.Error(), http.StatusBadRequest)
		}
		return
	}

	err = a.AppInterface.JoinGame(gameID, joinGameResp.PlayerName)
	if err != nil {
		errorResponse(w, "Not able to join game: "+err.Error(), http.StatusBadRequest)
		return
	}
}

// Start game endpoint
func (a *AppController) AppStartGame(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	gameID := vars["gameID"]
	gameDetails, err := a.AppInterface.StartGame(gameID)
	if err != nil {
		errorResponse(w, "Not able to start game: "+err.Error(), http.StatusBadRequest)
		return
	}

	resp := apiResponse {
		GameResp: gameDetails,
		Valid: true,
	}

	json.NewEncoder(w).Encode(resp)
}

// Update move endpoint
func (a *AppController) AppUpdateMove(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	gameID := vars["gameID"]

	// unmarshal json response
	headerContentType := r.Header.Get("Content-Type")
	if headerContentType != "application/json" {
		errorResponse(w, "Content Type is not application/json", http.StatusUnsupportedMediaType)
		return
	}

	var listOfMoves models.UpdateGameResp
	var unmarshalErr *json.UnmarshalTypeError

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&listOfMoves)
	if err != nil {
		if errors.As(err, &unmarshalErr) {
			errorResponse(w, "Bad Request. Wrong Type provided for field "+unmarshalErr.Field, http.StatusBadRequest)
		} else {
			errorResponse(w, "Bad Request "+err.Error(), http.StatusBadRequest)
		}
		return
	}

	// update game score
	updatedGame, err := a.AppInterface.UpdateGameState(gameID, listOfMoves.Updates, listOfMoves.PlayerName)
	if err != nil {
		errorResponse(w, "Not able to update game: "+err.Error(), http.StatusBadRequest)
		return
	}
	resp := apiResponse {
		GameResp: updatedGame,
		Valid: true,
	}

	json.NewEncoder(w).Encode(resp)
}

// Error response
func errorResponse(w http.ResponseWriter, message string, httpStatusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(httpStatusCode)
	resp := apiResponse{
		ErrorMessage: &message,
		Valid: false,
	}
	jsonResp, _ := json.Marshal(resp)
	w.Write(jsonResp)
}
