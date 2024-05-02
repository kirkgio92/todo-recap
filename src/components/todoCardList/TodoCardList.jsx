import TodoCard from "../todoCard/TodoCard";
import styles from "./index.module.scss";

import { useState, useEffect } from "react";

const TodoCardList = () => {
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodoData(data.data));
  }, []);

  console.log(todoData);

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.inProgress}>
          <h2>List of in progress task</h2>
          {todoData
            .slice()
            .reverse()
            .filter((todo) => todo.isInProgress)
            .map((todo, index) => (
              <TodoCard key={index} todoData={todo} />
            ))}
        </div>
        <div className={styles.notInProgress}>
          <h2>List of NOT in progress task</h2>
          {todoData
            .slice()
            .reverse()
            .filter((todo) => todo.isInProgress === false)
            .map((todo, index) => (
              <TodoCard key={index} todoData={todo} />
            ))}
        </div>
      </div>
    </>
  );
};

export default TodoCardList;
