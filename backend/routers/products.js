const { Product } = require("../models/product");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

// Configuration in server side for upload image
// Set allowed type of file uploaded
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
// storage of uploaded files into server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // verify validation of files to be uploaded
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");

    if (isValid) {
      uploadError = null;
    }
    //only upload file if uploadError is null
    cb(uploadError, "public/uploads"); // path of file located in server
  },
  filename: function (req, file, cb) {
    // setup filename for the uploaded files
    const fileName = file.originalname.replace(" ", "-"); // same as: split(' ').join('-')
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});
// defined uploadOptions to be used in post request
const uploadOptions = multer({ storage: storage });

// get products
router.get("/", async (req, res) => {
  // get products by filtering with category
  // if filter doesnt exist return all procucts
  // http://localhost:3000/api/v1/products?categories=62ff8494c7a56501e5ed84af
  let filter = {};

  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const productList = await Product.find(filter).populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

// list of products with specific details in return
router.get("/byNameImgCat", async (req, res) => {
  const productList = await Product.find()
    .select("name image category")
    .populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

// get specific product by id
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category"); // populate this field

  if (!product) {
    res.status(500).json({ message: "product was not found" });
  }
  res.status(200).send(product);
});

// create a product
router.post(
  "/",
  uploadOptions.single("image"), // expect from frontEnd a single image file
  async (req, res) => {
    // verify valid category
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid category");

    // verify image exist
    const file = req.file;
    if (!file) return res.status(400).send("No image in the request file");

    const fileName = req.file.filename; // get from func above
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: `${basePath}${fileName}`,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });

    product = await product.save();

    if (!product) return res.status(500).send("Product cannot be created");

    res.send(product);
  }
);

// modify a product
router.put("/:id", async (req, res) => {
  // verify if user is passing a valid id in params
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid Product Id");
  }

  // check the category is valid to update it
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid category");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true, // return updated data
    }
  );

  if (!product) return res.status(500).send("the product cannot be modified!");

  res.send(product);
});

// delete a product
router.delete("/:id", async (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res.status(200).json({
          success: true,
          message: "the product is deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "product not found",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

// get number of products in collection
router.get("/get/count", async (req, res) => {
  const productCount = await Product.countDocuments();
  //const productCount = await Product.countDocuments((count) => count); // error

  if (!productCount) {
    res.status(500).json({ success: false });
  }

  res.send({ productCount: productCount });
});

// featured product = product show in home
router.get("/get/featured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0; // we set limited number to show
  const products = await Product.find({ isFeatured: true }).limit(+count); // count is a string

  if (!products) {
    res.status(500).json({ success: false });
  }

  res.send(products);
});

// modify product to update the gallery images
router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 5), // expect from frontEnd a array of image file
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).send("Invalid Product Id");
    }

    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    if (files) {
      files.map((file) => {
        imagesPaths.push(`${basePath}${file.filename}`);
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      {
        new: true, // return updated data
      }
    );

    if (!product)
      return res.status(500).send("the product cannot be modified!");

    res.send(product);
  }
);

module.exports = router;
