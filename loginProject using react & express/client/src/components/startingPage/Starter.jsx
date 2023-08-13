import React from 'react'
import './Starter.css'
import img from './start.png'

export default function Starter() {
  return (
    <div className='mainDiv'>
      <header>
        EDUee
      </header>
      <div className='staterDiv'>

        <div className='starterDivLeft'>
          <h1>
            <span>Welcome</span>
            <br /> To EDUee
          </h1>
          <h3>“We learn from failure, not from success!”</h3>
          <div>
            <button className='btn1'><a href="/login" >Sign in</a></button>
            <button><a href="/register" >Sign up</a></button>
          </div>
        </div>
        <div className="starterDivRight">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  )
}
