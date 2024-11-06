import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import PaymentHistory from "./components/PaymentHistory";
import Login from "./components/SignupLogin/Login";
import Signup from "./components/SignupLogin/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Courses from "./components/courses & students/Courses";
import Students from "./components/courses & students/Students";
import AddStudents from "./components/Add/AddStudents";
import AddCourses from "./components/Add/AddCourses";
import CourseDetail from "./components/Coursedetail/CourseDetail";
import StudentDetail from "./components/studentDetail/StudentDetail";
import Fee from "./components/Fee/Fee";

const myRouter = createBrowserRouter([
  { path: "", Component: Login },
  { path: "login", Component: Login },
  { path: "signup", Component: Signup },
  {
    path: "dashboard",
    Component: Dashboard,
    children: [
      { path: "", Component: Home },
      { path: "home", Component: Home },
      { path: "courses", Component: Courses },
      { path: "add-courses", Component: AddCourses },
      { path: "students", Component: Students },
      { path: "add-students", Component: AddStudents },
      { path: "fee", Component: Fee },
      { path: "payment-history", Component: PaymentHistory },
      { path: "course-detail/:id", Component: CourseDetail },
      { path: "update-courses/:id", Component: AddCourses },
      { path: "student-detail/:id", Component: StudentDetail },
      { path: "update-students/:id", Component: AddStudents },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={myRouter} />
      <ToastContainer />
    </>
  );
};

export default App;
