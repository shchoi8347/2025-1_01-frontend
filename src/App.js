import "./App.css";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import { List, Container, Paper } from "@mui/material";
import AddTodo from "./AddTodo";
import { API_BASE_URL } from "./app-config";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(API_BASE_URL + "/todo", requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          setItems(response.data); // 상태가 변경 => 재렌더링 발생 => App() 다시 실행 : 무한루프
        },
        (error) => {}
      );
  }, []);

  const addItem = (item) => {
    item.id = "ID-" + items.length;
    item.done = false;
    setItems([...items, item]);
    console.log("items: ", items);
  };

  const deleteItem = (item) => {
    const newItems = items.filter((e) => e.id !== item.id);
    setItems([...newItems]); // items 상태가 변경됨 => App 컴포넌트가 리렌더링됨
  };

  const editItem = () => {
    setItems([...items]); // 갱신된 items 배열로 상태를 업데이트함 => 리렌더링 일어남
  };

  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo
            deleteItem={deleteItem}
            editItem={editItem}
            item={item}
            key={item.id}
          />
        ))}
      </List>
    </Paper>
  );
  return (
    <div className="App">
      <Container maxwidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );
}

export default App;
