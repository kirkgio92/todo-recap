import styles from "./index.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const Modal = ({ onClose }) => {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const categories = ["Work", "Personal", "Home"];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const todoData = {
      todo_title: title,
      todo_content: content,
      todo_date: date,
      todo_time: time,
      categories: category,
      isInProgress: true,
    };

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });
      if (!response.ok) {
        throw new Error("Network Response was not ok!");
      }
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <form onSubmit={handleOnSubmit}>
          <input
            value={title}
            type="text"
            placeholder="Task title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows="4"
            className={styles.content}
            value={content}
            type="text"
            placeholder="Describe the task here..."
            onChange={(e) => setContent(e.target.value)}
          />
          <DatePicker
            selected={time}
            onChange={(time) => setTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
          <select onChange={(e) => setCategory(e.target.value)}>
            {categories.map((category, index) => (
              <option name="categories" key={index} value={category}>
                {category}
              </option>
            ))}
            ;
          </select>
          <input type="submit" value="Create Task!" className={styles.button} />
        </form>
      </div>
    </>
  );
};

export default Modal;
