package models

import (
	"errors"
)

func (c *LanguageClient) scoring(activeGame Game, newTiles []Move) (int, error) {
	score := 0
	setOfWords := []string{}

	for i := 0; i < len(newTiles); i++ {

		var x = int(newTiles[i].Col)
		var y = int(newTiles[i].Row)

		// recursively get all the possible words
		leftAndRightWord := pullLeft(activeGame, x, y) + activeGame.Board[x][y] + pullRight(activeGame, x, y)
		upAndDownWord := pullUp(activeGame, x, y) + activeGame.Board[x][y] + pullDown(activeGame, x, y)

		if (!c.CheckValidWord(leftAndRightWord) && len(leftAndRightWord) > 1) || (!c.CheckValidWord(upAndDownWord) && len(upAndDownWord) > 1) {
			// fmt.Println(leftAndRightWord, upAndDownWord)
			return 0, errors.New("this is an invalid word")
		}

		// then append to the list of words that would count towards the scores
		if !checkWordExists(setOfWords, leftAndRightWord) && len(leftAndRightWord) > 1 {
			setOfWords = append(setOfWords, leftAndRightWord)
		}

		if !checkWordExists(setOfWords, upAndDownWord) && len(upAndDownWord) > 1 {
			setOfWords = append(setOfWords, upAndDownWord)
		}
	}
	// fmt.Println(setOfWords)

	for _, word := range setOfWords {
		if c.CheckValidWord(word) {
			for _, letter := range word {
				score += c.GetLetterScore(string(letter))
			}
		}
	}

	return score, nil
}

func pullUp(game Game, x int, y int) string {
	// fmt.Println("pullUp: ", x, y)

	if y <= 0 || game.Board[x][y] == "" {
		return ""
	}
	// fmt.Println(pullUp(game, x, y-1) + game.Board[x][y])
	return pullUp(game, x, y-1) + game.Board[x][y-1]
}

func pullDown(game Game, x int, y int) string {
	// fmt.Println("pullDown: ", x, y)

	if y <= 14 || game.Board[x][y] == "" {
		return ""
	}
	// fmt.Println(game.Board[x][y] + pullDown(game, x, y+1))
	return game.Board[x][y+1] + pullDown(game, x, y+1)
}

func pullLeft(game Game, x int, y int) string {
	// fmt.Println("pullLeft: ", x, y)

	if x <= 0 || game.Board[x][y] == "" {
		return ""
	}

	// fmt.Println(pullLeft(game, x-1, y) + game.Board[x][y])
	return pullLeft(game, x-1, y) + game.Board[x-1][y]
}

func pullRight(game Game, x int, y int) string {
	// fmt.Println("pullRight: ", x, y)

	if x >= 14 || game.Board[x][y] == "" {
		return ""
	}
	// fmt.Println(game.Board[x][y] + pullRight(game, x+1, y))
	return game.Board[x+1][y] + pullRight(game, x+1, y)
}

func checkWordExists(setOfWords []string, word string) bool {
	for _, eachWord := range setOfWords {
		if eachWord == word {
			return true
		}
	}
	return false
}
