const express = require("express");
const router = express.Router();
const {
  getAllBlogsController,
  getBlogByIdController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  userBlogController,
} = require("../controllers/blogController");

//get ||all blogs
router.get("/all-blog", getAllBlogsController);

// get single blog
router.get("/get-blog/:id", getBlogByIdController);

//Post || create blog
router.post("/create-blog", createBlogController);
//PUt  ||update blog
router.put("/update-blog/:id", updateBlogController);
//DELETE || delete blog
router.delete("/delete-blog/:id", deleteBlogController);

router.get('/user-blog/:id',userBlogController);

module.exports = router;
