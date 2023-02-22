import { useNavigate } from "react-router-dom";

const GroupItem = ({ group, alumni, color }) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (alumni) {
      navigate(`/alumni-groups/${group}`);
    } else {
      navigate(`/${group}`);
    }
  };

  const groupClass = "calendar-body test-item";
  return (
    <div>
      <div className={groupClass + " " + color} onClick={onClick}>
        <div className="calendar-snippet">
          <h2>Group: {group}</h2>
        </div>
      </div>
    </div>
  );
};
export default GroupItem;
