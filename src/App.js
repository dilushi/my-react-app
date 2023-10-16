//import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';
import { AppConfig } from './configs/AppConfig';
import axios from 'axios';
import TodoInput from "./components/todo/TodoInput";
import TodoItem from "./components/todo/TodoItem";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todos, setTodos] = useState([]);
  //const [todo, setTodo] = useState("");
  const [showAlert, toggleAlert] = useState(false);

  // Get sample data via remote test API
  useEffect(() => {
    axios({
      "method": "GET",
      "url": AppConfig.externalApiBaseUrl + '/v2/item?offset=20&limit=5'
    })
      .then((response) => {
        let items = [];
        response.data.results.map((item) => {
          return items.push({ todo: item.name, complete: false });
        });

        setTodos(items);

        toggleAlert(true);
        toast.success('Sample data successfully retrieved via remote API.');
      })
      .catch((error) => {
        toast.error(error);
      })
  }, []);
  //}, [setTodos, todos])

  // Create todo
  const createTodoItem = (todo) => {
    let newTodo = todos.find(t => t.todo === todo);
    if (!newTodo) {
      const newTodoItems = [...todos, { todo, complete: false }];
      setTodos(newTodoItems);
      toggleAlert(true);
      toast.success('Todo item successfully created.');
    }
    else {
      toggleAlert(true);
      toast.error('Todo alrady exists.');
    }
  };

  // Delete todo
  const deleteTodoItem = (index) => {
    const newTodoItems = [...todos];
    newTodoItems.splice(index, 1);

    setTodos(newTodoItems);
    toggleAlert(true);
    toast.success('Todo item successfully deleted.');
  }

  // Complete/undo complete todo
  const completeTodoItem = (index) => {
    const newTodoItems = [...todos];

    const previousStatus = newTodoItems[index].complete;

    newTodoItems[index].complete === false
      ? (newTodoItems[index].complete = true)
      : (newTodoItems[index].complete = false);
    setTodos(newTodoItems);

    toggleAlert(true);

    toast.success(!previousStatus ? 'Todo item marked as Completed.'
      : 'Todo item status changed back to Not Completed.');
  };

  // Edit/update todo
  const updateTodoItem = (index) => {
    const newTodoItems = [...todos];
    const item = newTodoItems[index];

    let newItem = prompt(`Update ${item.todo}?`, item.todo);
    let todoObj = { todo: newItem, complete: false };
    newTodoItems.splice(index, 1, todoObj);

    if (newItem === null || newItem === "") {
      return;
    } else {
      item.todo = newItem;
    }
    //setTodo(newTodoItems);//no need???
    setTodos(newTodoItems);
    toggleAlert(true);
    toast.success('Todo item successfully updated.');
  };

  return (
    <div className="App">
      {/* <header className="App-header"> */}

      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

      {/* </header> */}

      {/* <div>
        {todos && todos.map((item, index) => (
          <div key={index}>{item.todo}</div>
        ))}
      </div> */}

      <h1>Todo App</h1>

      <TodoInput createTodoItem={createTodoItem} />

      {todos && todos.map((item, index) => (
        <TodoItem key={index} index={index} item={item}
          todos={todos}
          deleteTodoItem={deleteTodoItem}
          completeTodoItem={completeTodoItem}
          updateTodoItem={updateTodoItem} />
      ))}

      {showAlert &&
        <ToastContainer
          position="bottom-right"
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

    </div>
  );
}

export default App;
