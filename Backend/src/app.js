import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
))

app.use(express.json({ limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("Public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'

//routes declaration

app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register

import foodRouter from './routes/food.routes.js'

app.use("/api/v1/food", foodRouter)

// http://localhost:8000/api/v1/food/

import categoryRouter from './routes/category.routes.js'
app.use("/api/v1/category", categoryRouter)

// http://localhost:8000/api/v1/category

import cartRouter from './routes/cart.routes.js'
app.use("/api/v1/cart", cartRouter)

// http://localhost:8000/api/v1/cart

import orderRouter from './routes/order.routes.js'

app.use("/api/v1/order", orderRouter)

// http://localhost:8000/api/v1/order

import payRouter from './routes/payment.routes.js'

app.use("/api/v1/payment", payRouter)

// http://localhost:8000/api/v1/payment


export default app;