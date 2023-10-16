const TodoItem = ({ item, index, deleteTodoItem, completeTodoItem,
  updateTodoItem
}) => {

  return <div>
    <div className="parent">
      <div className="child">
        <li style={{ textDecoration: item.complete ? "line-through" : "" }}>{item.todo}</li>
      </div>

      <div className="child">
        <button onClick={() => updateTodoItem(index)}>Edit</button>
        <button onClick={() => completeTodoItem(index)}>Complete</button>
        <button onClick={() => deleteTodoItem(index)}>Delete</button>
      </div>
    </div>
  </div>
};

export default TodoItem