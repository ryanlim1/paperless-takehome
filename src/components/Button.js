import React from 'react';

const Button = ({id, text, onSubmit}) => {
  return (
    <div>
        <button id={id} onClick={()=>onSubmit()}>{text}</button>
    </div>
  )
}

export default Button;