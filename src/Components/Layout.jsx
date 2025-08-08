import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackButton from './BackButton';
import pageTitle from './PageTitle';


export default function Layout() {
  const [showBtn, setShowBtn] = useState(false)
  const [showFilters, setShowFilters] = useState(false);

  // Login: when the button should be shown
  useEffect (() => {
    const handleScroll = () => {
      if(window.scrollY >= 300){
        setShowBtn(true)
      }else{
        setShowBtn(false)
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    
  }, []);

  // When press the button
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

    pageTitle({
    "/": "Home",
    "/products": "Products",
    "/categories": "Caregories",
    "/brands": "Brands",
    "Cart": "Cart",
    "wishlist": "Favorite",
    "orders": "Orders",
    "productDetails": "Product Details/:id"
  })

  return (
    <>

        <Navbar setShowFilters={setShowFilters} showFilters={showFilters}/>

        <main className="py-5 main-content">
          <div className="container"> 
            <Outlet context={{ showFilters, setShowFilters }}/>
          </div>
        </main>

        <Footer/>

        {showBtn && (
          <button
            onClick={scrollToTop}
            className= {`scroll-to-top-btn ${showBtn ? "show" : "" }`}
            aria-label='Scroll to top'
          >
            <FontAwesomeIcon icon={faArrowUp}/>
          </button>
        )}
    </>
  )
}
