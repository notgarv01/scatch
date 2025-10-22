const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
  let error = req.flash("error");
  let success = req.flash("success")
  res.render("index", { error, loggedin: false, success });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async function (req, res) {
  let user = await userModel
    .findOne({ _id: req.user._id })
    .populate("cart");
    console.log(user);
    

    let total = 0;
    let subtotal =0;
    let totaldiscount = 0;
    user.cart.forEach(function(item) {
      subtotal += item.price;
      totaldiscount += item.discount
      total += (item.price - (item.discount ));
    });

    total += 20;

    // console.log("Total bill:", total,subtotal);
    let cart = user.cart

    res.render("cart", { user,cart, bill: total,subtotal,totaldiscount });
});

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "added to cart");
  res.redirect("/shop");
});

router.get("/deletecartitems/:id", isLoggedIn, async (req, res) => {
  const itemId = req.params.id;
  const user = await userModel.findOne({_id: req.user._id}); 

  const index = user.cart.findIndex(item => item._id.toString() === itemId);
  console.log(index);
  if(index>-1){
    user.cart.splice(index,1);

  }
  
  await user.save();
  // console.log(user,user.cart);
  

  res.redirect("/cart"); 
});



router.get('/profile', isLoggedIn ,async function(req,res){
  let user = await userModel.findOne({email: req.user.email})
  res.render('profile', {user})
})

router.post('/edit/:userid',isLoggedIn,async function(req,res){
  let user = await userModel.findOne({_id : req.params.userid})
  // console.log(user);
  
  res.render('edit', {user})
})

router.post('/update/:userid',isLoggedIn,async function(req,res){
  const {fullname,email} = req.body;
  console.log(fullname,email);
  
  let user = await userModel.findOneAndUpdate(
    {_id : req.params.userid}, 
    {fullname: fullname, email: email},
    {new : true})
  // console.log(user);
  await user.save()

  res.render("profile",{user})
  // res.redirect('/profile',{user})
})


module.exports = router;
