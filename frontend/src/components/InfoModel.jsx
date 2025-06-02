import { useInfoModal } from "../hooks/infoModalHook";

const InfoModel = () => {
    const { isModalOpen, modalContent, hideModal } = useInfoModal();

    if (!isModalOpen) return null;

    const handleConfirm = () => {
        if (modalContent.onConfirm) {
            modalContent.onConfirm(); // Execute the stored callback
        }
        hideModal();
    };

    return (
        <div className="fixed inset-0 bg-[#00000047] bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-sm shadow-sm m-3 p-5">
                <div>
                    <p>{modalContent.text1}</p>
                    <div className='flex justify-center items-center gap-5 mt-5'>
                        <button className='button_secondary' onClick={hideModal}>
                            Cancel
                        </button>
                        <button
                            className={`button_tertiary ${modalContent.color}`}
                            onClick={handleConfirm} // Use the new handler
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