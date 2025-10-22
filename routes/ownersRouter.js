const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const {registerOwner, loginowner }  = require("../controllers/authController")
const productModel = require("../models/product-model");

// Create owner

router.post("/create", registerOwner  )

router.post("/login", loginowner  )


// router.post('/login',async function(req,res){


//   let owner = await ownerModel.findOne({email: req.body.email})


//   req.flash("successlogin","logged in successfully")
//   res.redirect('/owners/admin')
// })

// Admin page
router.get("/admin",async (req, res) => {
  let success = req.flash("success"); // retrieve flash messages
  let success1 = req.flash("successlogin")

  let products = await productModel.find()
  // console.log(products);
  
  res.render("createproducts", { success,success1,products });
});

// Owner login page
router.get("/", (req, res) => {
  let success = req.flash("success"); // retrieve flash messages
  let error = req.flash("error"); // retrieve flash messages

  res.render("ownerLogin", { success,error });
  // res.send("hey")
});

module.exports = router;
