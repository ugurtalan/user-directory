import Modal from "./Modal"
type AlertProps = {
    isOpen : boolean,
    onClose : ()=>void,
};

const Alert = ({ isOpen, onClose }: AlertProps) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-4">
          <h2 className="text-lg">Uyarı Mesajı</h2>
          <p>Grup ismi boş bırakılamaz.</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Kapat
            </button>
          </div>
        </div>
      </Modal>
    );
  };
  
  export default Alert;