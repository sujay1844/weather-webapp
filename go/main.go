package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/RediSearch/redisearch-go/redisearch"
	"github.com/gomodule/redigo/redis"
	"github.com/joho/godotenv"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	// We set Gin to release mode to remove debug messages
	gin.SetMode(gin.DebugMode)
	// gin.SetMode(gin.ReleaseMode)

	router := gin.Default()

	// Using CORS middleware
	router.Use(cors.Default())

	router.GET("/ping", pong)
	router.GET("/weather/get/:city", getWeather)
	router.GET("/weather/search/:search_term", getSearchResults)
	router.Run(":" + port)
}

func pong(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

type CityData struct {
	City string `json:"name"`
}

func getWeather(c *gin.Context) {
	city := c.Param("city")

	weatherData := fetchWeather(city)

	// Since golang doesn't handle json well by Default
	// We map it using the encoding/json library
	var jsonMap map[string]interface{}
	json.Unmarshal([]byte(weatherData), &jsonMap)

	// Send back 200 status and the mapped json data
	c.JSON(http.StatusOK, jsonMap)
}

func fetchWeather(city string) (string){
	// My API key works upto one request per second
	APIKey := getAPIKey()

	url := "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey

	// Fetch data from the API
	req, _ := http.Get(url)
	// Extract the body and return it
	body, _ := ioutil.ReadAll(req.Body)
	return string(body)
}

func getAPIKey() (string) {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}
	return os.Getenv("APIKEY")
}

func getSearchResults(c *gin.Context) {
	search_term := c.Param("search_term")
	log.Println(search_term)
	cities := search(search_term, 10)
	c.JSON(http.StatusOK, cities)
}

type City struct {
	Name	string	`json:"name"`
	Country string	`json:"country"`
	// State	string	`json:"state"`
	// Coord	Coord	`json:"coord"`
}
// type Coord struct {
// 	Lon float64 `json:"lon"`
// 	Lat float64 `json:"lat"`
// }

func search(search_term string, no_of_results int) []City {
	err := godotenv.Load()
	url := os.Getenv("URL")
	password := os.Getenv("PASSWORD")
	pool := &redis.Pool{
		Dial: func() (redis.Conn, error) {
			return redis.Dial("tcp", url, redis.DialPassword(password))
		},
	}
	c := redisearch.NewClientFromPool(pool, "cities")
	docs, _, err := c.Search(redisearch.NewQuery(search_term).Limit(0, no_of_results).SetScorer("TFIDF.DOCNORM"))
	if err != nil {
		log.Println(err)
	}
	cities := make([]City, 0)
	for i := 0; i < len(docs); i++ {
		var city City
		err = json.Unmarshal([]byte(docs[i].Properties["$"].(string)), &city)
		if err != nil {
			log.Println(err)
		}
		cities = append(cities, city)
	}
	return cities
}
