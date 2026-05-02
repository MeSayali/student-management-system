import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

/* ---------------- CORS ---------------- */
// allow all for now (can restrict later)
app.use(cors());
app.use(express.json());

/* ---------------- ENV CONFIG ---------------- */
const PORT = process.env.PORT || 5000;

// ⚠️ Move this to .env later
const MONGO_URI = "mongodb+srv://Sayalip:sayali123@cluster1.vrhcdez.mongodb.net/studentDB?retryWrites=true&w=majority";

/* ---------------- DB CONNECT ---------------- */
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

/* ---------------- SCHEMA ---------------- */
const Student = mongoose.model("Student", {
  name: String,
  rollNo: String,
  department: String,
  marks: Number
});

/* ---------------- ROUTES ---------------- */

// GET all
app.get("/students", async (req, res) => {
  try {
    console.log("GET HIT");
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// ADD
app.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

// UPDATE
app.put("/students/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// DELETE
app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});