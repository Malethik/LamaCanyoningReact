import { Modal } from "flowbite-react";

import CreateItem from "../components/CreateItem";

interface CreateItemModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateItemModal: React.FC<CreateItemModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const onCloseModal = () => {
    setOpenModal(false); 
  };

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create New Item
            </h3>
            <CreateItem /> 
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateItemModal;
