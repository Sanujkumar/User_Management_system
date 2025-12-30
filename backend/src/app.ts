import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoute";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://user-management-system-kohl-three.vercel.app"
    ],
  })
);
  

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("hi sanuj , welcome back to my home");
});

export default app; // 🔥 MOST IMPORTANT
