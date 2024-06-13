import express from 'express';
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");
const path = require('C:/Users/krish/AppData/Local/Microsoft/TypeScript/5.4/node_modules/@types/node/path.d.ts')
const fileURLToPath = require('C:/Users/krish/AppData/Local/Microsoft/TypeScript/5.4/node_modules/@types/node/path.d.ts')
const dirname = require('C:/Users/krish/AppData/Local/Microsoft/TypeScript/5.4/node_modules/@types/node/path.d.ts')
const ConsoleHelperBackend = require('./ConsoleHelperBackend.js')

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//config dotenv file
dotenv.config();

//database call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./client/build")));

const BASE_URL = process.env.BASE_URL;

//user routes
app.use("/api/v1/users", require("./routes/userRoute"));

//transaction routes
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
//port
const PORT = process.env.PORT || 8080;

//listen server
app.listen(`{PORT}`, () => {
    ConsoleHelperBackend(
        `Server running on port ${process.env.DEV}`.bgGreen.white
    );
});
