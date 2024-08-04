
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

let posts = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// Home route (list of posts)
app.get('/', (req, res) => {
  res.render('home', { posts: posts });
});


// New post route (form)
app.get('/new', (req, res) => {
  res.render('new');
});


app.post('/new', (req, res) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content
  };
  posts.push(newPost);
  res.redirect('/');
});


// Edit post route
app.get('/edit/:index', (req, res) => {
  const index = req.params.index;
  res.render('edit', { post: posts[index], postIndex: index });
});


app.post('/edit/:index', (req, res) => {
  const index = req.params.index;
  posts[index] = {
    title: req.body.title,
    content: req.body.content
  };
  res.redirect('/');
});


// Delete post route
app.post('/delete/:index', (req, res) => {
  const index = req.params.index;
  posts.splice(index, 1);
  res.redirect('/');
});


// Post details route
app.get('/post/:index', (req, res) => {
  const index = req.params.index;
  res.render('post', { post: posts[index] });
});


app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});