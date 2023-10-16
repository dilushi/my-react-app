import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoInput = ({ createTodoItem }) => {
    const [value, setValue] = React.useState("");
    const [showAlert, toggleAlert] = React.useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        if (value === "") {
            toggleAlert(true);
            toast.error('Please enter a name for the todo item.');
            toggleAlert(false);
            return;
        }
        createTodoItem(value);
        setValue("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input data-testid="todo-input"
                type="text"
                placeholder="Please enter a todo item"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={handleSubmit} data-testid="create-button">Create</button>

            {showAlert &&
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="colored" />
            }
        </form>
    )
}

export default TodoInput