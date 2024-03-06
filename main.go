package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/apex/gateway"
)

func main() {
	fmt.Println("Server Started")
	port := flag.Int("port", -1, "specify a port")
	flag.Parse()
	//http.HandleFunc("/assets/", func(w http.ResponseWriter, r *http.Request) {
	//	http.Error(w, "Access denied", http.StatusForbidden)
	//})
	listener := gateway.ListenAndServe
	portStr := "n/a"
	if *port != -1 {
		portStr = fmt.Sprintf(":%d", *port)
		listener = http.ListenAndServe
		http.Handle("/", http.FileServer(http.Dir("./public")))
		http.Handle("/portfolio", http.RedirectHandler("https://github.com/JasnRathore/portfolio", http.StatusSeeOther))
		http.Handle("/hades", http.RedirectHandler("https://github.com/JasnRathore/Hades", http.StatusSeeOther))
		http.Handle("/github", http.RedirectHandler("https://github.com/JasnRathore", http.StatusSeeOther))
		http.Handle("/linkedin", http.RedirectHandler("https://www.linkedin.com/in/jasn-rathore-884644256", http.StatusSeeOther))
		http.Handle("/embed", http.RedirectHandler("https://astolfo.co", http.StatusSeeOther))
	}

	log.Fatal(listener(portStr, nil))
}
