require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mysql = require('mysql2')
const router = require('./router/index')
const errormiddleware = require('./middlewares/error-middleware')

const PORT = process.env.PORT || 5000;
const app = express()

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});
  
var corsOptions = {
    origin: "http://localhost:3000",
    credentials:true,       
};

app.use(cookieParser())
app.use(cors(corsOptions));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);


app.get("/api/test", (req, res) => {
    connection.query("SELECT * FROM accounts", (err, result) => {
      if (err) {
        res.send(err)
      }
      res.send(result);
    });
});

app.post('/api/reg', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    res.send({email, password});
});

app.use(errormiddleware);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server tarted on PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()