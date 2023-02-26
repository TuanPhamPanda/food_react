import React from 'react'
import path from "./ultis/path";
import {Home, Public, Table, Register, Menu, Login, Cart, About} from './containers/public';
import { Route, Routes } from 'react-router-dom';
//<Route path={path.PROMOTION} element={<Promotion/>}/>

const App = () => {
    return (
      <div>
        <Routes>
          <Route path={path.PUBLIC} element={<Public/>} >
            <Route path={path.HOME} element={<Home/>}/>
            <Route path={path.ABOUT} element={<About/>}/>
            <Route path={path.TABLE} element={<Table/>}/>
            <Route path={path.REGISTER} element={<Register/>}/>
            <Route path={path.MENU} element={<Menu/>}/>
            <Route path={path.LOGIN} element={<Login/>}/>
            <Route path={path.CART} element={<Cart/>}/>
            <Route path={path.START} element={<Home/>}/>
          </Route>  
        </Routes>  
      </div>
      )
}

export default App
