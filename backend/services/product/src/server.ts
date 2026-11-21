import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes";

const app = express();

const PORT = 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "QuickMart server is running!"
    });
});

app.use("/product", productRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});