const express = require('express');

const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',userRouter);
app.use('/api/posts',postRouter);

module.exports = app;