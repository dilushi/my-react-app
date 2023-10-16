import React from "react";
import TodoItem from "./TodoItem";

//const TodoList = ({ list, remove }) => {
const TodoList = ({ list, deleteTodoItem, updateTodoItem, completeTodoItem }) => {
    return (
        <>
            {list?.length > 0 ? (
                <ul className="todo-list">
                    {list.map((entry, index) => (
                        <div className="todo parent" key={index}>

                            {/* <li key={index}> {entry} </li>
                            <button
                                className="delete-button"
                                onClick={() => { remove(entry); }}>Delete
                            </button> */}

                            <TodoItem key={index} index={index} item={item} //setEdit={setEdit}
                                deleteTodoItem={deleteTodoItem}
                                completeTodoItem={completeTodoItem}
                                updateTodoItem={updateTodoItem} />
                        </div>
                    ))}
                </ul>
            ) : (
                <div className="empty">
                    <p>No task found</p>
                </div>
            )}
        </>
    );
};

export default TodoList;
