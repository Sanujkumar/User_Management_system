import express from "express";  
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoute"; 
import authRoutes from  "./routes/authRoutes";

import dotenv from "dotenv";   
dotenv.config();
  
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000"      
    ],
  })   
);  
  
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);


app.get("/",(req,res) => {
    res.send("hi sanuj , welocme back to my home ");  
})

app.listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`);
});

   