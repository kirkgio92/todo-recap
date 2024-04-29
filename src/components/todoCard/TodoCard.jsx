import styles from "./index.module.scss";

const TodoCard = ({ todoData }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <h3>{todoData.todo_title}</h3>
        <p>{todoData.todo_content}</p>
        <div>
          <p>{todoData.todo_time}</p>
          <p>{todoData.todo_date}</p>
        </div>
        <p>{todoData.categories}</p>
      </div>
    </>
  );
};

export default TodoCard;
