import React, { useState } from 'react';

const UpdateNodeModal = ({ isOpen, onClose, onUpdate, initialLabel }) => {
  const [newLabel, setNewLabel] = useState(initialLabel);

  const handleUpdate = () => {
    onUpdate(newLabel);
    onClose();
  };

  return isOpen ? (
    <>
  <div className="absolute right-[-40vw] top-[-40vh] h-screen flex items-center justify-end p-4 z-50">
    <div className="bg-[#50577A] p-6 rounded-lg shadow-lg w-[400px]">
      <h2 className="text-xl font-bold mb-4 text-white">Update Node</h2>
      <input
        type="text"
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full text-[#404258]"
      />
      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="bg-[#474E68] hover:bg-[#6B728E] text-white px-4 py-2 rounded-md mr-2 transition duration-300"
        >
          Update
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</>

  ) : null;
};

export default UpdateNodeModal;

