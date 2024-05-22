const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path=require('path')
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api/v1/auth", require("./routers/authRoutes"));
app.use("/api/v1/admin", require("./routers/adminRoutes"));
app.use("/api/v1/inventary", require("./routers/inventaryRoutes"));
app.use("/api/v1/analytics", require("./routers/analyticsRoutes"));
app.use(express.static(path.join(__dirname,'./client/build')))
app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Node Server is Running in ${process.env.DEV_MODE} Modeon Port ${process.env.PORT}`
      .bgBlue.white
  );
});
