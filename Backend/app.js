const express = require('express');
const CORS = require('cors');


const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');

const app = express();
const corsOptions = {
    origin:['*'] 
}
app.use(CORS());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',userRouter);
app.use('/api/posts',postRouter);

module.exports = app;