import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMembers, resetPass } from "../features/members/memberSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import MemberItem from "../components/MemberItem";
import { logout } from "../features/auth/authSlice";
import GeneratePDF from "../components/generatePDF";

const DashboardForAlumniGroup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { membersArr, pass, isLoading, isError, message } = useSelector(
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
    if (membersArr.length === 0) {
      dispatch(getMembers(groupID));
    }
  }, [user, navigate, dispatch, isError, message, membersArr]);

  useEffect(() => {
    dispatch(getMembers(groupID));
  }, []);

  let members = membersArr.filter(
    (member) => member.group_id === groupID && member.role === "alumni"
  );

  const today = new Date().toString();

  // FIX THIS TO HAVE A COMMA BEFORE THE YEAR
  const date = today.split(" ").splice(1, 3).join(" ");
  const onClick = () => {
    members.forEach((member) => {
      GeneratePDF(member, date);
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      {user ? (
        <>
          <section className="heading">
            <h2>Certificate Generator</h2>
            <button className="btn btn-primary btn-add" onClick={onClick}>
              Generate Certificates for Entire Group
            </button>
          </section>
          <section className="content alumni-group">
            {members.length > 0 ? (
              <div className="flex-col">
                <div className="members">
                  {members.map((member, index) => (
                    <MemberItem key={index} member={member} />
                  ))}
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
export default DashboardForAlumniGroup;
