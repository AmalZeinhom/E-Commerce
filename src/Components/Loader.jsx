import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOpencart } from '@fortawesome/free-brands-svg-icons'

export default function Loader() {
  return (
    <>
        <div className="openCart-loader-container container bg-transparent d-flex justify-content-center align-items-center" style={{width: "500px", height: "500px"}}>
            <div className="icon-wrapper">
                <FontAwesomeIcon icon={faOpencart} className="icon-base"/>

                <FontAwesomeIcon icon={faOpencart} className="icon-fill"/>
            </div>
        </div>
    </>
  )
}
