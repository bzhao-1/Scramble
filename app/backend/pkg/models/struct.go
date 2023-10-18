package models

var GameList map[string]Game

type Game struct {
	GameID  string         `json:"GameID"`
	Board   [15][15]string `json:"Board"`
	Players []Player       `json:"Players"`
}

type Player struct {
	Name  string `json:"name"`
	Score int    `json:"score"`
}

type Move struct {
	Player string `json:"name"`
	Letter string `json:"letter"`
	XLoc   int    `json:"xLoc"`
	YLoc   int    `json:"yLoc"`
}

type WordScore struct {
	Valid bool
	Score int
}
