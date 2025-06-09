import { useDispatch, useSelector } from "react-redux";
import { modalOpen, modalClose } from "../redux/reducers/infoModalSlice.js";

export const useInfoModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.infoModal);

  const showModal = (content) => {
    dispatch(
      modalOpen({
        text1: content.text1 || content.text,
        text2: content.text2,
        buttonName: content.buttonName,
        color: content.color || "bg-primary",
        actionType: content.actionType, // Use actionType only
        // ❌ Don't pass onConfirm
      })
    );
  };

  const hideModal = () => {
    dispatch(modalClose());
  };

  return {
    isModalOpen: modalState.isModalOpen,
    modalContent: modalState.infoContent,
    showModal,
    hideModal,
  };
};

