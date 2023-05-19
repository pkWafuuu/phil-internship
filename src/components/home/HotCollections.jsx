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
	const [load, setLoad] = useState(false)

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
			setLoad(true)
		}
		fetchHotCollections()
	}, [load])

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
						margin={15} 
						loop 
						nav
						dots={false}
						responsive={state.responsive}
					>
					{ load ? (
						collections.map(collection => (
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
						))
					) : (
						new Array(6).fill(0).map((_, index) => (
							<div className="nft_coll" key={index}>
								<div className="nft_wrap">
									<div className="skeleton-box" style={{width:'100%', height: '200px'}}></div>
								</div>
								<div className="nft_coll_pp">
									<div className="skeleton-box" style={{width:'50px',height: '50px', borderRadius:'50%'}}></div>
									<i className="fa fa-check"></i>
								</div>
								<div className="nft_coll_info">
									<div className="skeleton-box" style={{width:'100px', height: '20px'}}></div>
									<br/>
									<div className="skeleton-box" style={{width:'60px', height: '20px'}}></div>
								</div>
							</div>
					))
					)
					}
					</OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
