import "../courses & students/Courses&Students.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "../../../src/Table.module.css";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [studentList, setStudentList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    axios
      .get("http://localhost:3000/student/all-students", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.All_students);
        setStudentList(res.data.All_students);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something is wrong...");
      });
  };

  return (
    <div className="all-students">
      <div className="all-students-container">
        {studentList && studentList.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default Students;
