const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload"); // used for image and other files
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config", "config.env") });







app.get("/health", (req, res) => {
  res.status(200).json({ success: true, service: "ShopSphere", status: "ok" });
});

// routes

const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const product = require("./route/productRoute")

// for req.cookie to get token while autentication
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
const corsOptions = process.env.FRONTEND_URL
  ? { origin: process.env.FRONTEND_URL, credentials: true }
  : { origin: false };
app.use(cors(corsOptions));

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);



const __dirname1 = path.resolve(__dirname, "..");
const frontendBuildPath = path.join(__dirname1, "frontend", "build");

app.use(express.static(frontendBuildPath));

app.get("*", (req, res) =>
  res.sendFile(path.join(frontendBuildPath, "index.html"))
);

// Error middleware must be registered after all routes.
app.use(errorMiddleware);

module.exports = app;
