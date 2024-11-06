const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const User = require("../model/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// user signup
router.post("/signup", (req, res) => {
  User.find({ email: req.body.email }).then((users) => {
    if (users.length > 0) {
      res.status(500).json({
        message: "user already registered...",
      });
    }
    cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({
            error: err,
          });
        }

        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          fullName: req.body.fullName,
          email: req.body.email,
          phone: req.body.phone,
          password: hash,
          imageUrl: result.secure_url,
          imageId: result.public_id,
        });
        newUser
          .save()
          .then((result) => {
            res.status(200).json({
              newUser: result,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      });
    });
  });
});

// user login
router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .then((users) => {
      if (users.length == 0) {
        return res.status(404).json({
          msg: "user not found...",
        });
      }
      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            error: "password matching failed!",
          });
        }
        const token = jwt.sign(
          {
            fullName: users[0].fullName,
            email: users[0].email,
            phone: users[0].phone,
            uId: users[0]._id,
          },
          "the intelligent investor",
          {
            expiresIn: "365d",
          }
        );
        res.status(200).json({
          _id: users[0]._id,
          fullName: users[0].fullName,
          email: users[0].email,
          phone: users[0].phone,
          imageUrl: users[0].imageUrl,
          imageId: users[0].imageId,
          token: token,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
