package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type Response struct {
	Status  string    `json:"status"`
	Team    Team      `json:"team"`
	Players []Players `json:"players"`
}

type Team struct {
	ID           string `json:"team_id"`
	Name         string `json:"team_full_name"`
	SeasonID     string `json:"season_id"`
	Abbreviation string `json:"team_abbreviation"`
}

type Players struct {
	ID            string     `json:"player_id"`
	Name          string     `json:"full_name"`
	Number        string     `json:"jersey_number"`
	Position      []Position `json:"positions"`
	ShootsCatches string     `json:"shoots"`
}

type Position struct {
	PositionType         string `json:"type"`
	PositionName         string `json:"long_name"`
	PositionAbbreviation string `json:"short_name"`
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	apiKey := os.Getenv("API_KEY")

	// client := &http.Client{}

	// req, err := http.NewRequest("GET", "https://icehq.hockeysyte.com/api/teams/team", nil)
	// if err != nil {
	// 	log.Print(err)
	// 	os.Exit(1)
	// }
	// req.Header.Set("User-Agent", "AuthorizedAPIAgent")

	// q := req.URL.Query()
	// q.Add("team_id", "1393")
	// q.Add("api_key", apiKey)
	// q.Add("format", "json")
	// req.URL.RawQuery = q.Encode()

	// resp, err := client.Do(req)
	// if err != nil {
	// 	log.Print(err)
	// 	os.Exit(1)
	// }

	// defer resp.Body.Close()
	// body, err := io.ReadAll(resp.Body)
	// if err != nil {
	// 	log.Print(err)
	// 	os.Exit(1)
	// }
	// var responseObject Response
	// json.Unmarshal(body, &responseObject)
	// log.Println("Team Name:", responseObject.Team.Name)
	// log.Println("Number of Players:", len(responseObject.Players))

	// for _, player := range responseObject.Players {
	// 	log.Printf("Player Name: %s, Jersey Number: %s, Shoots/Catches: %s, Main Position: %s", player.Name, player.Number, player.ShootsCatches, player.Position[0].PositionName)
	// }

	// log.Println("Response status:", resp.Status)

	router := gin.Default()

	router.GET("/albums", func(c *gin.Context) {
		getTeamDetail(c, apiKey)
	})
	router.GET("/players/:id", func(c *gin.Context) {
		getPlayerByID(c, apiKey)
	})
	router.Run("localhost:8080")

}

// getAlbums responds with the list of all albums as JSON.
func getTeamDetail(c *gin.Context, apiKey string) {

	client := &http.Client{}

	req, err := http.NewRequest("GET", "https://icehq.hockeysyte.com/api/teams/team", nil)
	if err != nil {
		log.Print(err)
		os.Exit(1)
	}
	req.Header.Set("User-Agent", "AuthorizedAPIAgent")

	q := req.URL.Query()
	q.Add("team_id", "1393")
	q.Add("api_key", apiKey)
	q.Add("format", "json")
	req.URL.RawQuery = q.Encode()

	resp, err := client.Do(req)
	if err != nil {
		log.Print(err)
		os.Exit(1)
	}

	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Print(err)
		os.Exit(1)
	}
	var responseObject Response

	json.Unmarshal(body, &responseObject)
	c.IndentedJSON(http.StatusOK, responseObject.Team)
}

// getPlayerByID locates the player whose ID value matches the id
// parameter sent by the client, then returns that player as a response.
func getPlayerByID(c *gin.Context, apiKey string) {
	id := c.Param("id")

	client := &http.Client{}

	req, err := http.NewRequest("GET", "https://icehq.hockeysyte.com/api/teams/team", nil)
	if err != nil {
		log.Print(err)
		os.Exit(1)
	}
	req.Header.Set("User-Agent", "AuthorizedAPIAgent")

	q := req.URL.Query()
	q.Add("team_id", "1393")
	q.Add("api_key", apiKey)
	q.Add("format", "json")
	req.URL.RawQuery = q.Encode()

	resp, err := client.Do(req)
	if err != nil {
		log.Print(err)
		os.Exit(1)
	}

	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Print(err)
		os.Exit(1)
	}
	var responseObject Response
	json.Unmarshal(body, &responseObject)
	log.Println("Team Name:", responseObject.Team.Name)
	log.Println("Number of Players:", len(responseObject.Players))

	for _, player := range responseObject.Players {
		if player.ID == id {
			c.IndentedJSON(http.StatusOK, player)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Player not found"})
}
