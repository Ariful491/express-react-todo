const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/Api');

const app = express();

const PORT = process.env.PORT || 8000;
require('dotenv').config();


mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB."))
    .catch((error) => console.error("Error connecting to MongoDB:", error));



app.use(express.json());
app.use(cors());
app.use(routes);


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
