import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDA4MzYyMWM3NmZhYThhZWFmZWY2MDMxNzU4YTEyZCIsIm5iZiI6MTczODI5MjY3MC41MTcsInN1YiI6IjY3OWMzZGJlODIyZTdkMzJmN2JkZDk4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HaXlKmQ0sxfdz3y3okK_TYOxVUz80ULzRFU3YNFBWHo'
  }
});

export default instance;