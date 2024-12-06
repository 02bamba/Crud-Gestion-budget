import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import ListTransaction from "./List";
import CreateTransaction from "./Create";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateTransaction />}>
          <Route index  element={<ListTransaction />} />
          <Route path="create"  element={<CreateTransaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
