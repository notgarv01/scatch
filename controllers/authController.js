const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
// const { generateToken1 } = require("../utils/generateToken1");

module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;
    let user = await userModel.findOne({ email: email });

    if (user) {
      return res.send("you already have an account!! Please login..")
    }else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) return req.send(err.message);
          else {
            let user = await userModel.create({
              email,
              fullname,
              password: hash,
            });
            let token = generateToken(user);
            res.cookie("token", token);
            req.flash("success", "user created successfully");
            res.redirect('/shop')
          }
        });
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.registerOwner =  async (req, res) => {
  try {
    let {fullname, email, password} = req.body;

    let owner = await ownerModel.findOne();
    if (owner){
       return res.status(403).send("You don't have permission to create a new owner")
    }else{
      bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(password,salt,async function(err,hash){
          if (err) return req.send(err.message);
          else {
            let owner = await ownerModel.create({
              email,
              fullname,
              password: hash,
            });
            let token = generateToken(owner);
            res.cookie("token", token);
            req.flash("success", "owner created successfully");
            res.redirect('/owners/admin')
          }
        })
      })
    }

    // let { fullname, email, password } = req.body;

    // await ownerModel.create({ fullname, email, password });

    // req.flash("success", "Your owner account is created");
    // res.redirect("/owners/admin"); // redirect to admin page
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.loginUser = async function(req,res){
  let {email,password} = req.body
  
  let user = await userModel.findOne({email: email})

  if (!user) {
  req.flash("error", "User not found!");
  return res.redirect("/");
}


  bcrypt.compare(password, user.password, function(err,result){
    if(result){
      let token = generateToken(user)
      res.cookie("token", token)
      res.redirect('/shop')
    }else{
      req.flash("error", "Email or password is incorrect");
      return res.redirect("/");
    }

  })
}

module.exports.loginowner = async function(req,res){
  let {email,password} = req.body
  
  let owner = await ownerModel.findOne({email: email})

  if (!owner) {
  req.flash("error", "Owner not found!");
  return res.redirect("/owners");
}


  bcrypt.compare(password, owner.password, function(err,result){
    if(result){
      let token1 = generateToken(owner)
      res.cookie("token", token1)
      let success1 = req.flash("success","logged in successfully")
      res.redirect('/owners/admin')
    }else{
      req.flash("error", "Email or password is incorrect");
      return res.redirect("/owners");
    }

  })
}

module.exports.logout = function(req,res){
  res.cookie("token", "")
  res.redirect('/')
}


