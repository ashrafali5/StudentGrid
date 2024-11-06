import React, { useEffect, useState } from "react";
import "../Fee/Fee.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Fee = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const [remark, setRemark] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    axios
      .get("http://localhost:3000/course/all-courses", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setCourseList(res.data.courses);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something is wrong...");
        setIsLoading(false);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(
        "http://localhost:3000/fee/add-fee",
        {
          fullName: fullName,
          amount: amount,
          phone: phone,
          remark: remark,
          courseId: courseId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        navigate("/dashboard/payment-history");
        toast.success("Payment Added !");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error("somthing is wrong...");
      });
  };

  return (
    <div>
      <div className="fee-container">
        <form onSubmit={submitHandler} className="fee-form">
          <h1>Payment</h1>
          <input
            required
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            type="text"
            placeholder="Full Name"
          />
          <input
            required
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            type="text"
            placeholder="phone"
          />
          <input
            required
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type="text"
            placeholder="Amount"
          />
          <input
            required
            onChange={(e) => {
              setRemark(e.target.value);
            }}
            type="text"
            placeholder="Remark"
          />
          <select
            onChange={(e) => {
              setCourseId(e.target.value);
            }}
          >
            <option>Select Course</option>
            {courseList.map((course) => (
              <option key={course._id}>{course.courseName}</option>
            ))}
          </select>
          <button type="submit">
            <i className="fa-solid fa-dollar-sign"></i>
            <span style={{ marginLeft: "5px" }}>Pay</span>
          </button>
          {isLoading && <span id="loading3">Loading...</span>}
        </form>
      </div>
    </div>
  );
};

export default Fee;
