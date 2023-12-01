// server.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a schema for blog posts
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String
});

// Create a model based on the schema
const Post = mongoose.model('Post', postSchema);

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/write', (req, res) => {
    res.sendFile(__dirname + '/write.html');
});

app.get('/post/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        res.send(`<h2>${post.title}</h2><p>${post.content}</p>`);
    } catch (err) {
        res.send('Post not found');
    }
});

// Other routes for different topics/categories

// Pagination routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
