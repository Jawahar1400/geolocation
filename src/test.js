import React, { useState } from 'react';
import './test.css';
import { IoIosInformationCircle } from "react-icons/io";
import { IoMdPhotos } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import ImageGallery from './imageImageGallery';
import Elc1 from '././elec1.jpg';
// import Elc2 from '././elec2.jpg'
// import Elc3 from '././elec3.jpg'
// import Elc4 from '././elec4.jpg'
// import Elc5 from '././elec5.jpg'
// import Elc6 from '././elec6.jpg'
// import Elc7 from '././elec7.jpg'
// import Elc8 from '././elec8.webp'
import { RxAvatar } from "react-icons/rx";
import { FaStar } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

const Test = ({ clickedLongitude, clickedLatitude, clickeddetails, clickedLongitudes, clickedLatitudes, clickeddetailss, formattedDate, onClose }) => {
    const localImages = [
        Elc1
        // Elc2,
        // Elc3,
        // Elc4,
        // Elc5,
        // Elc6,
        // Elc7,
        // Elc8,
    ]
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    // const handleCloseSubTowerdetails=()=>{
    //     setViewSubTower(false)
    // }

    return (
        <div className="subtower">
            <div className='main'>
                <div className="sidebar">
                    <span className='cancelIcon' onClick={onClose}><IoIosClose /></span>
                    <div className="subtower-lonlog-details">
                        <span>Lat : {clickedLatitudes}</span>
                        <span>Lon : {clickedLongitudes}</span>
                    </div>
                    <div className="total-nums">
                        <p>{clickeddetailss}</p>
                        <h1 className="total">TOTAL : <br /> 5</h1>
                    </div>
                </div>
                <div className="mainbar sidebar">
                    <div className='subtower-mainbar'>
                        <div className='basic-subtower-details'>
                            <div className='tower-details-tag'>
                                <p className='date-p'>{formattedDate}</p>
                                <span className='area'>{clickeddetails}</span>
                            </div>
                            <div className="subtower-lanlog-details">
                                <span>Lat : {clickedLatitude} </span>
                                <span>Lon : {clickedLongitude}</span>
                            </div>
                        </div>
                        <div className="tab-buttons">
                            <button onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}>
                                <IoIosInformationCircle />  Information
                            </button>
                            <button onClick={() => handleTabClick(2)} className={activeTab === 2 ? 'active' : ''}>
                                <IoMdPhotos />   Photo
                            </button>
                            <button onClick={() => handleTabClick(3)} className={activeTab === 3 ? 'active' : ''}>
                                <GrOverview />  Overview
                            </button>
                        </div>
                        <div className="tab-content">
                            {activeTab === 1 && <div className='One'>
                                <div className='leftOne'>
                                    <span className='tab-info'>Fiber Optical Cables: 10 </span><br></br>
                                    <span className='tab-info'>Power Capacity: 21 MW</span><br></br>
                                    <span className='tab-info'>Used Ports:10</span><br />
                                    <span className='tab-info'>Availablity:10</span><br />
                                </div>
                                <div className='rightOne'>
                                    <span className='tab-info'> Aluminum: 10</span><br />
                                    <span className='tab-info'>Wood:10</span><br />
                                    <span className='tab-info'>Metal:10</span><br />
                                </div>
                            </div>
                            }
                            {activeTab === 2 && <ImageGallery images={localImages} />}
                            {activeTab === 3 && <div className='review'>
                                <div className='star'><RxAvatar />User1</div>
                                <div className='user-review'> <FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                                <div className='review-content'><p className='cont-rev'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>
                            </div>}
                        </div>
                    </div>
                    {/* <div className='subtower-close-btn-warp'>
                        <button className='subtower-cls-btn' onClick={handleCloseSubTowerdetails}>Close</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Test;