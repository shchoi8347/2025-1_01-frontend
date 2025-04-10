import './App.css';
import Todo from './Todo';
import React, {useState} from "react";
import {List, Container, Paper} from "@mui/material";
import AddTodo from './AddTodo'

function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    item.id = "ID-" + items.length;
    item.done = false;
    setItems([...items, item]);
    console.log("items: ", items);
  }

  const deleteItem = (item) => {
    const newItems = items.filter(e => e.id !== item.id);
    setItems([...newItems]); // items 상태가 변경됨 => App 컴포넌트가 리렌더링됨
  }

  const editItem = () => {
    setItems([...items]); // 갱신된 items 배열로 상태를 업데이트함 => 리렌더링 일어남
  }

  let todoItems = items.length > 0 && 
  <Paper style={{margin:16}}>
    <List>
      {items.map((item) => (
        <Todo deleteItem={deleteItem} editItem={editItem} item={item} key={item.id} />    
      ))};
    </List>
  </Paper>
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
