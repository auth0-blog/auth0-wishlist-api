const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

const { wishlistRouter } = require("./wishlist/wishlist.router");

dotenv.config();

const PORT = process.env.PORT;

const app = express();
const apiRouter = express.Router();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);
apiRouter.use("/wishlist", wishlistRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`API serving resources on PORT:${PORT}`);
});
