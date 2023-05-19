import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollections = () => {
	const [collections, setCollections] = useState([])

	const state= {
		responsive:{
				0: {
						items: 1,
				},
				580: {
						items: 2,
				},
				980: {
						items: 3,
				},
				1200: {
						items: 4,
				},
		},
}

	useEffect(() => {
		async function fetchHotCollections(){
			const { data } = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
			setCollections(data)
		}
		fetchHotCollections()
	}, [])

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
					<OwlCarousel 
						className='owl-theme' 
						items={4} 
						margin={15} 
						loop 
						nav
						dots={false}
						responsive={state.responsive}
					>
          {collections.map(collection => (
              <div className="nft_coll" key={collection.id}>
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>ERC-{collection.code}</span>
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
