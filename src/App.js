import "./App.css";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import { List, Container, Paper, Grid, Button, AppBar, Toolbar, Typography } from "@mui/material";
import AddTodo from "./AddTodo";

import { call, signout } from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      call("/todo", "GET", null).then((response) => {
        setItems(response.data);
        setLoading(false);
      });
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

  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )

  let todoListPage = (
    <div >
      {navigationBar}
      <Container maxwidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );
  
  let loadingPage = <h1>로딩중...</h1>;

  let content = loadingPage;

  if(!loading) {
    content = todoListPage;
  }

  return <div className="App">{content}</div>
}

export default App;
