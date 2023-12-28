import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import { MdFormatListBulletedAdd, MdOutlineEditNote } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import { RiEqualizerLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import Test from './test';
import { IoIosClose } from "react-icons/io";
import CustomIcon from './icon';
import FormComponent from './FormComponent';
import MarkerComponent from "./markercomponent";
import ReactDOMServer from "react-dom/server";
import { FaUserLock } from "react-icons/fa";
import AdminImg from "./admin.png";
import PowerGrid from "./power-grid.png";
import PowerGridGreen from "./post-green.png";
import PowerGridRed from "./post-red.png";
import companyLogo from './Logo.jpg';
import LoaderIcon from './electric-power-tower.png';
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

const { BaseLayer } = LayersControl;
const API_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const API_KEY = 'AIzaSyDNFlMANbAIyO7U_mQ-HEPk2iEOc-_uuig';

const GeolocationComponent = () => {
    const [locations, setLocations] = useState([]);
    const [additionalMarkers, setAdditionalMarkers] = useState([]);
    const [mapType, setMapType] = useState('normal');
    const [loading, setLoading] = useState(true);
    // sidemenu
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [sideMenuMoile, setSideMenuMoile] = useState(false)
    const [showDeatils, setShowDeatils] = useState(false);
    const [details, setDetails] = useState("");
    const [clickedLatitude, setClickedLatitude] = useState("");
    const [clickedLongitude, setClickedLongitude] = useState("");
    const [clickedLocation, setClickedLocation] = useState("");

    // Mainlocation
    const [clickedLatitudes, setClickedLatitudes] = useState("");
    const [clickedLongitudes, setClickedLongitudes] = useState("");
    const [clickeddetailss, setClickeddetailss] = useState("");
    const [clickedLocations, setClickedLocations] = useState("");

    // bottom drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [clickeddetails, setClickeddetails] = useState(null);
    const [puertoRicoDateTime, setPuertoRicoDateTime] = useState('');
    const [showTower, setShowTower] = useState(true);
    const [viewSubTower, setViewSubTower] = useState(false)
    // formshow
    const [showForm, setShowForm] = useState(false);
    // searchinput
    const [search, setSearch] = useState('');
    //subpost icon color change
    const [availabiity, setAvailability] = useState('');
    const [yesCount, setYesCount] = useState(0);
    const [noCount, setNoCount] = useState(0);
    const [towerInfo, setTowerInfo] = useState(null)
    // login component
    const [showLogin, setShowLogin] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [editTower, setEditTower] = useState(false)
    // sidemenu
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    useEffect(() => {
        const getPuertoRicoDateTime = () => {
            const options = { timeZone: 'America/Puerto_Rico', weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
            const dateTime = new Date().toLocaleString('en-US', options);
            setPuertoRicoDateTime(dateTime);
        };

        getPuertoRicoDateTime();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const staticLocations = [
                    { latitudes: 18.4655, longitudes: -66.1057, id: 'TR01', detailss: 'San Juan' },
                    { latitudes: 18.009222, longitudes: -66.616598, id: 'TR02', detailss: 'Ponce' },
                    { latitudes: 18.376508, longitudes: -66.169731, id: 'TR03', detailss: 'Bayamon' },
                    { latitudes: 18.199917, longitudes: -67.129297, id: 'TR04', detailss: 'Mayagüez' },
                    { latitudes: 18.398712, longitudes: -65.970955, id: 'TR05', detailss: 'Carolina' },
                    { latitudes: 18.232053, longitudes: -66.042387, id: 'TR06', detailss: 'Caguas' },
                    { latitudes: 17.959047, longitudes: -66.158018, id: 'TR07', detailss: 'Guayama' },
                    { latitudes: 18.435301, longitudes: -66.751672, id: 'TR08', detailss: 'Arecibo' },
                    { latitudes: 18.091598, longitudes: -67.158705, id: 'TR09', detailss: 'Cabo Rojo' },
                    { latitudes: 18.404693, longitudes: -67.167682, id: 'TR10', detailss: 'Aguadilla' }
                ];
                // Simulate a delay of at least 1 second
                setTimeout(() => {
                    setLocations(staticLocations);
                    setLoading(false); // Set loading to false after 1 second
                }, 2000);
            } catch (error) {
                console.error('Error getting locations:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };
        fetchData();
    }, []);

    const getTileLayerUrl = (mapType) => {
        if (mapType === 'satellite') {
            return 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
        } else {
            return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        }
    };

    // searchInput
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const locationsInSanJuan = [
        { towerId: "TR01", latitude: 18.4655, longitude: -66.1167, details: 'Condado', id: "SAN-P01", availability: 'yes' },
        { towerId: "TR01", latitude: 18.4265, longitude: -66.0501, details: 'Santurce', id: "SAN-P02", availability: 'no' },
        { towerId: "TR01", latitude: 18.4655, longitude: -66.0946, details: 'Miramar', id: "SAN-P03", availability: 'yes' },
        { towerId: "TR01", latitude: 18.428797, longitude: -66.088733, details: 'Puerto Nuevo', id: "SAN-P04", availability: 'no' }
    ];
    const locationsInPonce = [
        { details: 'Parque de Bombas', towerId: "TR02", latitude: 17.9833, longitude: -66.6096, id: "PON-P01", availability: 'yes' },
        { details: 'Plaza Las Delicias', towerId: "TR02", latitude: 17.9776, longitude: -66.6070, id: "PON-P02", availability: 'no' },
        { details: 'Catedral de Nuestra Señora de Guadalupe', towerId: "TR02", latitude: 17.9815, longitude: -66.6069, id: "PON-P03", availability: 'yes' },
        { details: 'Museo de Arte de Ponce', towerId: "TR02", latitude: 17.9826, longitude: -66.6081, id: "PON-P04", availability: 'no' },
        { details: 'La Guancha', towerId: "TR02", latitude: 17.9790, longitude: -66.6088, id: "PON-P04", availabiity: 'yes' }
    ];
    const locationsInBayamon = [
        { details: 'Bayamón Plaza', towerId: "TR03", latitude: 18.4003, longitude: -66.1580, id: "BAY-P01", availability: 'yes' },
        { details: 'Bayamón City Hall', towerId: "TR03", latitude: 18.3922, longitude: -66.1511, id: "BAY-P02", availability: 'yes' },
        { details: 'Santa Rosa Mall', towerId: "TR03", latitude: 18.4042, longitude: -66.1583, id: "BAY-P03", availability: 'no' },
        { details: 'Bayamón Central University', towerId: "TR03", latitude: 18.3983, longitude: -66.1503, id: "BAY-P04", availability: 'no' },
        { details: 'Science Park', towerId: "TR03", latitude: 18.4126, longitude: -66.1624, id: "BAY-P05", availability: 'yes' },
    ];
    const locationsInMayaguez = [
        { towerId: "TR04", latitude: 18.2011, longitude: -67.1409, details: 'Mayagüez Central', id: "MAY-P01", availability: 'yes' },
        { towerId: "TR04", latitude: 18.2037, longitude: -67.1459, details: 'Mayagüez Plaza', id: "MAY-P02", availability: 'yes' },
        { towerId: "TR04", latitude: 18.2055, longitude: -67.1414, details: 'Mayagüez University', id: "MAY-P03", availability: 'no' },
        { towerId: "TR04", latitude: 18.2069, longitude: -67.1396, details: 'Mayagüez Waterfront', id: "MAY-P04", availability: 'yes' },
        { towerId: "TR04", latitude: 18.2096, longitude: -67.1413, details: 'Mayagüez Downtown', id: "MAY-P05", availability: 'no' }
    ];
    const locationsInCarolina = [
        { towerId: "TR05", latitude: 18.4128, longitude: -65.9675, details: 'Location 1', id: "CAR-P01", availability: 'no' },
        { towerId: "TR05", latitude: 18.3984, longitude: -65.9388, details: 'Location 2', id: "CAR-P02", availability: 'yes' },
        { towerId: "TR05", latitude: 18.3840, longitude: -65.9412, details: 'Location 3', id: "CAR-P03", availability: 'yes' },
        { towerId: "TR05", latitude: 18.4274, longitude: -65.9564, details: 'Location 4', id: "CAR-P04", availability: 'yes' },
        { towerId: "TR05", latitude: 18.4390, longitude: -65.9778, details: 'Location 5', id: "CAR-P05", availability: 'no' }
    ];
    const locationsInCaguas = [
        { towerId: "TR06", latitude: 18.2344, longitude: -66.0485, details: 'Caguas City Center', id: "", availability: 'yes' },
        { towerId: "TR06", latitude: 18.2241, longitude: -66.0422, details: 'Botanical Garden', id: "", availability: 'no' },
        { towerId: "TR06", latitude: 18.2347, longitude: -66.0302, details: 'Plaza Centro Mall', id: "", availability: 'yes' },
        { towerId: "TR06", latitude: 18.2326, longitude: -66.0425, details: 'Caguas Museum', id: "", availability: 'yes' },
        { towerId: "TR06", latitude: 18.2407, longitude: -66.0434, details: 'Bairoa Park', id: "", availability: 'yes' }
    ];
    const locationsInGuayama = [
        { towerId: "TR07", latitude: 17.9714, longitude: -66.1057, details: 'Guayama City Center', id: "GUA-P01", availability: 'no' },
        { towerId: "TR07", latitude: 17.9800, longitude: -66.1200, details: 'Guayama Park', id: "GUA-P02", availability: 'yes' },
        { towerId: "TR07", latitude: 17.9650, longitude: -66.1075, details: 'Guayama Plaza', id: "GUA-P03", availability: 'no' },
        { towerId: "TR07", latitude: 17.9767, longitude: -66.1150, details: 'Guayama Waterfront', id: "GUA-P04", availability: 'yes' },
        { towerId: "TR07", latitude: 17.9690, longitude: -66.1033, details: 'Guayama Historical District', id: "GUA-P05", availability: 'no' }
    ];
    const locationsInArecibo = [
        { towerId: "TR08", latitude: 18.4717, longitude: -66.7152, details: 'Location 1', id: "ARE-P01", availability: 'yes' },
        { towerId: "TR08", latitude: 18.4448, longitude: -66.6231, details: 'Location 2', id: "ARE-P02", availability: 'yes' },
        { towerId: "TR08", latitude: 18.4762, longitude: -66.7242, details: 'Location 3', id: "ARE-P03", availability: 'no' },
        { towerId: "TR08", latitude: 18.4521, longitude: -66.7321, details: 'Location 4', id: "ARE-P04", availability: 'no' },
        { towerId: "TR08", latitude: 18.4584, longitude: -66.7157, details: 'Location 5', id: "ARE-P05", availability: 'yes' }
    ];
    const locationsInCaboRojo = [
        { towerId: "TR09", latitude: 18.0866, longitude: -67.1456, details: 'Playa Buyé', id: "CAB-P01", availability: 'no' },
        { towerId: "TR09", latitude: 18.0862, longitude: -67.1468, details: 'Cabo Rojo Lighthouse', id: "CAB-P02", availability: 'yes' },
        { towerId: "TR09", latitude: 18.0817, longitude: -67.1450, details: 'Combate Beach', id: "CAB-P03", availability: 'yes' },
        { towerId: "TR09", latitude: 18.0913, longitude: -67.1454, details: 'Joyuda', id: "CAB-P04", availability: 'yes' },
        { towerId: "TR09", latitude: 18.0844, longitude: -67.1360, details: 'Boquerón', id: "CAB-P05", availability: 'yes' }
    ];
    const locationsInAguadilla = [
        { towerId: "TR10", latitude: 18.4274, longitude: -67.1546, id: "AGU-P01", details: 'Aguadilla City Hall', availability: 'yes' },
        { towerId: "TR10", latitude: 18.4426, longitude: -67.1415, id: "AGU-P02", details: 'Aguadilla Ice Skating Arena', availability: 'no' },
        { towerId: "TR10", latitude: 18.4774, longitude: -67.1519, id: "AGU-P03", details: 'Crash Boat Beach', availability: 'yes' },
        { towerId: "TR10", latitude: 18.4314, longitude: -67.1525, id: "AGU-P04", details: 'Aguadilla Mall', availability: 'yes' },
        { towerId: "TR10", latitude: 18.4949, longitude: -67.1003, id: "AGU-P05", details: 'Aguadilla Airport (BQN)', availability: 'no' }
    ];
    const handleMarkerClick = async (latitudes, longitudes, detailss, map, availability, id) => {
        setShowTower(true);
        setViewSubTower(false);
        setIsDrawerOpen(!isDrawerOpen);
        setClickedLocation({ latitudes, longitudes, detailss, availability });
        setClickedLatitudes(latitudes);
        setClickedLongitudes(longitudes);
        setClickeddetailss(detailss);
        setAvailability(availability);
        setTowerInfo([])
        // logic for used&unused
        let towerPostInfo = []
        let postDatas = [...locationsInSanJuan, ...locationsInPonce, ...locationsInBayamon, ...locationsInMayaguez, ...locationsInCarolina, ...locationsInCaguas, ...locationsInGuayama, ...locationsInArecibo, ...locationsInCaboRojo, ...locationsInAguadilla, ...locationsInAguadilla]
        postDatas.forEach((ti) => {
            if (ti && ti.towerId) {
                if (id == ti.towerId) {
                    towerPostInfo.push(ti)
                }
            }
        })
        console.log('ti', towerPostInfo)
        setTowerInfo([...new Map(towerPostInfo.map(item => [item["id"], item])).values()])

        const handleMarkerClicks = async (latitude, longitude, details, id, map) => {
            setClickedLocation({ latitude, longitude, details });
            setClickedLatitude(latitude);
            setClickedLongitude(longitude);
            setClickeddetails(details);
            setViewSubTower(true);
            setShowTower(false);

        }
        // show details about location
        setClickedLocation({ latitudes, longitudes, detailss });
        let nearbyLocationsArray = [];
        if (latitudes === 18.4655 && longitudes === -66.1057) {
            nearbyLocationsArray = locationsInSanJuan;
            setDetails(locationsInSanJuan.length);
        } else if (latitudes === 18.009222 && longitudes === -66.616598) {
            nearbyLocationsArray = locationsInPonce;
            setDetails(locationsInPonce.length);
        } else if (latitudes === 18.376508 && longitudes === -66.169731) {
            nearbyLocationsArray = locationsInBayamon;
            setDetails(locationsInBayamon.length);
        } else if (latitudes === 18.199917 && longitudes === -67.129297) {
            nearbyLocationsArray = locationsInMayaguez;
            setDetails(locationsInMayaguez.length);
        } else if (latitudes === 18.398712 && longitudes === -65.970955) {
            nearbyLocationsArray = locationsInCarolina;
            setDetails(locationsInCarolina.length);
        } else if (latitudes === 18.232053 && longitudes === -66.042387) {
            nearbyLocationsArray = locationsInCaguas;
            setDetails(locationsInCaguas.length);
        } else if (latitudes === 17.959047 && longitudes === -66.158018) {
            nearbyLocationsArray = locationsInGuayama;
            setDetails(locationsInGuayama.length);
        } else if (latitudes === 18.435301 && longitudes === -66.751672) {
            nearbyLocationsArray = locationsInArecibo;
            setDetails(locationsInArecibo.length);
        } else if (latitudes === 18.091598 && longitudes === -67.158705) {
            nearbyLocationsArray = locationsInCaboRojo;
            setDetails(locationsInCaboRojo.length);
        } else if (latitudes === 18.404693 && longitudes === -67.167682) {
            nearbyLocationsArray = locationsInAguadilla;
            setDetails(locationsInAguadilla.length);
        }
        try {
            // Create additional markers
            const additionalMarkersArray = await Promise.all(
                nearbyLocationsArray.map(async (location, index) => {
                    const { latitude, longitude } = location;
                    return (
                        <Marker
                            key={index}
                            position={[latitude, longitude]}
                            icon={L.divIcon({
                                html: ReactDOMServer.renderToString(
                                    <MarkerComponent
                                        icon={location.availability === 'yes' ? PowerGridGreen : PowerGridRed}
                                        id={location.id}
                                        cw={true}
                                    />
                                )
                            })} eventHandlers={{
                                click: (e) => handleMarkerClicks(location.latitude, location.longitude, location.details, location.availabiity, e.target._map)
                            }}
                        >
                        </Marker>
                    );
                })
            );
            // Set additional markers in the state
            setAdditionalMarkers(additionalMarkersArray);
            // Center the map on the clicked location
            map.setView([latitudes, longitudes], 11); // Adjust the zoom level as needed
        } catch (error) {
            console.error('Error getting additional markers:', error);
        }
        setShowDeatils(true);
    };
    const onClose = () => {
        setIsDrawerOpen(!isDrawerOpen);
        setShowTower(false);
        setViewSubTower(false);

    }
    const handleShowForm = (t) => {
        setShowForm(true)
        setEditTower(t)
    }
    const handleCloseForm = () => {
        setShowForm(false)
    }
    const handleLogin = () => {
        console.log("login click")
        if (!isLoggedIn) {
            setShowForm(true)
        }
    }
    return (
        <div className='page-container'>
            {loading ? (
                <div className="loader-wrapper">
                    <div className='loader-img'>
                        <div style={{ position: "relative" }}>
                            <img src={LoaderIcon} alt='Logo' style={{ width: "300px", height: "300px" }} />
                            <div className='power-line power-line1'></div>
                            <div className='power-line power-line2'></div>
                            <div className='power-line power-line3'></div>
                            <div className='power-line power-line4'></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='mainPage'>
                    {/* sidemenu */}
                    {isMenuOpen ?
                        <div className='leftMenu'>
                            <div className={`mobile-container ${isMenuOpen ? 'menu-open' : ''}`}>
                                <div className="side-menu">
                                    {/* Menu items go here */}
                                    <a href="/">About Company</a>
                                    <a href="/about">Reach Us</a>
                                    <a href="/contact">Help</a>
                                </div>
                            </div>
                        </div> : null}
                    <div className='total'>
                        <div className='header-wrapper'>
                            <img src={companyLogo} alt='Logo' className='logo' />
                            <ul className='menu-bar'>
                                {window.innerWidth > 768 ? <><li>About Company</li>
                                    <li>Reach Us</li>
                                    <li>Help</li>
                                    <li>
                                        {!isLoggedIn ?<FaUserLock onClick={() => handleLogin()}/> : <img src={AdminImg} className='user-profile-icon' />}
                                    </li>
                                </> :
                                    <>
                                        <li style={{ marginRight: 15 }} className="menu-icons">
                                            {!isLoggedIn ? <FaUserLock onClick={() => handleLogin()}/> : <img src={AdminImg} className='user-profile-icon' />}

                                        </li>
                                        <li onClick={toggleMenu} className="menu-icons">
                                            {isMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
                                        </li>
                                    </>}


                            </ul>
                        </div>
                        <div className='map-container' style={{ display: 'flex', height: '88.55vh' }} >
                            <div className='search-wrapper'>
                                <div className='search-box'>
                                    <div className='search-bar'>
                                        <span style={{ position: "relative", width: "100%" }}>
                                            <input placeholder='Search City, Location and Area' className='search-input' />
                                            {/* <img src={SearchIcon} alt='Search' className='search' /> */}
                                            <FaSearch className='search' />
                                        </span>
                                        <span className='search-text' onClick={handleSearch}>Search</span>

                                    </div>
                                    <div className='filter-bar'>
                                        <span>Filter</span>
                                        <RiEqualizerLine className='filter' />
                                    </div>
                                </div>
                            </div>
                            <MapContainer
                                style={{ height: '100%', width: '100%' }}
                                center={[locations[0].latitudes, locations[0].longitudes]}
                                zoom={window.innerWidth > 768 ? 9.4 : 11}
                            >
                                <LayersControl position="topright">
                                    <BaseLayer checked name="Normal">
                                        <TileLayer
                                            url={getTileLayerUrl('normal')}
                                            attribution='&copy;'
                                        />
                                    </BaseLayer>
                                    <BaseLayer name="Satellite">
                                        <TileLayer
                                            url={getTileLayerUrl('satellite')}
                                            attribution='&copy;'
                                        />
                                    </BaseLayer>
                                </LayersControl>
                                {/* Display additional markers */}
                                {additionalMarkers}
                                {locations.map((location, index) => (
                                    <Marker
                                        className="marker"
                                        key={index}
                                        position={[location.latitudes, location.longitudes]}
                                        icon={L.divIcon({ html: ReactDOMServer.renderToString(<MarkerComponent icon={PowerGrid} id={location.id} cw={false} />) })}
                                        eventHandlers={{
                                            click: (e) => handleMarkerClick(location.latitudes, location.longitudes, location.detailss, e.target._map, location.availability, location.id),
                                        }}
                                    >
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>
                        {showForm ? <FormComponent
                            handleCloseForm={handleCloseForm}
                            clickedLatitude={clickedLatitude}
                            clickedLongitude={clickedLongitude}
                            clickeddetails={clickeddetails}
                            setShowForm={setShowForm}
                            isLoggedIn={isLoggedIn}
                            onLoginClick={() => { setIsLoggedIn(true); setShowForm(false) }}
                            clickedLocation={clickedLocation}
                            towerInfo={towerInfo}
                            editTower={editTower} /> : null}
                        <div className='bottomDrawer'>
                            <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
                                {showDeatils ? (
                                    <div className="details">
                                        <div className="details-warp">
                                            {showTower ?
                                                <div className="tower-details-warp">
                                                    <div className='basic-tower-details'>
                                                        <span className='cancelIconOne' onClick={onClose}><IoIosClose /></span>
                                                        <div className='tower-details-tag'>
                                                            <p className='date-p'>{puertoRicoDateTime}</p>
                                                            <p>{clickeddetailss}</p>
                                                        </div>
                                                        <div className="lonlog-details">
                                                            <span>Lat : {clickedLatitudes}</span>
                                                            <span>Lon : {clickedLongitudes}</span>
                                                        </div>
                                                        <div className='add-edit-wrp'>
                                                            <MdOutlineEditNote className='addtowerdetails' onClick={() => handleShowForm(true)} />
                                                            <IoIosAddCircleOutline className='addtowerdetails' onClick={() => handleShowForm(false)} />
                                                            {/* <button >Add New tower</button> */}
                                                        </div>
                                                    </div>
                                                    {towerInfo ? <div className="details-tag">
                                                        <p>Number of Posts : {towerInfo.length}</p>
                                                        <p>Used Posts: {towerInfo.filter((ti) => ti.availability == "no").length}</p>
                                                        <p>Available Posts : {towerInfo.filter((ti) => ti.availability == "yes").length}</p>
                                                        <p>Power Capacity : 500 MW</p>
                                                    </div> : null}
                                                </div> : null}
                                            {viewSubTower ? <>
                                                <Test
                                                    clickedLatitude={clickedLatitude}
                                                    clickedLongitude={clickedLongitude}
                                                    clickeddetails={clickeddetails}
                                                    clickedLatitudes={clickedLatitudes}
                                                    clickedLongitudes={clickedLongitudes}
                                                    clickeddetailss={clickeddetailss}
                                                    // handleCloseSubTowerdetails={handleCloseSubTowerdetails}
                                                    formattedDate={puertoRicoDateTime}
                                                    onClose={onClose}
                                                />
                                            </> : null}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};
export default GeolocationComponent;