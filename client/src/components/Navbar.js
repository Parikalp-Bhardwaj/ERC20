import React from 'react'
import {Link} from "react-router-dom"

const Navbar = ({ConnectWeb,accounts}) => {

  return (
         <nav className="w-full h-20 flex  p-4
         bg-slate-500">
            <ul className='flex flex-row ml-20'>
                <li className='cursor-pointer text-2xl mr-14'>
                    <Link to='/'>Home</Link></li>
                <li className='cursor-pointer text-2xl mr-14'>
                <Link to='/transferfrom'>TransferFrom</Link></li>
               
                {accounts ? (<li className="text-2xl ml-96">{accounts}</li>):
                <button className="text-2xl ml-44" onClick={ConnectWeb}>Connect Wallet</button>}
            </ul>
           
        </nav>
  
  )
}

export default Navbar