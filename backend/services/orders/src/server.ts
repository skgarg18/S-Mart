import express from "express";
import cors from "cors";

import OrderRouter from "./routers/orderRouter";

const app = express();

const PORT = 3001;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "QuickMart order service is running!"
    });
}
);

app.use("/orders", OrderRouter);

app.listen(PORT, () => {
    console.log(`Order service is running on port ${PORT}`);
});
