const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// body parser midleware
app.use(express.json());
// urlencoded middleware
app.use(express.urlencoded({ extended: false }));

app.use(cors());
// app.use(
//   cors({
//     origin: [
//       "https://storied-nasturtium-f5b242.netlify.app/",
//       "https://user-management.fl2f.ca",
//       "http://localhost:3000",
//     ],
//     credentials: true,
//   })
// );

app.use("/api/login", require("./routes/userRoutes")); //working
app.use("/api/members", require("./routes/memberRoutes")); //working
app.use("/api/groups", require("./routes/groupRoutes")); //working

// set up server to listen on specific port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
