const express = require("express");
const app = express();
const db = require("./models");
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());

// Initialize routes
const serviceRouter = require("./apis/Services");
const userRouter = require("./apis/Users");
const commentsRouter = require("./apis/Comments");
const gptRouter = require("./apis/Gpt");
const likesRouter = require("./apis/Likes");


app.use('/service', serviceRouter);
app.use('/user', userRouter);
app.use('/comments', commentsRouter);
app.use('/gpt', gptRouter);
app.use('/likes', likesRouter); 

// Ensure database synchronization before starting server
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server is running on http://localhost:3001");
    });
});
