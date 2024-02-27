// Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleCloseClick}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-5 rounded"
      >
        {children}
        <button
          onClick={(e) => {
            onClose();
          }}
          className="bg-rose-600 px-3 py-1 mt-8 text-white rounded-md hover:bg-rose-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
