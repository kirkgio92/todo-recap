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
    <div>
      {todoData.map((todo, index) => (
        <TodoCard key={index} todoData={todo} />
      ))}
    </div>
  );
};

export default TodoCardList;
