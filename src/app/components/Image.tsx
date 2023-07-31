import React from "react";

const LocalImage = ({ image, height }: { image: string, height:string }) => {
    const imageObject = require(`@/app/assets/${image}`);

    return <img src={imageObject.default} alt="none" height={height}/>
}

export default LocalImage