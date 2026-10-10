import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is connected!" });
});
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import userRouter from "./routes/user.routes.js"
import opportunityRouter from "./routes/opportunity.routes.js"
import applicationRouter from "./routes/application.routes.js"
import matchingRouter from "./routes/matching.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

//routes declaration
app.use("/api/v1/users",userRouter);
app.use("/api/v1/opportunities",opportunityRouter);
app.use("/api/v1/applications", applicationRouter);
app.use("/api/v1/matching", matchingRouter);
app.use("/api/v1/dashboard", dashboardRouter);


// http://localhost:8000/api/users/register
export default app 

// export{ app }