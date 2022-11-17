import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { userSignOut } from "../firebase/authentication";
import useAuthCheck from "../hooks/useAuthCheck";
import { removeAuth } from "../utils/removeAuth";

const Navigation = () => {
  const location = useLocation();
  const { pathname } = location || {};

  const isLoggdIn = useAuthCheck();

  const signOutHandler = async () => {
    await userSignOut();
    removeAuth();
  };

  return (
    <div className="navbar bg-base-100 h-[10vh] p-5 shadow-sm shadow-neutral">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-semibold"
          >
            <li className={pathname === "/services" ? "text-primary" : ""}>
              <Link to="/services">Services</Link>
            </li>
            <li className={pathname === "/blog" ? "text-primary" : ""}>
              <Link to="/blog">Blog</Link>
            </li>
            {isLoggdIn && (
              <>
                <li className={pathname === "/myReviews" ? "text-primary" : ""}>
                  <Link to="/myReviews">My Reviews</Link>
                </li>
                <li
                  className={
                    pathname === "/createService" ? "text-primary" : ""
                  }
                >
                  <Link to="/createService">Add Service</Link>
                </li>
              </>
            )}

            <li>
              {isLoggdIn ? (
                <button onClick={signOutHandler}>Sign Out</button>
              ) : (
                <Link to="/login" state={{ from: pathname }}>
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
        <Link
          className="btn btn-ghost normal-case text-xl flex items-center gap-2"
          to="/"
        >
          <img className="h-[2em] w-[2em]" src={logo} alt="" />
          <span className="font-semibold text-xl font-serif">
            Kitchen Classico{" "}
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-5 font-semibold">
          <li className={pathname === "/services" ? "text-primary" : ""}>
            <Link to="/services">Services</Link>
          </li>
          <li className={pathname === "/blog" ? "text-primary" : ""}>
            <Link to="/blog">Blog</Link>
          </li>
          {isLoggdIn && (
            <>
              <li className={pathname === "/myReviews" ? "text-primary" : ""}>
                <Link to="/myReviews">My Reviews</Link>
              </li>
              <li
                className={pathname === "/createService" ? "text-primary" : ""}
              >
                <Link to="/createService">Add Service</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end gap-5">
        {isLoggdIn ? (
          <button className="btn hidden lg:flex" onClick={signOutHandler}>
            Sign Out
          </button>
        ) : (
          <Link
            to="/login"
            className="btn hidden lg:flex"
            state={{ from: pathname }}
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navigation;
