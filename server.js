const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./App/config/db.config.js');
const router = require('./App/routers/router.js');


const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


app.use(bodyParser.json());


db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and Resync with { force: true }');
});


app.use('/', router);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos UMG" });
});


const server = app.listen(3000, function () { 
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
