import React from 'react';
import axios from "axios";
import Modal from 'react-modal';


import "./List.css"

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    content: {
        top: '50%',
        width: '60%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class EmployeeTable extends React.Component {
    constructor() {
        super();
        this.state = {
            employees: [],
            employModel: false,
            checkModel: false,
            removeModal:false,
            fullName: '',
            email: '',
            mobile: '',
            designation: '',
            gender: '',
            course: [],
            avatar: null,
            isSubmitted: '',
            errorMessage: '',
            mailPara: '',
            verifyMail: '',
            verifyName: '',
            namePara: ''
        };
    }

    componentDidMount() {
        axios({
            url: 'http://localhost:6105/allEmployees',
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            this.setState({ employees: res.data.list })
        }).catch(err => {
            console.log(err)
        })
    }


    handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            let updatedCourses = [...this.state.course];
            if (checked) {
                updatedCourses.push(value);
            } else {
                updatedCourses = updatedCourses.filter(course => course !== value);
            }
            this.setState({ course: updatedCourses });
        } else if (type === 'file') {
            this.setState({ avatar: event.target.files[0] });
        } else {
            this.setState({ [name]: value });
        }
    }

    checkMail = () => {
        const { mailPara } = this.state
        const { verifyMail } = this.state
        const { errorMessage } = this.state


        if (mailPara === verifyMail) {
            this.handleModal('employModel', true);
        } else {
            this.setState({
                errorMessage: "email not found"
            })

        }
    }

    EmployDetail = (e) => {
        const { mailPara } = this.state
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullName', this.state.fullName);
        formData.append('email', this.state.email);
        formData.append('mobile', this.state.mobile);
        formData.append('designation', this.state.designation);
        formData.append('gender', this.state.gender);
        formData.append('course', this.state.course.join(", "));
        formData.append('avatar', this.state.avatar);

        axios.put(`http://localhost:6105/updateEmployee/${mailPara}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                this.setState({
                    isSubmitted: "Successfully submitted!",
                    errorMessage: ''
                });
                console.log('Success:', response.data);
            })
            .catch(error => {
                this.setState({
                    errorMessage: 'Failed to submit the form. Please try again.'
                });
                console.error('Error:', error);
            });
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    checkName = () => {
        const { namePara } = this.state
        const { verifyName } = this.state
        const { errorMessage } = this.state


        if (namePara === verifyName) {

            axios.delete(`http://localhost:6105/remove/${namePara}`, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    this.setState({
                        isSubmitted: "Successfully deleted!",
                        errorMessage: ''
                    });
                    console.log('Success:', response.data);
                })
                .catch(error => {
                    this.setState({
                        errorMessage: 'Failed to delete the form. Please try again.'
                    });
                    console.error('Error:', error);
                });

        } else {
            this.setState({
                errorMessage: "name not found"
            })

        }
    }

    render() {
        const { employees, employModel, isSubmitted, errorMessage, mailPara, checkModel, verifyMail, namePara, verifyName, removeModal } = this.state;
        console.log(mailPara)
        console.log("verify:" + verifyMail)
        console.log(namePara)
        console.log("verify:" + verifyName)




        return (
            <>
                <div className="table-container">
                    <h2>Employee List</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Designation</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Avatar</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee.fullName}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.mobile}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.gender}</td>
                                    <td>{employee.course}</td>
                                    <td>
                                        <img src={`http://localhost:6105/${employee.avatar}`} alt="avatar" style={{ width: '50px', height: '50px' }} />
                                    </td>
                                    <td onClick={() => this.handleModal('checkModel', true)}><button onClick={() => this.setState({ mailPara: employee.email })}>Edit</button></td>
                                    <td onClick={() => this.handleModal('removeModal', true)}><button onClick={() => this.setState({ namePara: employee.fullName })} >Del</button></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <a href='/home'>Back to home</a>
                    </div>
                </div>

                <Modal
                    isOpen={checkModel}
                    style={customStyles}
                >

                    <div onClick={() => this.handleModal('checkModel', false)} className="close"><i className="fa-solid fa-xmark"></i></div>

                    <div className="mb-1">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" required onChange={(e) => this.setState({ verifyMail: e.target.value })} />

                    </div>
                    <button className="btn btn-primary mt-3" onClick={this.checkMail}>submit</button>
                    {/* <button className="btn btn-primary float-end" onClick={() => this.handleModal('employModel', true)}>proceed</button> */}

                    {errorMessage && (
                        <p style={{ color: 'red' }}>{errorMessage}</p>
                    )}
                </Modal>

                <Modal
                    isOpen={employModel}
                    style={customStyles}
                >
                    <div onClick={() => this.handleModal('employModel', false)} className="close"><i className="fa-solid fa-xmark"></i></div>
                    <div>
                        <form onSubmit={this.EmployDetail}>
                            <div className="mb-1">
                                <label htmlFor="fullName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="fullName" name="fullName" required onChange={this.handleInputChange} />
                            </div>
                            <div className="mb-1">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" required onChange={this.handleInputChange} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-1">
                                <label htmlFor="exampleInputMobile" className="form-label">Mobile</label>
                                <input type='tel' className="form-control" id="exampleInputMobile" name="mobile" maxLength={10} required onChange={this.handleInputChange} />
                            </div>
                            <div className="mb-1">
                                <label htmlFor="designation" className="form-label">Designation</label>
                                <select className="form-select" id="designation" name="designation" required onChange={this.handleInputChange}>
                                    <option value="">Open this select menu</option>
                                    <option value="Hr">Hr</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Team leader">Team leader</option>
                                    <option value="Head">Head</option>
                                    <option value="Vice president">Vice president</option>
                                </select>
                            </div>
                            <div className="mt-2 d-flex justify-content-center">
                                <div>
                                    <input type="radio" id="men" value="Men" name="gender" required onChange={this.handleInputChange} />
                                    <label htmlFor="men">Men</label>
                                </div>&nbsp; &nbsp;
                                <div>
                                    <input type="radio" id="Women" name="gender" value="Women" required onChange={this.handleInputChange} />
                                    <label htmlFor="Women">Women</label>
                                </div>
                            </div>
                            <div className="mt-2 d-flex justify-content-evenly">
                                <div className="m-1 form-check">
                                    <input type="checkbox" className="form-check-input" name="course" id="exampleCheck1" value="MBBS" onChange={this.handleInputChange} />
                                    <label className="form-check-label" htmlFor="exampleCheck1">MBBS</label>
                                </div>
                                <div className="m-1 form-check">
                                    <input type="checkbox" className="form-check-input" name="course" id="exampleCheck2" value="MCA" onChange={this.handleInputChange} />
                                    <label className="form-check-label" htmlFor="exampleCheck2">MCA</label>
                                </div>
                                <div className="m-1 form-check">
                                    <input type="checkbox" className="form-check-input" name="course" id="exampleCheck3" value="MBA" onChange={this.handleInputChange} />
                                    <label className="form-check-label" htmlFor="exampleCheck3">MBA</label>
                                </div>
                                <div className="m-1 form-check">
                                    <input type="checkbox" className="form-check-input" name="course" id="exampleCheck4" value="BSC" onChange={this.handleInputChange} />
                                    <label className="form-check-label" htmlFor="exampleCheck4">BSC</label>
                                </div>
                                <div className="m-1 form-check">
                                    <input type="checkbox" className="form-check-input" name="course" id="exampleCheck5" value="B.Tech" onChange={this.handleInputChange} />
                                    <label className="form-check-label" htmlFor="exampleCheck5">B.Tech</label>
                                </div>
                            </div>
                            <div className="m-1">
                                <label htmlFor="formFile" className="form-label">Upload your photo</label>
                                <input className="form-control" type="file" id="formFile" name="avatar" required onChange={this.handleInputChange} />
                            </div>
                            <div className="m-2">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                            <button className="btn btn-primary float-end" onClick={() => this.handleModal('employModel', false)}>ok</button>
                            {isSubmitted && (
                                <p style={{ color: 'green' }}>{isSubmitted}</p>
                            )}
                            {errorMessage && (
                                <p style={{ color: 'red' }}>{errorMessage}</p>
                            )}
                        </form>
                    </div>
                </Modal>

                <Modal
                    isOpen={removeModal}
                    style={customStyles}
                >

                    <div onClick={() => this.handleModal('removeModal', false)} className="close"><i className="fa-solid fa-xmark"></i></div>

                    <div className="mb-1">
                        <label htmlFor="exampleInputEmail1" className="form-label">fullName </label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" required onChange={(e) => this.setState({ verifyName: e.target.value })} />

                    </div>
                    <button className="btn btn-primary mt-3" onClick={this.checkName}>submit</button>
                    <button className="btn btn-primary float-end mt-3" onClick={() => this.handleModal('removeModal', false)}>back</button>

                    {isSubmitted && (
                                <p style={{ color: 'green' }}>{isSubmitted}</p>
                            )}

                    {errorMessage && (
                        <p style={{ color: 'red' }}>{errorMessage}</p>
                    )}
                </Modal>
            </>
        );
    }
}

export default EmployeeTable;
