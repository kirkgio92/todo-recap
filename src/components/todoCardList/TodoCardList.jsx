import TodoCard from "../todoCard/TodoCard";
import { useState, useEffect } from "react";

const TodoCardList = () => {
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodoData(data.data));
  }, []);

  return (
    <div>
      {todoData.map((todo, index) => {
        <TodoCard key={index} todoData={todo} />;
      })}
    </div>
  );
};

export default TodoCardList;
