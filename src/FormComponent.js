import React, { useState } from 'react';
import { MdDeleteSweep } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { emailValidator, passWordValidator } from './Validator';
import { IoIosClose } from "react-icons/io";
import "./formcomponent.css";

export default function FormComponent({ handleCloseForm, clickedLatitude, clickedLongitude, clickeddetails, setShowForm, isLoggedIn, onLoginClick, clickedLocation, towerInfo, editTower }) {
    console.log("towerInfo", towerInfo)
    const [inputValues, setInputValues] = useState(editTower ? towerInfo : [""]);
    const towerInitialValue = { towerName: clickedLocation?.detailss, towerLan: clickedLocation?.latitudes, towerLon: clickedLocation?.longitudes, towerremarks: "" };
    const postInitialValue = { postName: "", postLan: "", postLog: "", postRemarks: "" };
    const [towerData, setTowerData] = useState(towerInitialValue);
    const [postData, setPostData] = useState(postInitialValue)
    // login component
    const initialvalue = { userName: "", passWord: "" };
    const [input, setInput] = useState(initialvalue);
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = (e) => {
        setTowerData({ ...towerData, [e.target.name]: e.target.value });
        setPostData({ ...postData, [e.target.name]: e.target.value })
    };
    const handleAdd = () => {
        setInputValues([...inputValues, '']);
    }
    const handleNewAddTower = (event) => {
        event.preventDefault();
        setTowerData({
            towerName: "",
            towerLan: "",
            towerLon: "",
            towerremarks: ""
        });
        setPostData({
            postName: "",
            postLan: "",
            postLog: "",
            postRemarks: ""
        })
        setShowForm(false)
        console.log({ towerData, postData })
    }
    const handleDeleteNewPostForm = (index) => {
        const newInputValues = [...inputValues];
        newInputValues.splice(index, 1);
        setInputValues(newInputValues)
    }
    // login component
    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const getValue = (event) => {
        event.preventDefault();
        setIsChecked(false);
        onLoginClick()

    };
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div className='formcomponnent'>
            <div className='form-container'>
                {isLoggedIn ? <div className='form-warp'>
                    <h2>Tower details</h2>
                    <div className='form-tower-warp'>
                        <div className='form-tower-tag'>
                            <label>Tower Name</label>
                            <input className='form-tower-input' onChange={handleChange} value={editTower ? towerData.towerName : ""} name='towerName' type="text" placeholder='Enter Locaton Name'></input>
                        </div>
                        <div className='form-tower-tag'>
                            <label>Tower Latitude</label>
                            <input className='form-tower-input' onChange={handleChange} value={editTower ? clickedLocation.latitudes : ""} name='towerLan' type="text" placeholder='00.00000'></input>
                        </div>
                        <div className='form-tower-tag'>
                            <label>Tower Longitude</label>
                            <input className='form-tower-input' onChange={handleChange} value={editTower ? clickedLocation.longitudes : ""} name='towerLon' type="text" placeholder='00.00000'></input>
                        </div>
                        <div className='form-tower-tag'>
                            <label>Remarks</label>
                            <input className='form-tower-input' onChange={handleChange} name='towerremarks' type="text" placeholder='Enter remarks'></input>
                        </div>
                    </div>
                    <h2 style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 15 }}>Post details <span onClick={handleAdd}><IoIosAddCircleOutline /></span></h2>
                    <div className='form-post-warp' >
                        {inputValues.map((value, index) => (
                            <div className='form-post-tag form-tower-warp' key={index}>
                                <div className='form-post-details form-tower-tag'>
                                    <label>Post Name</label>
                                    <input value={value?.details} className='form-tower-input' onChange={handleChangeLogin} name='postName' type="text" placeholder='Enter Location Name'></input>
                                </div>
                                <div className='form-post-details form-tower-tag'>
                                    <label>Post Latitude</label>
                                    <input value={value?.latitude} className='form-tower-input' onChange={handleChangeLogin} name='postLan' type="number" placeholder='00.00000'></input>
                                </div>
                                <div className='form-post-details form-tower-tag'>
                                    <label>Post Longitude</label>
                                    <input value={value?.longitude} className='form-tower-input' onChange={handleChangeLogin} name='postLog' type="number" placeholder='00.00000'></input>
                                </div>
                                <div className='form-post-details form-tower-tag'>
                                    <label>Remarks</label>
                                    <input value={value?.towerName} className='form-tower-input' onChange={handleChangeLogin} name='postRemarks' type="text" placeholder='Enter remarks'></input>
                                </div>
                                <MdDeleteSweep className='delete-icon' onClick={() => handleDeleteNewPostForm(index)} />
                            </div>
                        ))}
                    </div>
                    <div className='form-tower-btn-warp'>
                        <div className='form-tower-btn-tag from-post-btn-warp'>
                            <button style={{ border: "1px solid #fff", background: "transparent", color: "#fff" }} onClick={handleCloseForm} className='form-post-btn-tag'>Cancel</button>
                            <button style={{ background: "#174344", border: "1px solid #174344", color: "#fff" }} className='form-post-btn-tag' onClick={handleNewAddTower}>Confirm</button>
                        </div>
                    </div>
                </div> :
                    <div className="form-warp">
                        <span className='cancelIconOne' onClick={handleCloseForm}><IoIosClose /></span>
                        <h2 onClick={()=>{
                            setInput({
                                userName: "admin@gmail.com",
                                passWord:"ps12"
                            })
                        }}>Login</h2>
                        <form className="form-warp">
                            <div className="login-input-warp">
                                <input
                                    type="text"
                                    className="form-tower-input"
                                    placeholder="Email"
                                    name="email"
                                    value={input.userName}
                                    onChange={handleChange}
                                ></input>
                            </div>
                            <div className="login-input-warp">
                                <input
                                    type="password"
                                    className="form-tower-input"
                                    placeholder="Password"
                                    name="passWord"
                                    value={input.passWord}
                                    onChange={handleChange}
                                ></input>
                            </div>
                            <div className="login-checkbox-warp">
                                <input
                                    type="checkbox"
                                    className="checkbox-tag"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                ></input>
                                <p className="p-tag">
                                    Remember me?
                                </p>
                            </div>
                            <div className="form-post-details form-tower-tag" style={{ width: "100%" }}>
                                <button
                                    className="form-post-btn-tag"
                                    style={{ background: "#174344", border: "1px solid #174344", color: "#fff", width: "100%" }}
                                    onClick={onLoginClick}
                                >
                                    Login
                                </button>
                                <p className="p-tag" style={{ textAlign: "right", color: "#ccc" }}>
                                    Forget Password?
                                </p>
                                {/* <p className="p-tag">
                                    Or <span>register now!</span>
                                </p> */}
                            </div>
                        </form>
                    </div>}

            </div>
        </div>
    )
}

