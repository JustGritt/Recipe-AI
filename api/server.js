require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const GenericRouter = require("./routes/genericCRUD");
const GenericController = require("./controllers/genericCRUD");
const { authGuard } = require("./middlewares/authGuard");


const userService = require('./services/user');
const recepiesService = require('./services/recepy');
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(function (req, res, next) {
    if (["POST", "PUT", "PATCH"].includes(req.method)) {
      if (!req.is("application/json")) {
        return res.sendStatus(400);
      }
    }
    next();
});
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(require("./routes/security")(userService));
app.use("/users", authGuard({JWTAuth: true}), new GenericRouter(new GenericController(userService)));
app.use("/recepies", new GenericRouter(new GenericController(recepiesService)))


app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;