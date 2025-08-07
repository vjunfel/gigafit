const express = require("express");
const router = express.Router();

const workoutController = require("../controllers/workoutController");
const { verify } = require("../auth");

router.get("/getMyWorkouts", verify, workoutController.getMyWorkouts);
router.post("/addWorkout", verify, workoutController.addWorkout);
router.delete("/deleteWorkout/:workoutId", verify, workoutController.deleteWorkout);
router.patch("/updateWorkout/:workoutId", verify, workoutController.updateWorkout);
router.patch("/completeWorkoutStatus/:workoutId", verify, workoutController.completeWorkoutStatus);

module.exports = router;