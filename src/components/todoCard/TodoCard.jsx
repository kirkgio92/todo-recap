import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import ModalPut from "../modalPut";
import { setCookie } from "cookies-next";

const TodoCard = ({ todoData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const getCategoryColor = (category) => {
    switch (category) {
      case "Work":
        return "#c2c094";
      case "Personal":
        return "#388697";
      case "Home":
        return "#b5ffe1";
    }
  };

  const formatTime = (timeString) => {
    const dateObj = new Date(timeString);
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    return `${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""}${minute}`;
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleCompleteTask = async () => {
    const dataToComplete = {
      isInProgress: false,
    };
    try {
      const response = await fetch(`/api/todos/${todoData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToComplete),
      });
      if (!response.ok) {
        throw new Error("Network Response was not ok!");
      }
      router.reload("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`/api/todos/${todoData._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network Response was not ok!");
      }
      router.reload("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setCookie("TodoID", todoData._id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCookie("TodoID", "");
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h4>{todoData.todo_title}</h4>
        <p>{todoData.todo_content}</p>
        <div>
          <p>{formatTime(todoData.todo_time)}</p>
          <p>{formatDate(todoData.todo_date)}</p>
        </div>
        <p>
          <span
            className={styles.categoryLabel}
            style={{ backgroundColor: getCategoryColor(todoData.categories) }}
          />
          {todoData.categories}
        </p>
        <p>Todo ID: {todoData._id}</p>
        <div className={styles.btnsWrapper}>
          <button onClick={handleCompleteTask}>Done!</button>
          <button onClick={handleDeleteTask}>Delete</button>
          <button onClick={handleModalOpen}>Edit Task!</button>
          {isModalOpen && <ModalPut onClose={handleCloseModal} />}
        </div>
      </div>
    </>
  );
};

export default TodoCard;
