import React from "react";
import "./PictureCard";

const PictureCard = props =>(
<div className="picture-card">
    <div className ="pic-container">
    <img onClick={() => props.handleImageClick(props.id)} alt={props.name} src={props.image} />
    </div>
</div>

);

export default PictureCard;