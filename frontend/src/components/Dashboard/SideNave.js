import { Link, useLocation } from "react-router-dom";

const SideNave = () => {
  const location = useLocation();

  return (
    <>
      <div className="brand-container">
        <div className="side-nav-logo">
          <img src={require("../../assets/g.png")} alt="sideNavLogo" />
        </div>
        <div className="side-nav-heading">
          <h2>StudentGrid</h2>
          <p>Student Management Simplified</p>
        </div>
      </div>
      <div className="menu-container contact-us">
        <Link
          to={"/dashboard/home"}
          className={
            location.pathname === "/dashboard/home"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <span>Home</span>
          <i className="fa-solid fa-house"></i>
        </Link>
        <Link
          to={"/dashboard/courses"}
          className={
            location.pathname === "/dashboard/courses"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <span>All Courses</span>
          <i className="fa-solid fa-book"></i>
        </Link>
        <Link
          to={"/dashboard/add-courses"}
          className={
            location.pathname === "/dashboard/add-courses"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <span>Add Courses</span>
          <i className="fa-solid fa-book-medical"></i>{" "}
        </Link>
        <Link
          to={"/dashboard/students"}
          className={
            location.pathname === "/dashboard/students"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <span>All Students</span>
          <i className="fa-solid fa-user-group"></i>
        </Link>
        <Link
          to={"/dashboard/add-students"}
          className={
            location.pathname === "/dashboard/add-students"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <span>Add Students</span>
          <i className="fa-solid fa-user-plus"></i>
        </Link>
        <Link
          to={"/dashboard/fee"}
          className={
            location.pathname === "/dashboard/fee"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <span>Collect Fee</span>
          <i className="fa-solid fa-money-check-dollar"></i>
        </Link>
        <Link
          to={"/dashboard/payment-history"}
          className={
            location.pathname === "/dashboard/payment-history"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <span>Payment History</span>
          <i className="fa-solid fa-clock-rotate-left"></i>
        </Link>
          <div className="contact-us-2">
            <p>Contact developer</p>
            <i className="fa-solid fa-address-card"></i>
          </div>
          <div className="contact-us-2-number">
            <h4>+91 8979898778</h4>
            <i className="fa-solid fa-phone"></i>
          </div>
      </div>
    </>
  );
};

export default SideNave;
