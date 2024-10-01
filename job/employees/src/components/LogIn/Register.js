import React,{useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';

// const url = process.env.REACT_APP_LOGIN_API_URL

const Regsiter = () => {

    let navigate = useNavigate();

    const initialValues = {
        name:"enter name",
        email:"enter mail",
        password:"enter passkey",
        userName:"username"
    }

    const [values,setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setValues({
            ...values,
            [name]:value
        })
    }

    const checkout = () => {
        console.log(values)
        fetch(`http://localhost:6105/register`,{
            method: 'POST',
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values)
        })
        .then(navigate('/login'))
    }



    return(
        <>
            <div className="container">
                <hr/>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h3>Regsiter</h3>
                    </div>
                    <div className='panel-body'>
                        <div className='row'>
                            <div className='col-md-6 form-group'>
                                <label for="fname" className='control-label'>Name</label>
                                <input className='form-control' type="text" id="fname"
                                name="name" value={values.name} onChange={handleInputChange}/>
                            </div>
                            <div className='col-md-6 form-group'>
                                <label for="email" className='control-label'>Email</label>
                                <input className='form-control' id="email" type="email"
                                name="email" value={values.email} onChange={handleInputChange}/>
                            </div>
                            <div className='col-md-6 form-group'>
                                <label for="password" className='control-label'>Password</label>
                                <input className='form-control' id="password"
                                name="password" type="password" value={values.password} onChange={handleInputChange}/>
                            </div>
                            <div className='col-md-6 form-group'>
                                <label for="phone" className='control-label'>userName</label>
                                <input className='form-control' id="phone"
                                name="userName" value={values.userName} onChange={handleInputChange}/>
                            </div>
                            
                        </div>
                        <button className='btn btn-success' onClick={checkout}>
                                Register
                        </button>

                        <p>Already existing user ? <Link to="/login">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </>
       
    )
}

export default Regsiter