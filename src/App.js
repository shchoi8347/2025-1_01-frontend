import "./App.css";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import { List, Container, Paper } from "@mui/material";
import AddTodo from "./AddTodo";
import { API_BASE_URL } from "./app-config";
import { call } from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
      call("/todo", "GET", null)
        .then((response) => setItems(response.data));
    } , []);

  const addItem = (item) => {
      // 백엔드에 item 추가
      call("/todo", "POST", item)
        .then((response) => setItems(response.data)); // 상태 변수에 반영 => 리렌더링
  };

  const deleteItem = (item) => {
      // 백엔드에 item 삭제 요청
      call("/todo", "DELETE", item)
        .then((response) => setItems(response.data)); 
  };

  const editItem = (item) => {
    // setItems([...items]); // 갱신된 items 배열로 상태를 업데이트함 => 리렌더링 일어남
    // 백엔드에 item 수정 요청
    call("/todo", "PUT", item)
      .then((response) => setItems(response.data)); 
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
