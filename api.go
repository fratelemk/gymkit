package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

type Workout struct {
	Duration  int      `json:"duration"`
	Exercises []string `json:"exercises"`
}

var workouts []Workout

func workoutHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodGet {
		w.Header().Set("Allow", http.MethodGet)
		http.Error(w, "Method Not Allwed", http.StatusMethodNotAllowed)
		return
	}

	workout, err := json.Marshal(workouts[getWorkoutIndex()])

	if err != nil {
		http.Error(w, "Oops! Something went wrong", http.StatusInternalServerError)
		return
	}
	w.Write(workout)
}

func getWorkoutIndex() int {
	weekday := time.Now().Weekday()

	if weekday == time.Saturday || weekday == time.Sunday {
		return 0
	}

	return (int(weekday) + 6) % 7
}

func loadJSON(filename string) ([]byte, error) {
	file, err := os.Open(filename)

	if err != nil {
		return nil, err
	}

	defer file.Close()

	return io.ReadAll(file)
}

func main() {
	data, err := loadJSON("workouts.json")

	if err != nil {
		log.Fatalf("Failed to load JSON file: %v", err)
		return
	}

	if err := json.Unmarshal(data, &workouts); err != nil {
		log.Fatalf("Error unmarshaling JSON: %v", err)
	}

	http.HandleFunc("/api/workout", workoutHandler)

	log.Println("Server is running on http://localhost:8080")

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Something went wrong: %v", err)
	}
}
