require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mysql = require('mysql2')
const router = require('./router/index')
const errormiddleware = require('./middlewares/error-middleware')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const onConnection = require('./socket_io/onConnection')

const PORT = process.env.PORT || 5000;
const app = express()

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});

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
app.use(bodyParser.json())
app.use(cors(corsOptions));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(errormiddleware);
app.use('/uploads', express.static('uploads'));
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);
app.use('/api', router);

io.on("connection", (socket) => {
    onConnection(io, socket)
});

const start = async () => {
    try {
        server.listen(PORT, () => console.log(`Server tarted on PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()