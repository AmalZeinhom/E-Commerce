import React from 'react'
import notFoundProducts from '../assets/productFound.png'

export default function NotFound() {
  return (
    <div className=' d-flex justify-content-center align-items-center my-5'>        
            <img src={notFoundProducts} alt="Not Found" className='product-status'/>        
    </div>
  )
}
