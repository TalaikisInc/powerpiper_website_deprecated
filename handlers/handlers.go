package handlers

import (
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/die-net/lrucache"
	"github.com/joho/godotenv"

	"../database"
	"../middleware"
	"../models"
)

var (
	tpl   *template.Template
	cache = lrucache.New(104857600*3, 60*60*24) //300 Mb, 240 hours
)

func init() {
	err := godotenv.Load("./.env")
	if err != nil {
		log.Fatal("Error loading environment variables.")
	}
	tpl = template.Must(template.ParseGlob("static/" + os.Getenv("TEMPLATE") + "/html/*.html"))
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")

	strings := middleware.Strings()
	strings["PageTitle"] = "Main"
	strings["UA"] = middleware.GetUserAgent(r)

	err := tpl.ExecuteTemplate(w, "content.html", middleware.PageStruct{
		Strings: strings})
	if err != nil {
		log.Fatal(err)
	}
}

func FlatPagesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	w.Header().Set("Cache-Control", "max-age=2592000")

	page := url.QueryEscape(strings.Split(r.RequestURI, "/")[2])
	if len(page) == 0 {
		return
	}

	strings := middleware.Strings()
	strings["UA"] = middleware.GetUserAgent(r)

	title, isCached := cache.Get("flat_title" + page)
	body, _ := cache.Get("flat_body" + page)
	if isCached == false {
		db := database.Connect()
		defer db.Close()

		query := fmt.Sprintf(`SELECT 
			url, 
			title, 
			content 
			FROM django_flatpage 
			WHERE url = '/%s/';`, page)

		row := db.QueryRow(query)

		post := models.FlatPage{}
		err := row.Scan(&post.URL, &post.Title, &post.Content)
		switch {
		case err == sql.ErrNoRows:
			http.NotFound(w, r)
			return
		case err != nil:
			fmt.Println(err)
			http.Error(w, http.StatusText(500), http.StatusInternalServerError)
			return
		}

		cache.Set("flat_title"+page, []byte(post.Title))
		cache.Set("flat_body"+page, []byte(post.Content))
		strings["PageTitle"] = post.Title

		err = tpl.ExecuteTemplate(w, "flat.html", middleware.PageStruct{
			Strings: strings,
			Body:    template.HTML(post.Content)})
		if err != nil {
			log.Fatal(err)
		}
	}

	strings["PageTitle"] = string(title)
	err := tpl.ExecuteTemplate(w, "privacy_policy.html", middleware.PageStruct{
		Strings: strings,
		Body:    template.HTML(body)})
	if err != nil {
		log.Fatal(err)
	}
}

func NotFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	w.Header().Set("Cache-Control", "max-age=2592000")

	strings := middleware.Strings()
	strings["PageTitle"] = "Not Found"
	strings["UA"] = middleware.GetUserAgent(r)

	err := tpl.ExecuteTemplate(w, "404.html", middleware.PageStruct{
		Strings: strings})
	if err != nil {
		log.Fatal(err)
	}
}
