import { Route, Routes } from "react-router-dom";
import Calendar from "./page/Calendar";
import TodoList from "./page/TodoList";
import Header from "./common/Header";

function App() {
  return(<>
    <Header />
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  </>;)
  
}

export default App;
