import React from 'react';

const Button = ({text, onSubmit}) => {
  return (
    <div>
        <button onClick={()=>onSubmit()}>{text}</button>
    </div>
  )
}

export default Button;