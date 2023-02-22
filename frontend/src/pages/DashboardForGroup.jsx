import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  resetPass,
  updateRole,
  updateFacilitator,
  getMembers,
} from "../features/members/memberSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import MemberItem from "../components/MemberItem";
import { logout } from "../features/auth/authSlice";

const DashboardForGroup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allMembers, pass, isLoading, isError, message } = useSelector(
    (state) => state.members
  );

  // selected group_id
  const { groupID } = useParams();

  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) {
      return navigate("/login");
    }
    if (user.role !== "admin") {
      toast.error("User not authorized");
      dispatch(logout());
      return navigate("/login");
    }
    if (pass.length >= 1) {
      dispatch(resetPass());
    }

    // if (allMembers.length === 0) {
    // }
  }, [user, navigate, dispatch, isError, message, allMembers]);

  useEffect(() => {
    dispatch(getAll());
  }, []);

  const membersArr = allMembers.filter(
    (members) => members.group_id === groupID
  );

  // This is temporarily hard coded as 34. Need to make sure there is a facilitator for each group.
  // Need to find a better way
  const findFacilitator =
    allMembers.length > 0 &&
    allMembers.find((member) =>
      membersArr[0].facilitator !== null
        ? member.id === membersArr[0].facilitator
        : 34
    );
  const [facilitator, setFacilitator] = useState(
    findFacilitator ? findFacilitator.id : "34"
  );

  const submitFacilitator = (e) => {
    e.preventDefault();
    try {
      dispatch(updateFacilitator({ groupID, facilitator }));
      dispatch(getAll());
      dispatch(getMembers(groupID));
      toast.success("Facilitator Updated for Group");
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();
      toast.error(message);
      console.log(message);
    }
  };

  const admins = allMembers.filter((member) => member.role === "admin");

  let members = membersArr.filter((member) => member.group_id === groupID);

  const onDelete = () => {
    navigate(`/${groupID}/confirm`);
  };

  const [role, setRole] = useState("");
  const [hidden, setHidden] = useState(true);
  const onClick = () => {
    setHidden(false);
    setRole("");
  };

  const onCancel = () => {
    setHidden(true);
  };

  const onChange = (e) => {
    setRole(e.target.value);
  };

  const update = () => {
    try {
      dispatch(updateRole({ groupID, role }));
      toast.success("group roles updated");
      dispatch(getAll());
      setHidden(true);
      if (message) console.log("error", message);
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();
      toast.error(message);
      console.log(message);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      {user ? (
        <>
          <section className="heading">
            <h2>User Management for group: {groupID}</h2>
            <button
              className="btn btn-primary btn-add"
              type="submit"
              onClick={() => navigate(`/${groupID}/create-member`)}
            >
              Create New Member
            </button>
          </section>
          <section className="content">
            {members.length > 0 ? (
              <div className="flex-col">
                <div className="members">
                  {members.map((member, index) => (
                    <MemberItem key={index} member={member} />
                  ))}
                  {/* {facilitator && <MemberItem member={facilitator} />} */}
                </div>
                <div className="btn-group">
                  <form className="form role-form">
                    <div className="form-group" hidden={!hidden}>
                      <label htmlFor="facilitator">Assign Facilitator</label>
                      <select
                        type="text"
                        name="facilitator"
                        id="facilitator"
                        placeholder="facilitator"
                        value={facilitator}
                        onChange={(e) => setFacilitator(e.target.value)}
                      >
                        <option value="">Select a Facilitator</option>
                        {admins.map((admin, index) => (
                          <option key={index} value={admin.id}>
                            {admin.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                  <div className="delete" hidden={!hidden}>
                    <div
                      className="btn btn-secondary"
                      onClick={submitFacilitator}
                    >
                      Update Facilitator
                    </div>
                  </div>
                </div>
                <div className="btn-group">
                  <div className="delete" hidden={!hidden}>
                    <div className="btn btn-secondary" onClick={onClick}>
                      Update Roles For Group
                    </div>
                  </div>
                  <form className="form role-form" hidden={hidden}>
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <select
                        type="text"
                        name="role"
                        id="role"
                        placeholder="role"
                        value={role}
                        onChange={onChange}
                      >
                        <option value="">Select a Role</option>
                        <option value="guest">Guest</option>
                        <option value="participant">Participant</option>
                        <option value="admin">Admin</option>
                        <option value="alumni">Alumni</option>
                      </select>
                    </div>
                  </form>

                  <div className="delete" hidden={hidden}>
                    <button className="btn btn-secondary" onClick={update}>
                      Update Roles
                    </button>
                  </div>
                  <div className="delete" hidden={hidden}>
                    <button className="btn btn-cancel" onClick={onCancel}>
                      Cancel
                    </button>
                  </div>

                  {/* Delete All Members in Group BTN */}
                  <div className="delete delete-all" hidden={!hidden}>
                    <div>
                      <button onClick={onDelete} className="btn btn-delete">
                        Delete Group
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h3>No members to show</h3>
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
export default DashboardForGroup;
