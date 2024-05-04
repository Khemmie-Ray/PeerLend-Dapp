import React, { useState } from 'react';
import Modal from './Modal';

const CustomFormModal = ({ isOpen, onClose, onSubmit, fields }) => {
  const initialFormState = {};
  fields.forEach((field) => {
    initialFormState[field.name] = '';
  });

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormState);
    onClose();
  };

  const handleClose = () => {
    setFormData(initialFormState);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit}>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            className="rounded-lg w-[100%] p-4 bg-[#ffffff23] backdrop-blur-lg mb-4"
          />
        ))}
        <div className="flex flex-col lg:flex-row md:flex-row">
          <button
            type="button"
            className="text-white border border-purple py-4 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] lg:mr-2 md:mr-2 mr-0 lg:w-1/2"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-purple py-4 px-4 rounded-lg lg:text-[20px] md:text-[20px] text-[16px] lg:w-1/2"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Modal;
