import React from "react";

function DrumPad({id,keyTrigger,url,sound}){
    const handleClick = () =>{
        sound(keyTrigger,id);
    };
    
    return(
        <div className="drum-pad" id={id} onClick={handleClick}>
            {keyTrigger}
            <audio className="clip" id={keyTrigger} src={url}/>
        </div>
    );
};

export default DrumPad;