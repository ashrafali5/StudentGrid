import React, { useEffect, useState } from "react";
import "../Add/Add.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddStudents = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [courseId, setCourseId] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getCourses();
    if (location.state) {
      console.log(location.state);
      setFullName(location.state.studentDetail.fullName);
      setPhone(location.state.studentDetail.phone);
      setEmail(location.state.studentDetail.email);
      setAddress(location.state.studentDetail.address);
      setCourseId(location.state.studentDetail.courseId);
      setImageUrl(location.state.studentDetail.imageUrl);
    } else {
      setFullName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setCourseId("");
      setImageUrl("");
    }
  }, [location]);

  const getCourses = () => {
    axios
      .get("http://localhost:3000/course/all-courses", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data.courses);
        setCourseList(res.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("courseId", courseId);
    if (image) {
      formData.append("image", image);
    }

    if (location.state) {
      axios
        .put(
          "http://localhost:3000/student/" + location.state.studentDetail._id,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          navigate(
            "/dashboard/student-detail/" + location.state.studentDetail._id
          );
          toast.success("!Your Course Updated...");
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          toast.error("somthing is wrong...");
        });
    } else {
      axios
        .post("http://localhost:3000/student/add-student", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          navigate("/dashboard/courses");
          toast.success("!Your Course Added successfully...");
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          toast.error("somthing is wrong...");
        });
    }
  };

  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="course-container">
      <form onSubmit={submitHandler} className="add-course-form">
        <h1>{location.state ? "Edit Student Details" : "Add New Student"}</h1>
        <input
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          placeholder="Student Name"
          type="text"
        />
        <input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Phone"
          type="number"
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          type="email"
        />
        <textarea
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="Address"
        ></textarea>
        <select
          disabled={location.state}
          value={courseId}
          onChange={(e) => {
            setCourseId(e.target.value);
          }}
        >
          <option>Select Course</option>
          {courseList.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseName}
            </option>
          ))}
        </select>
        <input required={!location.state} onChange={fileHandler} type="file" />
        {imageUrl && (
          <img
            className="add-course-imgUrl"
            alt="student-pic"
            src={imageUrl}
          ></img>
        )}
        <button type="submit">
          {location.state ? "Save Changes" : "Add Student"}
        </button>
        <div
          style={{ display: "flex", marginTop: "-10px", flexDirection: "row" }}
        >
          {isLoading && <span id="loading2">Loading...</span>}
        </div>
      </form>
    </div>
  );
};

export default AddStudents;
