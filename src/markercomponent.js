function MarkerComponent({ icon, id, cw }) {
    return (
        <div className="custom-marker-wrap">
            <img src={icon} className="marker-img"/>
            <p className="marker-id" style={{width: cw ? 40:"auto"}}>{id}</p>
        </div>
    )
}
export default MarkerComponent;