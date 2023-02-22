import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMember } from "../features/members/memberSlice";
import { deleteGroup, getAllGroups } from "../features/groups/groupSlice";

const Confirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, groupID } = useParams();

  // const receipt = useSelector((state) => {
  //   return state.receipts.receiptsArr.filter((receipt) => receipt._id === id);
  // });

  const onCancel = () => {
    navigate(`/${groupID}`);
  };
  const onDelete = () => {
    if (id) {
      dispatch(deleteMember(id));
      dispatch(getAllGroups());
      navigate(`/`);
    } else {
      dispatch(deleteGroup(groupID));
      dispatch(getAllGroups());
      navigate(`/`);
    }
  };

  return (
    <main className="confirm">
      {id ? (
        <h1>Are you sure you want to delete?</h1>
      ) : (
        <h1>Are you sure you want to delete {groupID}?</h1>
      )}
      <section className="actions">
        <button className="btn btn-block btn-danger" onClick={onDelete}>
          Delete
        </button>
        <button className="btn btn-block btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </section>
    </main>
  );
};
export default Confirm;
