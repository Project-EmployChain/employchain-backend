const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
var cors = require('cors');

dotenv.config();
const port = process.env.PORT || 5000;

require("./helpers/mongoconn");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//------------------ ROUTES -------------------


//---------------------------------------------

app.get('/test', (req, res, next) => {
    res.send('Hello World!');
}) 


app.listen(port, () => {
    console.log(`Server running live on port : ${port}`);
})