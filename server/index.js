const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workoutRoutes");

require('dotenv').config();

const app = express();

app.use(cors({
  origin: ["https://gigafit-junfel.vercel.app", "http://localhost:5173"],
  credentials: true
}));

app.use(cors(['http://localhost:5173']));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

console.log("DATABASE:", process.env.MONGODB_STRING);

app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

if(require.main === module){
    app.listen(process.env.PORT || 3000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 3000 }`)
    });
}

module.exports = { app, mongoose };