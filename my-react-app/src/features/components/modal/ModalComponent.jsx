 
import { useState } from "react";
import Modal from "./Modal";

const ModalComponent = () => {

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <h1>Reusable Modal Example</h1>

            <button onClick={openModal}>
                Open Modal
            </button>

            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                title="User Information"
            >
                <p>Welcome to the reusable modal component!</p>
                <p>You can pass any content here.</p>
            </Modal>

        </div>
    );
};

export default ModalComponent;
