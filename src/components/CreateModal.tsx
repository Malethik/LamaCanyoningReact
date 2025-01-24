import { Modal } from "flowbite-react";

import CreateItem from "./CreateItem";
import CreateSupplier from "./CreateSupplier";
import CreateOrder from "./CreateOrder";

interface CreateModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  contentType: "item" | "supplier" | "order";
  onClose?: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({
  openModal,
  setOpenModal,
  contentType,
  onClose,
}) => {
  const onCloseModal = () => {
    setOpenModal(false);
    if (onClose) {
      onClose(); // Chiamata alla funzione passata come prop
    }
  };

  const renderContent = () => {
    switch (contentType) {
      case "item":
        return <CreateItem />;
      case "supplier":
        return <CreateSupplier />;
      case "order":
        return <CreateOrder />;
      default:
        return <div>Contenuto non disponibile</div>;
    }
  };
  const getTitle = () => {
    switch (contentType) {
      case "item":
        return "Crea Nuovo Articolo";
      case "supplier":
        return "Crea Nuovo Fornitore";
      case "order":
        return "Crea Nuovo Ordine";
      default:
        return "Contenuto non disponibile";
    }
  };

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {getTitle()}
            </h3>
            {renderContent()}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateModal;
