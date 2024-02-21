import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import "react-toastify/dist/ReactToastify.css";
import CategoryList from "./pages/category/list/CategoryList";

type Input = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
};

const productInputs: Input[] = []; // Örnek veri yapısını tanımlayın

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="products" element={<></>}>
              <Route index element={""} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="news"
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
