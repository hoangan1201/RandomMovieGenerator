import express from "express";
import axios from "axios";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = 3000;

const APIkey = "03f3fa53ab9f0b658cf37093aba68e8c";
const Access_Token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2YzZmE1M2FiOWYwYjY1OGNmMzcwOTNhYmE2OGU4YyIsInN1YiI6IjVkN2Y5MDM3MmI4YTQzMGU2ODIyZDM3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AJvYQ1g1hwWvm9X-e-LsfDrcC6bP6qpF9_U2JrcLTlw";
const API_random_url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=&sort_by=popularity.desc";
//Need to input page number


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});


app.get('/random', (req, res) => {
    /**
     * Steps:
     * - Get genres selected for params
     * 1. Random page number
     * 2. API random url return a page
     * 3. Random index for item in that page
     * 4. Get that movie id
     * 5. Use movie ID to request api for details: find by id
     */
});
