import React from 'react'

const Feild = ({className,name,onchangeFunction,type,value,labeltext}) => {

  return (
    <>
      <label htmlFor={name}>{labeltext} 
        <input className={className} {...type==="number" && "step=1000"} onChange={onchangeFunction} type={type} name={name} value={value} />
      </label>
    </>
  )
}

export default Feild
