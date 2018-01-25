package main

import (
	"flag"
	"log"
	"net/http"
	"os"
	"time"

	"./api"
	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"golang.org/x/crypto/acme/autocert"
)

var isdev bool

func init() {
	// dev format: -isdev=true
	flag.BoolVar(&isdev, "isdev", false, "Set to true to run the app in development mode.")
	flag.Parse()
	if isdev {
		err := godotenv.Load(".env.development")
		if err != nil {
			log.Fatal("Error loading development environment variables.")
		}
	} else {
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatal("Error loading production environment variables.")
		}
	}
}

func main() {
	Host := os.Getenv("HOST")

	app := echo.New()
	app.AutoTLSManager.HostPolicy = autocert.HostWhitelist(os.Getenv("DOMAIN"))
	app.AutoTLSManager.Cache = autocert.DirCache("/var/www/.cache")
	app.Use(middleware.Logger())
	app.Use(middleware.Recover())
	app.Use(middleware.Gzip())
	// static serves 'uploads' folders on https://domain.com/*
	app.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "uploads",
		Browse: true,
	}))
	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://127.0.0.1:" + os.Getenv("FRONTEND_PORT")},
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
	}))

	/*app.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Extract the credentials from HTTP request header and perform a security
			// check

			// For invalid credentials
			return echo.NewHTTPError(http.StatusUnauthorized, "Please provide valid credentials")

			// For valid credentials call next
			// return next(c)
		}
	})*/

	/* Stats */
	s := api.NewStats()
	app.Use(s.Process)
	app.GET("/stats", s.StatsHandler)
	app.Use(api.ServerHeader)

	/* Auth */
	app.GET("/", api.Accessible)
	r := app.Group("/members")
	r.Use(middleware.JWT([]byte("secret")))
	r.GET("", api.Restricted)

	/* Handles */
	app.GET("/api/v1.0/post/:post/", api.PostHandler)
	app.GET("/api/v1.0/flatpage/:title/", api.FlatPageHandler)
	app.GET("/api/v1.0/posts/:page/", api.PostsHandler)
	app.GET("/api/v1.0/categories/:page/", api.CategoriesHandler)
	app.GET("/api/v1.0/authors/:page/", api.AuthorsHandler)
	app.GET("/api/v1.0/author/:author/:page/", api.PostsAuthorHandler)
	app.GET("/api/v1.0/category/:category/:page/", api.PostsCategoryHandler)
	app.POST("/api/v1.0/users", api.CreateUser)
	app.GET("/api/v1.0/users/:id", api.GetUser)
	app.PUT("/api/v1.0/users/:id", api.UpdateUser)
	app.DELETE("/api/v1.0/users/:id", api.DeleteUser)
	app.POST("/api/v1.0/login/", api.Login)

	/* Server */
	server := &http.Server{
		//Addr:         ":" + os.Getenv("WEB_PORT"),
		Addr:         Host + ":" + os.Getenv("API_PORT"),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}

	app.Logger.Fatal(app.StartServer(server))
	//app.Logger.Fatal(app.StartAutoTLS(s))
}
