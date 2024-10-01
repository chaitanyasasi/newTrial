import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css'

const HeaderOne = () => {

    const [userData, setUserData] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('ltk') != null) {
            fetch(`http://localhost:6105/userinfo`, {
                method: 'GET',
                headers: {
                    'x-access-token': sessionStorage.getItem('ltk')
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setUserData(data)
                    console.log(data);
                })
        }
    }, [])

    const handleLogout = () => {
        sessionStorage.removeItem('ltk');
        sessionStorage.removeItem('userInfo');
        setUserData('');
        navigate('/')
    }



    const conditionalHeader = () => {
        if (userData) {
            if (userData.name) {
                sessionStorage.setItem('userInfo', JSON.stringify(userData))
                return (
                    <>
                         <a href='/home'><button className="btn btn-primary me-3">go to home</button></a>
                        <button className="username">Hi {userData.name}</button>
                        &nbsp;
                        <button onClick={handleLogout} className='logout'>
                            Logout
                        </button>
                    </>
                )
            }
        } else {
            return (
                <>
                    <div>
                        <Link to={"/login"}>
                            <button className="logBut">LogIn</button></Link>
                        <Link to={"/signup"}>
                            <button className="signBut">SignUp</button></Link>

                    </div>
                </>
            )
        }
    }

    return (
        <>
            <header className='head'>
                <section className='d-flex justify-content-between'>
                    <Link to='/'>
                        <div >
                            <img src="https://is2-ssl.mzstatic.com/image/thumb/Purple114/v4/b5/60/9b/b5609b14-e928-3f4d-0a34-6ead78a0ada4/source/512x512bb.jpg" alt="logo" className="logo" />
                        </div>
                    </Link>

                    {/* <div>
                        <Link to={"/login"}>
                        <button className="logBut">LogIn</button></Link>
                        <Link to={"/signup"}>
                        <button className="signBut">SignUp</button></Link>
    
                    </div> */}
                    <div>
                        {conditionalHeader()}
                    </div>

                </section>
            </header>


        </>
    )
}
export default HeaderOne;