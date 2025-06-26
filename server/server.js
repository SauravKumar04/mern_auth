//Server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-auth-zovp.vercel.app",
];


app.use(express.json()); // All the request will be parsed using json.
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // allow same-origin (curl/postman) if no origin provided
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for ${origin}`));
    }
  },
  credentials: true,
}));

//API ENDPOINTS
app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server started on PORT : ${port}`);
});
