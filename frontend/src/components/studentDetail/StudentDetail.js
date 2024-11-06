import React, { useEffect, useState } from "react";
import "../studentDetail/StudentDetail.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const StudentDetail = () => {
  const params = useParams();
  const [studentDetail, setStudentDetail] = useState({});
  const [feeDetail, setFeeDetail] = useState([]);
  const [course, setCourse] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getStudentDetail();
  }, []);

  const getStudentDetail = () => {
    axios
      .get("http://localhost:3000/student/student-detail/" + params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setStudentDetail(res.data.studentDetail);
        setFeeDetail(res.data.feeDetail);
        setCourse(res.data.courseDetail);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something is wrong...");
      });
  };

  return (
    <div className="student-detail-main-wrapper">
      <div className="student-detail-wrapper">
        <div className="student-detail-heading">
          <h1>Student Detail</h1>
          <div className="student-detail-btn">
            <button
              onClick={() => {
                navigate("/dashboard/update-students/" + studentDetail._id, {
                  state: { studentDetail },
                });
              }}
              className="primary-btn2"
            >
              Edit
            </button>
            <button className="secondary-btn2">Delete</button>
          </div>
        </div>
      </div>
      <div className="sd-detail">
        <img src={studentDetail.imageUrl} alt="student-image" />
        <div className="sd-data">
          <h2>{studentDetail.fullName}</h2>
          <p>Phone :- {studentDetail.phone}</p>
          <p>Email :- {studentDetail.email}</p>
          <p>Address :- {studentDetail.address}</p>
          <h3 style={{ color: "#198754" }}>Course :- {course.courseName}</h3>
        </div>
      </div>

      <div className="fee-detail-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Amount</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {feeDetail.map((payment) => (
              <tr key={payment._id}>
                <td>{}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetail;
