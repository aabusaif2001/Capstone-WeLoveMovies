if (process.env.USER) require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// app.use(express.json());

// app.use(cors());

// const moviesRouter = require("./movies/movies.router");
// const reviewRouter = require("./reviews/reviews.router");
// const theatersRouter = require("./theater/theaters.router");

// // Get all
// app.use("/movies", moviesRouter);

// app.use("/reviews", reviewRouter);

// app.use("/theaters", theatersRouter);

// // nfh
// app.use((req, res, next) => {
//   next({
//     status: 404,
//     message: `Not found: ${req.originalUrl}`,
//   });
// });

// // eh
// app.use((error, req, res, next) => {
  
//   const { status = 500, message = "Something went wrong" } = error;
//   res.status(status).json({ error: message });
// });

// module.exports = app;
const express = require("express");
const app = express();
const cors = require("cors")

app.use(cors())
app.use(express.json())

const moviesRouter= require("./movies/movies.router")
const theatersRouter = require("./theaters/theaters.router")
const reviewsRouter = require("./reviews/reviews.router")
// const notFound = require("./errors/notFound")
// const errorHandler = require("./errors/errorHandler")


app.use("/movies", moviesRouter)
app.use("/theaters", theatersRouter)
app.use("/reviews", reviewsRouter)


// app.use(notFound)
// app.use(errorHandler)

module.exports = app;
