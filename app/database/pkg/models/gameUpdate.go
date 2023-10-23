package models

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	_ "github.com/lib/pq"
)

func updateGameHandler(w http.ResponseWriter, r *http.Request) {

	connStr := "user=your_user dbname=your_database sslmode=disable"
	db, err := sql.Open("postgres", connStr)

	if err != nil {
		panic(err)
	}
	defer db.Close()

	var updatedGame Game

	// Read the JSON payload from the request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}

	if err := json.Unmarshal(body, &updatedGame); err != nil {
		http.Error(w, "Failed to unmarshal JSON", http.StatusBadRequest)
		return
	}

	// Update the database with the new game data
	_, err = db.Exec(`
		UPDATE games
		SET board = $1
		WHERE game_id = $2;
	`, updatedGame.Board, updatedGame.GameID)

	if err != nil {
		http.Error(w, "Failed to update game in the database", http.StatusInternalServerError)
		return
	}

	fmt.Fprintln(w, "Game updated successfully")
}
