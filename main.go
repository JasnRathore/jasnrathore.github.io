package main

import (
	"fmt"
	"log"
	"net/http"
)

type person struct {
	FirstName string
	LastName  string
}

func main() {
	fmt.Println("Server Started")
	//http.HandleFunc("/assets/", func(w http.ResponseWriter, r *http.Request) {
	//	http.Error(w, "Access denied", http.StatusForbidden)
	//})
	http.Handle("/", http.FileServer(http.Dir("./public")))
	log.Fatal(http.ListenAndServe(":8000", nil))
}
