import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
  createMember,
  getAll,
  getMembers,
} from "../features/members/memberSlice";
import { getAllGroups } from "../features/groups/groupSlice";
import { logout } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const CreateMember = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groupID } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { allMembers, isLoading, isError, message } = useSelector(
    (state) => state.members
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) {
      navigate("/login");
    }
    if (user.role !== "admin") {
      toast.error("User not authorized");
      dispatch(logout());
      return navigate("/login");
    }

    if (allMembers.length === 0) {
      dispatch(getAll());
    }
  }, [user, navigate, dispatch, allMembers]);

  const member = allMembers.find((member) => member.group_id === groupID);
  const admins = allMembers.filter((member) => member.role === "admin");

  const [memberData, setMemberData] = useState({
    id: uuidv4(),
    username: "",
    password: "",
    confirm: "",
    title: "",
    group_id: groupID ? groupID : "",
    role: "",
    email: "",
    phonenumber: "",
    linkedin: "",
    facilitator: member ? member.facilitator : "34",
  });

  const {
    id,
    username,
    password,
    confirm,
    title,
    group_id,
    role,
    email,
    phonenumber,
    linkedin,
    facilitator,
  } = memberData;

  const onChange = (e) => {
    setMemberData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const passCheck = () => {
    if (password !== confirm) return false;
    return true;
  };

  const passStrength = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,100})/;
    if (regex.test(password)) {
      return true;
    }
    console.log(password);
    return false;
  };

  // Submit schedule and events
  const onSubmit = (e) => {
    e.preventDefault();
    const canSave = [
      id,
      username,
      password,
      confirm,
      title,
      group_id,
      role,
      email,
      facilitator,
      // phonenumber, and linkedin are not required
    ].every((el) => el.length >= 1);

    if (!passCheck()) {
      toast.error("passwords do no match");
      return;
    }

    if (!passStrength(password)) {
      toast.error(
        "password must contain at least 1 letter, uppercase, lowercase, number, special character, and be at least 8 characters long"
      );
      return;
    }

    if (canSave) {
      try {
        dispatch(
          createMember({
            id,
            username,
            password,
            title,
            group_id,
            role,
            email,
            phonenumber,
            linkedin,
            funds: 10000,
            facilitator,
          })
        );
        toast.success("Member successfully updated");

        dispatch(getMembers(group_id));
        dispatch(getAllGroups());
        dispatch(getAll());
        navigate(`/${group_id}`);
      } catch (error) {
        const message =
          error.response.data.message || error.message || error.toString();
        toast.error(message);
        console.log(message);
      }
    } else {
      toast.error(
        "username, password, title, group id, and role are required",
        {
          position: toast.POSITION.TOP_LEFT,
        }
      );
      console.log("id", id);
      console.log("username", username);
      console.log("password", password);
      console.log("title", title);
      console.log("group_id", group_id);
      console.log("role", role);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="schedule-form">
      <div className="heading">
        <h2>Create New Member</h2>
      </div>

      <form className="form">
        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter a username"
            value={username}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter a password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password *</label>
          <input
            type="password"
            name="confirm"
            id="confirm-password"
            placeholder="Confirm the password"
            value={confirm}
            onChange={onChange}
          />
        </div>
        <div className="names">
          <div className="form-group">
            <label htmlFor="title">Full Name (with prefix if any) *</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter Full Name (with prefix if any)"
              value={title}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <select
            type="text"
            name="role"
            id="role"
            value={role}
            onChange={onChange}
          >
            <option value="">Select Role</option>
            <option value="guest">Guest</option>
            <option value="participant">Participant</option>
            <option value="admin">Admin</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="group_id">Group ID *</label>
          <input
            type="text"
            name="group_id"
            id="group_id"
            placeholder="Enter a group name"
            value={group_id}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter an email"
            value={email}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone number">Phone Number</label>
          <input
            type="text"
            name="phonenumber"
            id="phonenumber"
            placeholder=" Enter a phone number"
            value={phonenumber}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="LinkedIn">LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            id="linkedin"
            placeholder="Enter your LinkedIn Account"
            value={linkedin}
            onChange={onChange}
          />
        </div>
        <form className="form role-form">
          <div className="form-group">
            <label htmlFor="facilitator">Assign Facilitator</label>
            <select
              type="text"
              name="facilitator"
              id="facilitator"
              placeholder="facilitator"
              value={facilitator}
              onChange={onChange}
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
      </form>
      <div className="btn-group">
        <button className="btn btn-primary" type="submit" onClick={onSubmit}>
          Submit
        </button>
        <button
          className="btn btn-cancel"
          onClick={() => (groupID ? navigate(`/${groupID}`) : navigate("/"))}
        >
          Cancel
        </button>
      </div>
    </section>
  );
};
export default CreateMember;
