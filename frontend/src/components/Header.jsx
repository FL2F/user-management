import "../styles/header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import {
  getAllGroups,
  getAllAlumniGroups,
} from "../features/groups/groupSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onClick = () => {
    dispatch(getAllGroups());
    navigate("/");
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="container">
        {/* <a href="https://www.fl2f.ca">
          <h3>FL2F</h3>
        </a> */}
        <Link to="/" className="nav-item">
          <h3>FL2F</h3>
        </Link>
        <div className="nav-items">
          {user && (
            <>
              <h3 className="nav-item" onClick={onClick}>
                Groups
              </h3>
              <h3
                className="nav-item"
                onClick={() => navigate("/alumni-groups")}
              >
                Certificates
              </h3>
              <h3
                id="logout"
                type="submit"
                className="nav-item logout"
                onClick={onLogout}
              >
                Logout
              </h3>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
