import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import GeneratePDF from "../components/generatePDF";
import Spinner from "../components/Spinner";
import {
  editMember,
  getAll,
  getMembers,
  getPass,
  resetPass,
  updatePass,
} from "../features/members/memberSlice";

const MemberEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, groupID } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { allMembers, membersArr, pass, isLoading, isError, message } =
    useSelector((state) => state.members);

  useEffect(() => {
    if (isError) {
      console.log("message error from memberEdit", message);
    }

    if (!user) {
      navigate("/login");
    }

    if (allMembers.length === 0) {
      dispatch(getAll());
    }

    if (
      membersArr.length === 0 ||
      !membersArr.some((member) => String(member.id) === id)
    ) {
      console.log("getting members...... :>> ");
      dispatch(getMembers(groupID));
    }

    dispatch(getPass(id));
  }, [user, membersArr, allMembers, navigate, isError, message, dispatch]);

  let member = membersArr.find((member) => String(member.id) === id);

  const admins = allMembers.filter((member) => member.role === "admin");

  const [password, setPassword] = useState("");

  const [memberData, setMemberData] = useState({
    id: member ? member.id : id,
    username: member ? member.username : "",
    title: member ? member.title : "",
    group_id: member ? member.group_id : groupID,
    role: member ? member.role : "",
    email: member ? member.email : "",
    phonenumber: member ? member.phonenumber : "",
    linkedin: member ? member.linkedin : "",
    facilitator: member ? member.facilitator : "",
  });

  useEffect(() => {
    //may want to use this later if we implement a current password check first
    // if (pass.length > 0) {
    //   setPassword(pass[0].password);
    //   setConfirm(pass[0].password);
    // }
    setMemberData({
      id: member && member.id ? member.id : id,
      username: member && member.username ? member.username : "",
      title: member && member.title ? member.title : "",
      group_id: member && member.group_id ? member.group_id : groupID,
      role: member && member.role ? member.role : "",
      email: member && member.email ? member.email : "",
      phonenumber: member && member.phonenumber ? member.phonenumber : "",
      linkedin: member && member.linkedin ? member.linkedin : "",
      facilitator: member && member.facilitator ? member.facilitator : "",
    });
  }, [member, pass, membersArr]);
  const {
    username,
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

  const changePass = (e) => {
    setPassword(e.target.value);
  };

  const [confirm, setConfirm] = useState(password);

  const changeConfirm = (e) => {
    setConfirm(e.target.value);
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
      // password,
      confirm,
      title,
      group_id,
      role,
      email,
      facilitator,
      // phonenumber, linkedin are not required
    ].every((el) => el.length > 0);

    if (canSave) {
      try {
        dispatch(
          editMember({
            id,
            username,
            title,
            group_id,
            role,
            email,
            phonenumber,
            linkedin,
            facilitator,
          })
        );
        // dispatch(resetPass());
        toast.success("Member successfully updated");
        dispatch(getMembers(groupID));
        dispatch(getAll());
        navigate(`/${groupID}`);
      } catch (error) {
        const message =
          error.response.data.message || error.message || error.toString();
        toast.error(message);
        console.log(message);
      }
    } else {
      toast.error("Please Fill In All Fields", {
        position: toast.POSITION.TOP_LEFT,
      });
      console.log("id", id);
      console.log("username", username);
      console.log("password", password);
      console.log("title", title);
      console.log("group_id", group_id);
      console.log("role", role);
      console.log("email", email);
      console.log("facilitator", facilitator);
    }
  };

  const [hidden, setHidden] = useState(true);
  const onClick = (e) => {
    e.preventDefault();
    setHidden(!hidden);
  };
  const onCancel = () => {
    setHidden(true);
  };

  const submitPass = (e) => {
    e.preventDefault();

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

    try {
      dispatch(
        updatePass({
          id,
          password,
        })
      );
      dispatch(resetPass());
      toast.success("Password successfully updated");
      setHidden(true);
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();
      toast.error(message);
      console.log(message);
    }
  };

  const today = new Date().toString();

  const date = today.split(" ").splice(1, 3).join(", ");

  if (member === undefined) {
    return (
      <section>
        <h2>Member not found</h2>
      </section>
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <section className="schedule-form">
      <div className="heading">
        <h2>Edit {member.title}</h2>
      </div>

      <form className="form">
        {hidden ? (
          <>
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
            <div className="names">
              <div className="form-group">
                <label htmlFor="title">Full Name (with prefix if any) *</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter a Full Name (with prefix, if any)"
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
                placeholder="Enter a phone number"
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
                placeholder="Enter a LinkedIn Account"
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
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter a password"
                value={password}
                onChange={changePass}
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
                onChange={changeConfirm}
              />
            </div>
          </>
        )}
      </form>
      <div className="btn-group">
        <div className="flex-between">
          {role === "alumni" && (
            <button
              hidden={!hidden}
              className="btn btn-secondary btn-add"
              type="submit"
              onClick={() => GeneratePDF(memberData, date)}
            >
              Generate Certificate
            </button>
          )}

          <button
            hidden={!hidden}
            className="btn btn-secondary btn-add"
            onClick={onClick}
          >
            Update Password
          </button>
        </div>
        <button
          className="btn btn-secondary"
          hidden={hidden}
          onClick={submitPass}
        >
          Submit Password
        </button>

        <button className="btn btn-cancel" onClick={onCancel} hidden={hidden}>
          Cancel
        </button>

        <button
          className="btn btn-primary"
          type="submit"
          onClick={onSubmit}
          hidden={!hidden}
        >
          Submit Update
        </button>
        <button
          hidden={!hidden}
          className="btn btn-cancel"
          onClick={() => navigate(`/${groupID}`)}
        >
          Cancel
        </button>
      </div>
    </section>
  );
};
export default MemberEdit;
