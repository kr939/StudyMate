
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const subjectRoutes = require("./routes/subjectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const studyPlanRoutes = require("./routes/studyPlanRoutes");

console.log("TASK ROUTES LOADED");
console.log("MY UPDATED STUDYMATE SERVER IS RUNNING");
const app = express();
app.get('/test-server', (req, res) => {
  res.send('Server test works!');
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Main API routes
app.use("/api/subjects", subjectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/study-plans", studyPlanRoutes);

// Health and test routes
app.get("/", (req, res) => {
  res.send("StudyMate backend is running!");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "StudyMate API is working!"
  });
});

app.get("/test-server", (req, res) => {
  res.send("Server test works!");
});

app.get("/api/subjects-test", (req, res) => {
  res.json({
    success: true,
    message: "Subjects route test works!"
  });
});

app.get("/api/tasks-test", (req, res) => {
  res.json({
    success: true,
    message: "Tasks test route works!"
  });
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`StudyMate server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });