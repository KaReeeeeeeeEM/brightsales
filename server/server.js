const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();

// Express session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));

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
const stockRoutes = require('./routes/stockRoutes');
const activityRoutes = require('./routes/activityRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const salesRoutes = require('./routes/salesRoutes');

//routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/stock", stockRoutes);
app.use("/activity", activityRoutes);
app.use("/categories", categoryRoutes);
app.use("/expenses", expenseRoutes);
app.use("/sales", salesRoutes);

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
