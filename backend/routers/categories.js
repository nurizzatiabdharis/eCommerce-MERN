const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

// get list category
router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

// get category by id
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(500).json({ message: "category was not found" });
  }
  res.status(200).send(category);
});

// create a category
router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) return res.status(404).send("the category cannot be created!");

  res.send(category);
});

// modify a category
router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    {
      new: true, // return updated data
    }
  );

  if (!category)
    return res.status(404).send("the category cannot be modified!");

  res.send(category);
});

// delete a category
router.delete("/:categoryId", async (req, res) => {
  Category.findByIdAndRemove(req.params.categoryId)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: "the category is deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "category not found",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

// CREATE using old promise methode
// router.post("/", (req, res) => {
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   user
//     .save()
//     .then((createdUser) => {
//       res.status(201).json(createdUser);
//     })
//     .catch((err) => res.status(500).json({ error: err, success: false }));
// });

module.exports = router;
