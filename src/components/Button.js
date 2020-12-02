import React from 'react';
import "./../css/button.css";

const Button = (props) => {
    return(
    <React.Fragment>
        
    <button onClick={props.clickFunc}className="btn" type="button" id={props.id}>{props.children}</button>    
    </React.Fragment>
    )
};

export default Button;