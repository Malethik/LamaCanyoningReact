import { Modal } from "flowbite-react";

import CreateItem from "../components/CreateItem";
import CreateSupplier from "./CreateSupplier";

interface CreateItemModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  contentType: "item" | "supplier";
}

const CreateModal: React.FC<CreateItemModalProps> = ({
  openModal,
  setOpenModal,
  contentType,
}) => {
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const renderContent = () => {
    switch (contentType) {
      case "item":
        return <CreateItem />;
      case "supplier":
        return <CreateSupplier />;
      default:
        return <div>Contenuto non disponibile</div>;
    }
  };

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {contentType === "item"
                ? "Crea Nuovo Articolo"
                : "Crea Nuovo Fornitore"}
            </h3>
            {renderContent()}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateModal;
