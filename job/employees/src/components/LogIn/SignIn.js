import React, { useState } from 'react';
import { useNavigate,  Link} from 'react-router-dom';
import axios from 'axios';

// const url = process.env.REACT_APP_LOGIN_API_URL

const Login = () => {

    let navigate = useNavigate();
    const [message,setMessage] = useState('')

    // const initialValues = {
    //     userName: 'enter username',
    //     password: "enter passkey"
    // }

    const [values, setValues] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

   
    const checkout = () => {
        console.log(values)
        fetch(`http://localhost:6105/LogIn`,{
            method: 'POST',
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values)
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.auth === false){
                setMessage(data.token)
                console.log(message)
                window.location.reload();
            }else{
                sessionStorage.setItem('ltk',data.token)
                navigate('/home')
                window.location.reload();
            }
        })
    }

    return (

        <>
            <div className="container">
                <hr />
                <div className="panel panel-danger">
                    <div className="panel-heading">
                        <h3>Login</h3>
                    </div>
                    <div className='panel-body'>
                        <div className='row'>
                            <h2 style={{ color: 'red' }}>{message}</h2>
                            <div className='col-md-6 form-group'>
                                <label for="userName" className='control-label'>userName</label>
                                <input className='form-control' type="text" id="userName"
                                    name="userName"  onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6 form-group'>
                                <label for="password" className='control-label'>Password</label>
                                <input className='form-control' type="password" id="password"
                                    name="password"  onChange={handleInputChange} />
                            </div>


                        </div>
                        <button className='btn btn-warning' onClick={checkout}>
                            Login
                        </button>
                        <p>Don't have an account? <Link to="/signup">SignUp</Link></p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login