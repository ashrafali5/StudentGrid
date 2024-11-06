import React, { useEffect, useState } from "react";
import "../Add/Add.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddCourses = () => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [startingDate, setStartingDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state != null) {
      console.log(location.state.course);
      setCourseName(location.state.course.courseName);
      setDescription(location.state.course.description);
      setPrice(location.state.course.price);
      setStartingDate(location.state.course.startingDate);
      setEndDate(location.state.course.endDate);
      setImageUrl(location.state.course.imageUrl);
    } else {
      setCourseName("");
      setDescription("");
      setPrice(0);
      setStartingDate("");
      setEndDate("");
      setImageUrl('');
    }
  }, [location]);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("startingDate", startingDate);
    formData.append("endDate", endDate);
    if (image) {
      formData.append("image", image);
    }

    if (location.state != null) {
      axios
        .put(
          "http://localhost:3000/course/" + location.state.course._id,
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
          navigate("/dashboard/course-detail/" + location.state.course._id);
          toast.success("!Your Course Updated...");
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          toast.error("somthing is wrong...");
        });
    } else {
      axios
        .post("http://localhost:3000/course/add-course", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          navigate("/dashboard/courses");
          toast.success("!Your Course Added...");
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
        <h1>
          {location.state != null ? "Edit Your Course" : "Add New Course"}
        </h1>
        <input
          value={courseName}
          required
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
          placeholder="Course Name"
          type="text"
        />
        <textarea
          value={description}
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          rows={5}
          cols={102}
          placeholder="Description"
          type="text"
        />
        <input
          value={price}
          required
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          placeholder="Price"
          type="number"
        />
        <input
          value={startingDate}
          required
          onChange={(e) => {
            setStartingDate(e.target.value);
          }}
          placeholder="Starting Date (DD/MM/YY)"
          type="text"
        />
        <input
          value={endDate}
          required
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          placeholder="End Date (DD/MM/YY)"
          type="text"
        />
        <input
          required={location.state == null}
          onChange={fileHandler}
          type="file"
        />
        {imageUrl && (
          <img
            className="add-course-imgUrl"
            alt="courseImageUrl"
            src={imageUrl}
          ></img>
        )}
        <button type="submit">
          {location.state != null ? "Save Changes" : "Add Course"}
        </button>
        <div
          style={{ display: "flex", marginTop: "-10px", flexDirection: "row" }}
        >
          {isLoading && (
            <i className="fa-solid fa-cog fa-spin" id="loading"></i>
          )}
          {isLoading && <span id="loading">Loading...</span>}
        </div>
      </form>
    </div>
  );
};

export default AddCourses;
