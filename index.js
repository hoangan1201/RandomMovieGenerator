// import express from "express";
// import axios from "axios";
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")));
app.set('views', __dirname + '/views')

const port = process.env.PORT || 3000;

const APIkey = "03f3fa53ab9f0b658cf37093aba68e8c";
const Access_Token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2YzZmE1M2FiOWYwYjY1OGNmMzcwOTNhYmE2OGU4YyIsInN1YiI6IjVkN2Y5MDM3MmI4YTQzMGU2ODIyZDM3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AJvYQ1g1hwWvm9X-e-LsfDrcC6bP6qpF9_U2JrcLTlw";
const API_random_url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
//Need to input page number
const API_URL = "https://api.themoviedb.org/3/discover/movie?";
const API_Detail_URL = "https://api.themoviedb.org/3/movie/";

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("index");
});

/**
 * Steps:
 * - Get genres selected for params
 * 1. Random page number
 * 2. API random url return a page
 * 3. Random index for item in that page
 * 4. Get that movie id
 * 5. Use movie ID to request api for details: find by id
 */
const maxPageNum = 500;
// let selectedCategories = [];

app.post("/random", async (req, res) => {
  try {
    console.log("Req.Bod: " + req.body);
    global.selectedCategories = req.body || [];

    let response = await axios.get(API_URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Access_Token}`,
      },
      params: {
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: 1,
        sort_by: "popularity.desc",
        with_genres: selectedCategories.join(","),
      },
    });

    console.log("Total Pages:");
    console.log(response.data.total_pages);

    if (response.data.total_pages > 2) {
      let randomPageNum=1;
      if (response.data.total_pages > 500){
        randomPageNum = randomBound(500);
      } else {
        randomPageNum = randomBound(response.data.total_pages);
      }
      
      console.log("Edge case " + randomPageNum);
      response = await axios.get(API_URL, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${Access_Token}`,
        },
        params: {
          include_adult: false,
          include_video: false,
          language: "en-US",
          page: randomPageNum,
          sort_by: "popularity.desc",
          with_genres: selectedCategories.join(","),
        },
      });
    }
    //Get total pages number and random a page number

    const randomIndex = randomBound(response.data.results.length) - 1;
    const movieID = response.data.results[randomIndex].id;
    /**
     * Get Movie ID
     * Use Move ID to call another API for more details
     */
    console.log("Movie id: " + movieID);
    console.log(API_Detail_URL+movieID);
    response = await axios.get(API_Detail_URL+movieID, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Access_Token}`,
      },
    });
    /**
     * API call to get trailer key
     */
    const trailerResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/videos`,
      {
        headers:{
          accept: "application/json",
          Authorization: `Bearer ${Access_Token}`,
        }
      }
    );
    let trailerKey="";
    if (trailerResponse.data.results.length >0){
      trailerKey = trailerResponse.data.results[0].key;
      console.log("Trailer Key " + trailerKey);
    }

    /**
     * Data Handling
     */
    // const randomMovie = response.data.results[randomIndex];
    const randomMovie = {
      title: response.data.title,
      overview: response.data.overview,
      releaseDate: formatDate(response.data.release_date),
      posterImg: `https://image.tmdb.org/t/p/w185${response.data.poster_path}`,
      runtime: `${response.data.runtime} minutes`,
      genresList: extractGenreNames(response.data.genres)
    };

    if (trailerKey){
      randomMovie.trailer = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }

    global.movieData = randomMovie;
    res.render("index", { data: global.movieData });
  } catch (error) {
    console.log("Error Server ", error);
  }
  // res.render("index.ejs");
});

app.get("/random", async (req, res) => {
  console.log("Get method");
  const data = global.movieData;

  console.log(data);
  res.render("index", { data: data, selectedCategories:global.selectedCategories });
});

function randomBound(max) {
  return Math.floor(Math.random() * max) + 1;
}

function formatDate(inputDate) {
  // Parse the input date string
  const dateParts = inputDate.split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  // Create a new Date object
  const date = new Date(year, month - 1, day);

  // Get the month name
  const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[date.getMonth()];

  // Format the date
  const formattedDate = monthName + " " + day + ", " + year;

  return formattedDate;
}

function extractGenreNames(genres) {
  // Map each object to its name property
  const genreNames = genres.map(genre => genre.name);
  return genreNames;
}
