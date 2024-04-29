import Modal from "../modal";
import styles from "./index.module.scss";
import { useState } from "react";

const AddTodo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={styles.button} onClick={handleModalOpen}>
        Add todo
      </button>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </>
  );
};

export default AddTodo;
