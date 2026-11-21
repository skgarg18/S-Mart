import express from "express";
import cors from "cors";


import authRoutes from "./routers/authRoutes"

const app = express();

const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Auth server is running!"
    });
});

app.use("/auth" , authRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});