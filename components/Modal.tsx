import React from "react";

type ModalProps = {
    isOpen : boolean,
    onClose : ()=>void,
    children : React.ReactNode,
};


const Modal = ({ isOpen, onClose, children } : ModalProps) => {
  if (!isOpen) return null; // Eğer modal açık değilse hiçbir şey gösterme.

  return (
    <div className="fixed inset-0 bg-slate-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
        <button className=" absolute top-2 right-2 text-red-600 font-bold" onClick={onClose}>
          X
        </button>
        {children} {/* İçeriği buraya yerleştireceğiz */}
      </div>
    </div>
  );
}

export default Modal;