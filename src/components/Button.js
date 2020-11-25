import React from 'react';
import "./../css/button.css";

const Button = (props) => {
    return(
    <React.Fragment>
        
    <button className="btn" type="button">{props.children}</button>    
    </React.Fragment>
    )
};

export default Button;