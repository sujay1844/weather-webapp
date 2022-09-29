package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	// We set Gin to release mode to remove debug messages
	// gin.SetMode(gin.DebugMode)
	gin.SetMode(gin.ReleaseMode)

	router := gin.Default()

	// Using CORS middleware
	router.Use(cors.Default())

	router.GET("/ping", pong)
	router.POST("/api", getWeather)

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
	// Bind the received json to a struct to process data
	var jsonData CityData
	c.BindJSON(&jsonData)

	weatherData := fetchWeather(jsonData.City)

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
