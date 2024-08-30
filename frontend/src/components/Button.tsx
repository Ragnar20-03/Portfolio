import React, {ReactNode } from 'react'

interface ButtonProps {
    children : ReactNode
    onClickHandler : ()  => {} | void
}

const  Button : React.FC<ButtonProps> =  ({ children  ,  onClickHandler} , ) => {
  return (
    <button className="bg-black w-32  m-1 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition duration-300" onClick={ onClickHandler}>
        {children}
    </button>
  )
}

export default Button