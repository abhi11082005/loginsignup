const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

const JWT_SECRET = process.env.JWT_SECRET;

// MongoDB connection
const connectdb=async()=>{
  try{
      const connectionInstance=await mongoose.connect
      (`${process.env.MONGODB_URI}/loginsignup`);
      console.log(`MongoDB connected succesfully!! on Host:${connectionInstance.connection.host}`)
  }
  catch{
      console.log("error occur in database : ")
  }
}
connectdb()
// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "User creation failed", error });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



















// import express from "express"
// import cors from "cors"
// const app=express();
// app.use(express.urlencoded({extended:true}))
// app.use(cors())
// app.get("/",(req,res)=>{
//     console.log("get accepted")
//     return res.send(`<h1>hello</h1>`)
// })
// app.post("/users",(req,res)=>{
//     const data=req.body
//     console.log("successfully accepted",data)
//     return res.send("successfully accepted")
// })
// app.listen(8000,()=> console.log(`server is running on 8000`))