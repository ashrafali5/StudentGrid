import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../Coursedetail/CourseDetail.css";
import styles from "../../../src/Table.module.css";

const CourseDetail = () => {
  const params = useParams();
  const [course, setCourse] = useState({});
  const [studentList, setStudentList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCourseDetail();
  }, []);

  const getCourseDetail = () => {
    axios
      .get("http://localhost:3000/course/course-detail/" + params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setCourse(res.data.course);
        setStudentList(res.data.studentList);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something is wrong...");
      });
  };

  return (
    <div className="course-detail-main-container">
      {course && (
        <div className="course-detail-container">
          <div className="course-detail-wrapper">
            <img id="course-detail-img" src={course.imageUrl} alt="course-thumbnail" />
            <div className="text-list">
              <h1>{course.courseName}</h1>
              <p>Price :- {course.price}</p>
              <p>Starting Date :- {course.startingDate}</p>
              <p>End Date :- {course.endDate}</p>
            </div>
          </div>
          <div className="btn-container">
            <button
              className="primary-btn"
              onClick={() => {
                navigate("/dashboard/update-courses/" + course._id, {
                  state: { course },
                });
              }}
            >
              Edit
            </button>
            <button className="secondary-btn">Delete</button>
          </div>
          <div className="description-container">
            <h2>Description</h2>
            <p id="desc-p">{course.description}</p>
          </div>
        </div>
      )}

      {studentList && studentList.length > 0 && (
        <div className="studentlist-container">
          <div className={styles}>
            <table>
              <thead>
                <tr>
                  <th>Student's Pic</th>
                  <th>Stident Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student) => (
                  <tr
                    onClick={() => {
                      navigate("/dashboard/student-detail/" + student._id);
                    }}
                    key={student._id}
                  >
                    <td>
                      <img
                        className="student-pic"
                        src={student.imageUrl}
                        alt="studentList-image"
                      />
                    </td>
                    <td>
                      <p id="studentName">{student.fullName}</p>
                    </td>
                    <td>
                      <p>{student.phone}</p>
                    </td>
                    <td>
                      <p>{student.email}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
