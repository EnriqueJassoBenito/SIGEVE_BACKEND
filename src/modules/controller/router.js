const {genderRouter} = require("./genders/genders.controller");
const {movieRouter} = require("./movies/movies.controller");
const {roomRouter} = require("./rooms/rooms.controller");
const {movieShowsRouter} = require("./movie_shows/movie_shows.controller");
const {userRouter} = require("./users/users.controller");
const {salesTicketsRouter} = require("./sales_tickets/sales_tickets.controller");
const {authRouter} = require("./auth/auth.controller");


module.exports = {
  genderRouter, movieRouter, roomRouter, movieShowsRouter, userRouter, salesTicketsRouter, authRouter,
};