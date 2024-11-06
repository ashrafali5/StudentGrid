const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const Student = require("../model/student");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const Fee = require("../model/fee");
const Course = require("../model/course");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// add-students
router.post("/add-student", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "the intelligent investor");

  cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
    const newStudent = new Student({
      _id: new mongoose.Types.ObjectId(),
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      courseId: req.body.courseId,
      uId: verify.uId,
      imageUrl: result.secure_url,
      imageId: result.public_id,
    });
    newStudent
      .save()
      .then((result) => {
        res.status(200).json({
          newStudent: result,
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

// get all students of all courses
router.get("/all-students", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "the intelligent investor");

  Student.find({ uId: verify.uId })
    .select("_id uId fullName phone email address courseId imageUrl imageId")
    .then((result) => {
      res.status(200).json({
        All_students: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// get all students of a course
router.get("/all-students/:courseId", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "the intelligent investor");

  Student.find({ uId: verify.uId, courseId: req.params.courseId })
    .select("_id uId fullName phone email address courseId imageUrl imageId")
    .then((result) => {
      res.status(200).json({
        allStudents: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// delete student
router.delete("/:id", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "the intelligent investor");

  Student.findById(req.params.id).then((student) => {
    console.log(student);
    if (student.uId == verify.uId) {
      Student.findByIdAndDelete(req.params.id)
        .then((result) => {
          cloudinary.uploader.destroy(student.imageId, () => {
            res.status(200).json({
              Deleted: result,
            });
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    } else {
      res.status(500).json({
        msg: "wrong behavior",
      });
    }
  });
});

// Update student

router.put("/:id", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "the intelligent investor");

  Student.findById(req.params.id)
    .then((student) => {
      if (verify.uId != student.uId) {
        return res.status(500).json({
          error: "you cannot update this student",
        });
      }
      if (req.files) {
        cloudinary.uploader.destroy(student.imageId, () => {
          cloudinary.uploader.upload(
            req.files.image.tempFilePath,
            (err, result) => {
              const newUpdatedStudent = {
                fullName: req.body.fullName,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                courseId: req.body.courseId,
                uId: verify.uId,
                imageUrl: result.secure_url,
                imageId: result.public_id,
              };

              Student.findByIdAndUpdate(req.params.id, newUpdatedStudent, {
                new: true,
              })
                .then((data) => {
                  res.status(200).json({
                    updatedStudent: data,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          );
        });
      } else {
        const updatedData = {
          fullName: req.body.fullName,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.address,
          courseId: req.body.courseId,
          uId: verify.uId,
          imageUrl: student.imageUrl,
          imageId: student.imageId,
        };

        Student.findByIdAndUpdate(req.params.id, updatedData, { new: true })
          .then((data) => {
            res.status(200).json({
              updatedData: data,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch((err) => [
      res.status(500).json({
        error: err,
      }),
    ]);
});

// get latest 5 students
router.get("/latest-students", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "the intelligent investor");

  Student.find({ uId: verify.uId })
    .sort({ $natural: -1 })
    .limit(5)
    .then((result) => {
      res.status(200).json({
        students: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// detail of a student by id

router.get("/student-detail/:id", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "the intelligent investor");
  Student.findById(req.params.id)
    .select("_id uId fullName phone address email courseId imageUrl imageId")
    .then((result) => {
      Fee.find({
        uId: verify.uId,
        courseId: result.courseId,
        phone: result.phone,  
      })
        .then((feeData) => {
          Course.findById(result.courseId)
            .then((courseDetail) => {
                res.status(200).json({
                studentDetail: result,
                feeDetail: feeData,
                courseDetail: courseDetail,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
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
});

module.exports = router;
