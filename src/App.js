import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { path, pathAdmin } from "./ultis/path";
import {
  Home,
  Public,
  Table,
  Register,
  Login,
  Cart,
  About,
  Menu,
} from "./containers/public/user";
import {
  ListFood,
  AddFood,
  EditFood,
  PublicAdmin,
} from "./containers/public/admin";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./App.css";
import { useDispatch } from "react-redux";
import * as action from './store/actions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.getFood());
  }, []);

  return (
    <div>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ABOUT} element={<About />} />
          <Route path={path.TABLE} element={<Table />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.MENU} element={<Menu itemsPerPage={6} />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CART} element={<Cart />} />
          <Route path={path.START} element={<Home />} />
        </Route>
        <Route path={pathAdmin.PUBLIC} element={<PublicAdmin />}>
          <Route path={pathAdmin.LISTFOOD} element={<ListFood />} />
          <Route path={pathAdmin.ADDFOOD} element={<AddFood />} />
          <Route path={pathAdmin.EDITFOOD} element={<EditFood />} />
          <Route path={path.START} element={<ListFood />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
};

export default App;
