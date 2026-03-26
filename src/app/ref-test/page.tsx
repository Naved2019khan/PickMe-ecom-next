"use client"
import React, { useRef } from 'react'


const Page = () => {
    const refValue = useRef(null)

    const handleClick = () => {
        refValue.current = "hello ref"
        console.log(refValue.current)
    }
    console.log(refValue.current)

  return (
    <div>
        <button onClick={handleClick}>Set value</button>
        {refValue.current}
    </div>
  )
}

export default Page