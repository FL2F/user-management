import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import GroupItem from "../components/GroupItem";
import { getAllGroups } from "../features/groups/groupSlice";
import { logout } from "../features/auth/authSlice";
import { resetPass } from "../features/members/memberSlice";

const GroupSelect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );
  const { groupsArr } = useSelector((state) => state.groups);
  const { pass } = useSelector((state) => state.members);

  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) return navigate("/login");
    if (user.role !== "admin") {
      toast.error("User not authorized");
      dispatch(logout());
      return navigate("/login");
    }
    if (pass !== "") {
      dispatch(resetPass());
    }
    if (groupsArr.length === 0) {
      dispatch(getAllGroups());
    }
  }, [user, navigate, dispatch, isError, message]);

  let groups = [];
  groupsArr.forEach((group) => {
    if (!groups.includes(group.group_id) && group.role === "alumni")
      groups.push(group.group_id);
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      {user ? (
        <>
          <section className="heading">
            <h2>Alumni Groups</h2>
            <p>Please select an alumni group</p>
          </section>
          <section className="content">
            {groupsArr.length > 0 ? (
              <div className=" members">
                {groups.sort().map((group, index) => (
                  <GroupItem
                    key={index}
                    group={group}
                    alumni={true}
                    color="green"
                  />
                ))}
              </div>
            ) : (
              <h3>No groups to show</h3>
            )}
          </section>
        </>
      ) : (
        <>
          <h2>You're not logged in</h2>
          <Link to="/login">
            <button className="btn btn-primary btn-block" type="submit">
              Please Login
            </button>
          </Link>
        </>
      )}
    </>
  );
};
export default GroupSelect;
