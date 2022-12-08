const express = require('express');
const cors = require('cors');
const { genderRouter, movieRouter, roomRouter, movieShowsRouter, userRouter, salesTicketsRouter, authRouter } = require('../modules/controller/router')
require ('dotenv').config(); //Importaciones

const app = express(); //Instanciar server
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(cors({origins: '*'})); //Permite recibir cualquier peticion con X origen
app.use(express.json({limit: '50mb'})); //Permite peticiones hasta 50mb

//Routes
app.get("/", (request, response) => {
    response.send("Bienvenido a products_node");
});

//Endpoints
app.use('/api/genders', genderRouter);
app.use(`/api/movies`, movieRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/movieshows', movieShowsRouter);
app.use('/api/users', userRouter);
app.use('/api/salestickets', salesTicketsRouter);
app.use('/api/auth', authRouter);

module.exports = {
    app,
}; //{app:app}