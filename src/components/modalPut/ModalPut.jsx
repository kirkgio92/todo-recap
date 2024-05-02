import styles from "./index.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

const ModalPut = ({ onClose }) => {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Work");
  const [title, setTitle] = useState("");
  const [todoData, setTodoData] = useState([]);
  const router = useRouter();

  const todoId = getCookie("TodoID");

  useEffect(() => {
    fetch(`/api/todos/${todoId}`)
      .then((res) => res.json())
      .then((data) => {
        setTodoData(data.data);
        setTitle(data.data.todo_title);
        setContent(data.data.todo_content);
        setDate(new Date(data.data.todo_date));
        setTime(new Date(data.data.todo_time));
        setCategory(data.data.categories);
      });
  }, []);

  const categories = ["Work", "Personal", "Home"];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const updatedTodoData = {
      todo_title: title,
      todo_content: content,
      todo_date: date,
      todo_time: time,
      categories: category,
    };

    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodoData),
      });
      if (!response.ok) {
        throw new Error("Network Response was not ok!");
      }
      onClose();
      router.reload("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <form onSubmit={handleOnSubmit}>
            <button onClick={onClose} className={styles.closeBtn}>
              Go Back
            </button>
            <input
              value={title}
              type="text"
              placeholder="Give a title to your task"
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
            <input type="submit" value="Edit Task!" className={styles.button} />
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalPut;
