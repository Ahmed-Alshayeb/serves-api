const express = require("express");

const app = express();

const dotenve = require("dotenv");

dotenve.config();

const dbConnection = require("./config/dbConnection");

// Routes
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const companyRoute = require("./routes/companyRoute");
const profileRoute = require("./routes/profileRoute");
const orderRoute = require("./routes/orderRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

const AppError = require("./utils/AppErorr");

const globalError = require("./middleware/errorMiddleware");

// => Database connection
dbConnection();

// Middlewares
app.use(express.json());

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subCategories", subCategoryRoute);
app.use("/api/v1/companies", companyRoute);
app.use("/api/v1/profiles", profileRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

// Error Handling
app.use("*", (req, res, next) => {
  next(new AppError(`Can't Found this Route: ${req.originalUrl}`, 400));
});

// Glodal error handling middelware
app.use(globalError);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening ............");
});
