// to start the server use npm init...
// to run the server we need the command --->  npm run server....


//  npm i cors dotenv express jsonwebtoken mongoose multer nodemon razorpay stripe validator cloudinary bcrypt

//  cors --> to allow the frontend to interact with backend..
// dotenv -->
// express-->
// jsonwebtoken-->user authentication
// mongoose -->database connectivity
// cloudinary --> to store the images in the cloud storage
// nodemon-->restrart backend whenever we restart
// razorpay, stripe--> to exemplify the transactions data..
// validator--> whether the data from the user is valid or not
// bcyrpt--> to encrypt the password and sensitive info..
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./Routes/Userroute.js";
import productRouter from "./Routes/ProductRoute.js";
import cartRouter from "./Routes/CartRoute.js";
import orderRouter from "./Routes/OrderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Connect services
connectDb();
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter)

// Test route
app.get("/", (req, res) => {
  res.send("API working");
});

// Start server
app.listen(port, () => {
  console.log(`Server Started on PORT: ${port}`);
});
