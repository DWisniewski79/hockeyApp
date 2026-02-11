package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type FlexibleInt int
type FlexibleResult GameResult

type Response struct {
	Status      string         `json:"status"`
	Team        Team           `json:"team"`
	Players     []Players      `json:"players"`
	LeaderBoard []StatCategory `json:"leaderboards"`
	GoalieStats []GoalieDetail `json:"goalies"`
}

type SeasonsResponse struct {
	Seasons Season         `json:"seasons"`
	Games   []Game         `json:"games"`
	Leaders []StatCategory `json:"leaderboards"`
}

type Season struct {
	ID           string `json:"season_id"`
	Name         string `json:"season_name"`
	Division_id  string `json:"division_id"`
	DivisionName string `json:"division_long_name"`
	Status       string `json:"season_status"`
}

type ScheduleSummary struct {
	NextGame Game `json:"next_game"`
	LastGame Game `json:"last_game"`
}

type Game struct {
	ID              string     `json:"game_id"`
	Teams           []Team     `json:"teams"`
	GameTimeSeconds int64      `json:"integer_time"`
	GameDateDisplay string     `json:"display_date"`
	GameTimeDisplay string     `json:"display_time"`
	Location        string     `json:"location"`
	IsHomeSide      string     `json:"is_home"`
	GameResult      GameResult `json:"game_result"`
}
type GameResult struct {
	HomeTeamScore string `json:"home_score"`
	AwayTeamScore string `json:"away_score"`
	Winner        string `json:"winner"`
}

type Team struct {
	ID           string `json:"team_id"`
	Name         string `json:"team_full_name"`
	SeasonID     string `json:"season_id"`
	Abbreviation string `json:"team_abbreviation"`
	IsHomeSide   string `json:"is_home"`
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

type StatCategory struct {
	Category string       `json:"category_name"`
	Leaders  []StatLeader `json:"leaders"`
}

type StatLeader struct {
	PlayerID     int         `json:"player_id"`
	Name         string      `json:"name"`
	StatTotalInt FlexibleInt `json:"total"`
	CategoryName string      `json:"category_name"`
}

type PlayerStatsResponse struct {
	Players      []Players      `json:"players"`
	Leaderboards []StatCategory `json:"leaderboards"`
}
type PlayerDetailResponse struct {
	Player_ID   int            `json:"player_id"`
	Stats       []StatCategory `json:"stats"`
	GoalieStats []GoalieDetail `json:"goalie_stats"`
}

type TopLeaderResult struct {
	Player     Players      `json:"player"`
	Categories []string     `json:"categories_led"` // e.g., ["Points", "Goals"]
	TopStats   []StatLeader `json:"stats"`          // The actual leader objects
}

type GoalieDetail struct {
	Player_ID      int    `json:"player_id"`
	SavePercentage string `json:"save_percentage"`
	Wins           string `json:"wins"`
	Name           string `json:"name"`
	GAA            string `json:"gaa"`
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000", "http://192.168.0.203:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}

	router := gin.Default()
	router.Use(cors.New(config))

	api := router.Group("/api")
	{
		api.GET("/team", func(c *gin.Context) {
			getTeamDetail(c)
		})
		api.GET("/players/:id", func(c *gin.Context) {
			getPlayerByID(c)
		})

		api.GET("/players", func(c *gin.Context) {
			getPlayers(c)
		})

		api.GET("/goalie-stats", func(c *gin.Context) {
			getGoalieStats(c)
		})

		api.GET("/seasons", func(c *gin.Context) {
			getSeasons(c)
		})

		api.GET("/next-game", func(c *gin.Context) {
			getScheduleSummary(c)
		})
	}

	router.Run(":8080")

}

func fetchAPI(target interface{}, url string, params map[string]string) error {
	apiKey := os.Getenv("API_KEY")
	client := &http.Client{Timeout: 10 * time.Second}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return err
	}

	req.Header.Set("User-Agent", "AuthorizedAPIAgent")
	q := req.URL.Query()
	q.Add("api_key", apiKey)
	q.Add("format", "json")
	for key, value := range params {
		q.Add(key, value)
	}
	req.URL.RawQuery = q.Encode()

	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API request failed with status: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	return json.Unmarshal(body, target)
}

// getAlbums responds with the list of all albums as JSON.
func getTeamDetail(c *gin.Context) {

	var responseObject Response
	err := fetchAPI(&responseObject, "https://icehq.hockeysyte.com/api/teams/team", map[string]string{"team_id": "1393"})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	c.IndentedJSON(http.StatusOK, responseObject.Team)
}

// getPlayerByID locates the player whose ID value matches the id
// parameter sent by the client, then returns that player as a response.
func getPlayers(c *gin.Context) {

	var responseObject Response
	err := fetchAPI(&responseObject, "https://icehq.hockeysyte.com/api/teams/team", map[string]string{"team_id": "1393"})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	c.IndentedJSON(http.StatusOK, responseObject.Team)

	payload := getTopLeaders(responseObject)
	c.IndentedJSON(http.StatusOK, payload)
}

func getPlayerByID(c *gin.Context) {
	id := c.Param("id")

	var responseObject Response
	err := fetchAPI(&responseObject, "https://icehq.hockeysyte.com/api/teams/team", map[string]string{
		"team_id": "1393",
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	for _, player := range responseObject.Players {
		if player.ID == id {
			c.IndentedJSON(http.StatusOK, player)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"message": "Player not found"})
}

func (fi *FlexibleInt) UnmarshalJSON(data []byte) error {

	if string(data) == "null" {
		return nil
	}
	var raw interface{}
	if err := json.Unmarshal(data, &raw); err != nil {
		return err
	}

	switch v := raw.(type) {
	case float64:
		*fi = FlexibleInt(int(v))
	case int:
		*fi = FlexibleInt(v)
	case string:
		if v == "" {
			*fi = 0
			return nil
		}
		i, err := strconv.Atoi(v)
		if err != nil {
			return err
		}
		*fi = FlexibleInt(i)
	default:
		return fmt.Errorf("unexpected type for column: %T", v)
	}
	return nil

}

func (fi FlexibleInt) MarshalJSON() ([]byte, error) {
	return []byte(strconv.Itoa(int(fi))), nil
}

func (fr *FlexibleResult) UnmarshalJSON(data []byte) error {

	if string(data) == "null" {
		return nil
	}
	var raw interface{}
	if err := json.Unmarshal(data, &raw); err != nil {
		return err
	}

	switch v := raw.(type) {
	case bool: //if it's null return empty result
		if v == false {
			*fr = FlexibleResult{}
			return nil
		}
		// If v is a json object, then we can try to unmarshal it into the GameResult struct
	case map[string]interface{}:
		type Alias FlexibleResult
		var temp Alias
		if err := json.Unmarshal(data, &temp); err != nil {
			return err
		}
		*fr = FlexibleResult(temp)

	default:
		return fmt.Errorf("unexpected type for column: %T", v)
	}
	return nil

}

// 	for _, player := range playerStats.Players {
// 		i, err := strconv.Atoi(player.ID)
// 		if err != nil {
// 			continue
// 		}
// 		if leaderIDs[i] {
// 			filteredPlayers = append(filteredPlayers, player)
// 		}
// 	}
// 	return PlayerDetailResponse{
// 		Player: filteredPlayers[0],
// 		Stats:  playerStats.Leaderboards,
// 	}
// }

func getGoalieStats(c *gin.Context, apiKey string) {

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

	payload := responseObject.GoalieStats
	c.IndentedJSON(http.StatusOK, payload)
}

func getTopLeaders(responseObject Response) []TopLeaderResult {
	// 1. Map to track which player leads which categories
	// Key: PlayerID, Value: A pointer to our result struct
	leadersMap := make(map[int]*TopLeaderResult)

	// 2. Loop through each category in the leaderboard
	for _, cat := range responseObject.LeaderBoard {
		// Check if the category has any leaders at all
		if len(cat.Leaders) > 0 {
			// THE FIRST VALUE (index 0) is the #1 Leader
			topOne := cat.Leaders[0]

			// If we haven't seen this player lead a category yet, initialize them
			if _, exists := leadersMap[topOne.PlayerID]; !exists {
				// Find the full player details from the Players array
				var fullDetails Players
				for _, p := range responseObject.Players {
					// Note: Ensure types match (int vs string/FlexibleInt)
					i, err := strconv.Atoi(p.ID)
					if err != nil {
						continue
					}
					if int(i) == topOne.PlayerID {
						fullDetails = p
						break
					}
				}

				leadersMap[topOne.PlayerID] = &TopLeaderResult{
					Player:     fullDetails,
					Categories: []string{},
					TopStats:   []StatLeader{},
				}
			}

			// Append this category's info to that player
			leadersMap[topOne.PlayerID].Categories = append(leadersMap[topOne.PlayerID].Categories, cat.Category)
			leadersMap[topOne.PlayerID].TopStats = append(leadersMap[topOne.PlayerID].TopStats, topOne)
			leadersMap[topOne.PlayerID].TopStats[len(leadersMap[topOne.PlayerID].TopStats)-1].CategoryName = cat.Category
		}
	}

	// 3. Convert map back to a slice for the JSON response
	var finalResults []TopLeaderResult
	for _, result := range leadersMap {
		finalResults = append(finalResults, *result)
	}

	return finalResults
}

func getSeasons(c *gin.Context, apiKey string) {

	client := &http.Client{}
	req, err := http.NewRequest("GET", "https://icehq.hockeysyte.com/api/seasons/season", nil)
	if err != nil {
		log.Print(err)
		os.Exit(1)
	}
	req.Header.Set("User-Agent", "AuthorizedAPIAgent")

	q := req.URL.Query()
	q.Add("season_id", "204")
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
	var responseObject SeasonsResponse

	json.Unmarshal(body, &responseObject)

	//payload := getTopLeaders(responseObject)
	c.IndentedJSON(http.StatusOK, responseObject)
}

func getScheduleSummary(c *gin.Context, apiKey string) {

	client := &http.Client{}
	req, err := http.NewRequest("GET", "https://icehq.hockeysyte.com/api/seasons/season", nil)
	if err != nil {
		log.Print(err)
		os.Exit(1)
	}

	req.Header.Set("User-Agent", "AuthorizedAPIAgent")

	q := req.URL.Query()
	q.Add("season_id", "204")
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
	var responseObject SeasonsResponse

	json.Unmarshal(body, &responseObject)

	summary := calculateScheduleSummary(responseObject.Games, "1393")

	//payload := getTopLeaders(responseObject)
	c.IndentedJSON(http.StatusOK, summary)

}

func CalculateNextGame(Games []Game) Game {
	fmt.Printf("[DEBUG] Starting CalculateNextGame. Received %d games.\n", len(Games))
	teamId := "1393"
	nextGame := Game{}
	lowestTimeDiff := int64(1<<63 - 1)
	now := time.Now().Unix()
	found := false

	for _, game := range Games {
		if game.GameTimeSeconds > now {
			isHappys := false
			for _, team := range game.Teams {
				if team.ID == teamId {
					isHappys = true
					break
				}
			}

			if isHappys {
				if game.GameTimeSeconds < lowestTimeDiff {
					lowestTimeDiff = game.GameTimeSeconds
					nextGame = game
					found = true
				}
			}
		}
	}

	if !found {
		return Game{}
	}

	return nextGame
}

func CalculateLastGame(Games []Game) Game {
	fmt.Printf("[DEBUG] Starting CalculateLastGame. Received %d games.\n", len(Games))
	teamId := "1393"
	lastGame := Game{}
	var highestTimeFound int64 = 0
	now := time.Now().Unix()
	found := false

	for _, game := range Games {
		if game.GameTimeSeconds < now {
			isHappys := false
			for _, team := range game.Teams {
				if team.ID == teamId {
					isHappys = true
					break
				}
			}

			if isHappys {
				if game.GameTimeSeconds > highestTimeFound {
					highestTimeFound = game.GameTimeSeconds
					lastGame = game
					found = true
				}
			}
		}
	}

	if !found {
		return Game{}
	}

	return lastGame
}

func calculateScheduleSummary(games []Game, myTeamID string) ScheduleSummary {
	var summary ScheduleSummary

	// Sentinels
	// "Next" needs to be closer than Infinity
	lowestFutureDiff := int64(math.MaxInt64)
	// "Last" needs to be bigger than 0 (Epoch)
	highestPastDiff := int64(0)

	now := time.Now().Unix()

	for _, game := range games {
		// Optimization: Check if my team is playing FIRST
		isMyTeam := false
		for _, team := range game.Teams {
			if team.ID == myTeamID {
				isMyTeam = true
				break
			}
		}

		// If it's not my team, skip the rest of the math
		if !isMyTeam {
			continue
		}

		// Logic Branch: Future vs Past
		if game.GameTimeSeconds > now {
			// Future Game: We want the SMALLEST timestamp (closest to now)
			if game.GameTimeSeconds < lowestFutureDiff {
				lowestFutureDiff = game.GameTimeSeconds
				summary.NextGame = game
			}
		} else {
			// Past Game: We want the LARGEST timestamp (closest to now)
			if game.GameTimeSeconds > highestPastDiff {
				highestPastDiff = game.GameTimeSeconds
				summary.LastGame = game
			}
		}
	}

	return summary
}
