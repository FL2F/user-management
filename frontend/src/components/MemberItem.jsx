import { useNavigate } from "react-router-dom";

const MemberItem = ({ member }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/${member.group_id}/member-profile/${member.id}`);
  };

  const onDelete = () => {
    navigate(`/${member.group_id}/confirm/${member.id}`);
  };

  return (
    <div>
      <div className="calendar-body">
        <div className="item-text" onClick={onClick}>
          <h2>Edit: {member.title || member.username}</h2>
        </div>
        <div className="delete">
          <div>
            <button onClick={onDelete} className="btn btn-delete">
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemberItem;
