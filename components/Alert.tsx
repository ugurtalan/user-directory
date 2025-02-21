import Modal from "./Modal"
type AlertProps = {
    isOpen : boolean,
    onClose : ()=>void,
    title : string,
    alert : string,
};

const Alert = ({ isOpen, onClose, title, alert }: AlertProps) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-4">
          <h2 className="text-lg">{title}</h2>
          <p>{alert}</p>
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