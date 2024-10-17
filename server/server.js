const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

//routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Placeholder route
app.get("/", (req, res) => {
  console.log("User visited ", req);
  return res.json({ data: "API is running..." });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
