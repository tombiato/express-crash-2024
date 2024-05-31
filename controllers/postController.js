const posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

// @desc: get all posts
// @route: GET /api/posts
// @access: Public
// @params: req, res, next
// @return: JSON response
export const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.status(200).json(posts);
};

// @desc: get single post
// @route: GET /api/posts/:id
// @access: Public
// @params: req, res, next
// @return: JSON response
export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const err = new Error(`Post with id ${id} not found`);
    err.status = 404;
    return next(err);
  }

  res.status(200).json(post);
};

// @desc: create post
// @route: POST /api/posts
// @access: Public
// @params: req, res, next
// @return: JSON response
export const createPost = (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    const err = new Error("Title is required");
    err.status = 400;
    return next(err);
  }

  const id = posts.length + 1;
  const newPost = { id, title };

  posts.push(newPost);

  res.status(201).json(newPost);
};

// @desc: update post
// @route: PUT /api/posts/:id
// @access: Public
// @params: req, res, next
// @return: JSON response
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const err = new Error(`Post with id ${id} not found`);
    err.status = 404;
    return next(err);
  }

  const { title } = req.body;

  if (!title) {
    const err = new Error("Title is required");
    err.status = 400;
    return next(err);
  }

  post.title = title;

  res.status(200).json(post);
};

// @desc: delete post
// @route: DELETE /api/posts/:id
// @access: Public
// @params: req, res, next
// @return: JSON response
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    const err = new Error(`Post with id ${id} not found`);
    err.status = 404;
    return next(err);
  }

  posts.splice(index, 1);

  res.status(200).json({ message: `Post with id ${id} deleted` });
};
