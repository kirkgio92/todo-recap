import TodoCard from "../todoCard/TodoCard";
import styles from "./index.module.scss";
import { format } from "date-fns";

import { useState, useEffect } from "react";

const TodoCardList = ({ data }) => {
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodoData(data.data));
  }, []);

  const selectedDate = format(new Date(data), "yyyy-MM-dd");

  console.log(data);

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.inProgress}>
          <h2 className={styles.listTitle}>In progress task</h2>
          {data === null
            ? todoData
                .slice()
                .reverse()
                .filter((todo) => todo.isInProgress)
                .map((todo, index) => <TodoCard key={index} todoData={todo} />)
            : todoData
                .slice()
                .reverse()
                .filter((todo) => todo.isInProgress)
                .filter(
                  (todo) =>
                    format(new Date(todo.todo_date), "yyyy-MM-dd") ===
                    selectedDate
                )
                .map((todo, index) => <TodoCard key={index} todoData={todo} />)}
        </div>
      </div>
    </>
  );
};

export default TodoCardList;
