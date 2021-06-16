import React, { FormEvent } from 'react'
import './Button.scss'

interface ButtonProps {
  click: (e: FormEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const changeInput = (e: FormEvent<HTMLButtonElement>) => {
    props.click(e);
  }

  return (
      <button className="button" type="button" name="search" placeholder="search" onClick={changeInput}>SEARCH</button>
  )
}

export default Button;
