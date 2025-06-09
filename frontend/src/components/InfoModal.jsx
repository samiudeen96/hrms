import { useInfoModal } from "../hooks/infoModalHook";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/authSlice";

const InfoModel = () => {
  const dispatch = useDispatch();
  const { isModalOpen, modalContent, hideModal } = useInfoModal();

  if (!isModalOpen) return null;

  const handleConfirm = () => {
    // Determine action based on `actionType`
    switch (modalContent.actionType) {
      case "logout":
        dispatch(logout());
        break;
      // Add more cases if needed
      default:
        break;
    }

    hideModal();
  };

  return (
    <div className="fixed inset-0 bg-[#00000047] bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-sm shadow-sm m-3 p-5">
        <div>
          <p>{modalContent.text1}</p>
          <div className="flex justify-center items-center gap-5 mt-5">
            <button className="button_secondary" onClick={hideModal}>
              Cancel
            </button>
            <button
              className={`button_tertiary ${modalContent.color}`}
              onClick={handleConfirm}
            >
              {modalContent.buttonName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModel;
