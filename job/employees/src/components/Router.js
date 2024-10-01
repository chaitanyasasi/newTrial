import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Header from './Header';
import Footer from "./Footer";
import SignUp from "./LogIn/Register";
import SignIn from "./LogIn/SignIn";
import Welcome from "./Home/wish";
import Home from './Home/Home';
import List from "./Employ/List"

const RouterOne = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Main />} >
                        <Route index element={<Welcome />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<SignIn />} />
                        <Route path="/home" element={<Home />} />
                        <Route path='/list' element={<List/>} />




                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </>


    )
}
export default RouterOne;