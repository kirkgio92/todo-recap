import styles from "./index.module.scss";
import Image from "next/image";

const TodoCard = ({ todoData }) => {
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

  return (
    <>
      <div className={styles.wrapper}>
        <h4>{todoData.todo_title}</h4>
        <p>{todoData.todo_content}</p>
        <div>
          <p>{formatTime(todoData.todo_time)}</p>
          <p>{formatDate(todoData.todo_date)}</p>
        </div>
        <p>{todoData.categories}</p>
      </div>
    </>
  );
};

export default TodoCard;
