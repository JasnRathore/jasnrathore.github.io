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
	http.Handle("/portfolio", http.RedirectHandler("https://github.com/JasnRathore/portfolio", http.StatusSeeOther))
	http.Handle("/hades", http.RedirectHandler("https://github.com/JasnRathore/Hades", http.StatusSeeOther))
	http.Handle("/github", http.RedirectHandler("https://github.com/JasnRathore", http.StatusSeeOther))
	http.Handle("/linkedin", http.RedirectHandler("https://www.linkedin.com/in/jasn-rathore-884644256", http.StatusSeeOther))
	http.Handle("/embed", http.RedirectHandler("https://astolfo.co", http.StatusSeeOther))

	log.Fatal(http.ListenAndServe(":8000", nil))
}
