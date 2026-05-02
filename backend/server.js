import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors()); // 🔥 FIXED
app.use(express.json());

mongoose.connect("mongodb+srv://Sayalip:sayali123@cluster1.vrhcdez.mongodb.net/studentDB?retryWrites=true&w=majority")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

const Student = mongoose.model("Student", {
  name: String,
  rollNo: String,
  department: String,
  marks: Number
});

app.get("/students", async (req, res) => {
  try {
    console.log("GET HIT");
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/students/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});