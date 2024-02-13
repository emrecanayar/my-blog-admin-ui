import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { DarkModeContext } from "./context/darkModeContext";
import "react-toastify/dist/ReactToastify.css";
import CategoryList from "./pages/category/CategoryList";

type Input = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
};

const userInputs: Input[] = []; // Örnek veri yapısını tanımlayın
const productInputs: Input[] = []; // Örnek veri yapısını tanımlayın

function App() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error(
      "useContext(DarkModeContext) must be inside a DarkModeProvider with a value"
    );
  }

  const { state } = context;
  const { darkMode } = state;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products" element={<></>}>
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
