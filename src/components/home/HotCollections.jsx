import React, { lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollections = () => {
  const [apiData, setApiData] = useState([]);
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  
  async function fetchData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setApiData(data);
  }

  useEffect(() => {
    fetchData();
    // $(".owl-carousel").owlCarousel({ 
    //   loop: true, 
    //   margin: 10, 
    //   nav: true, 
    //   dots: false, 
    //   autoplay: true, 
    //   autoplayTimeout: 3000, 
    //   responsive: { 
    //     0: { items: 1 }, 
    //     600: { items: 3 }, 
    //     1000: { items: 5 } 
    //   } 
    // });
  }, []);
  
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className='owl-theme' loop margin={10} nav>
          {apiData.map((id, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={id.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={id.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{id.title}</h4>
                  </Link>
                  <span>ERC-{id.code}</span>
                </div>
              </div>
            </div>
          ))}
          </OwlCarousel>
          </div>
          </div>
    </section>
  );
};

export default HotCollections;
