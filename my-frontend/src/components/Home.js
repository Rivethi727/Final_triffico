import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <article>
        
        <section
          className="section hero"
          style={{
            backgroundImage: `url('./assets/images/hero-bg-bottom.png') url('./assets/images/hero-bg-top.png')`,
          }}
        >
        <div className="container">
           
		      <img src={require("../../src/assets/images/shape-1.png")} width="61" height="61" alt="Vector Shape" className="shape shape-1" />
          <img src={require("../../src/assets/images/shape-2.png")} width="56" height="74" alt="Vector Shape" className="shape shape-2" />
          <img src={require("../../src/assets/images/shape-3.png")} width="57" height="72" alt="Vector Shape" className="shape shape-3" />

            
          <div className="hero-content">
            <p className="section-subtitle">Start Travelling now</p>
            <h2 className="hero-title">Explore Your Destination</h2>
            <p className="hero-text">
                Explore your dream tourist destination Before you get there before you get old.
            </p>

             
              <div className="btn-group">
              <Link to="/contact" className="btn btn-info" style={{
  '--bs-btn-padding-y': '.85rem',
  '--bs-btn-padding-x': '.85rem',
  '--bs-btn-font-size': '1.5rem', backgroundColor: 'hsl(180, 98%, 31%)', color: 'white'
}}>
                Contact Us
              </Link>
              <Link to="/new-trip" className="btn btn-outline btn-lg"
              style={{
                '--bs-btn-padding-y': '.85rem',
                '--bs-btn-padding-x': '.85rem',
                '--bs-btn-font-size': '1.5rem',
              }}>
                New Trip
              </Link>
            </div>
            </div>

            
            <figure className="hero-banner">
			<img src={require("../../src/assets/images/women.jpg")}
                width="686"
                height="812"
                loading="lazy"
                alt="hero banner"
                className="w-100"
              />
            </figure>
          </div>
        </section>

        {/* DESTINATION SECTION */}
        <section className="section destination">
<div className="container">

<p className="section-subtitle">Destinations</p>

<h2 className="h2 section-title">Choose Your Place</h2>
<div class="container text-center">

<div class="row g-2">
<div class="col-6">

{/* <ul className="destination-list"> */}

 {/* <li className="w-50"> */}
   <a href="1" className="destination-card">

     <figure className="card-banner">
     <img src={require("../../src/assets/images/jaffnalibrary.web")} width="1140" height="1100" loading="lazy" alt="Malé, Maldives" className="img-cover" />
     </figure>

     <div className="card-content">
       <p className="card-subtitle">LIBRARY</p>

       <h3 className="h3 card-title">Jaffna</h3>
     </div>

   </a>
 {/* </li> */}
</div>
 {/* <li className="w-50"> */}
 <div class="col-6">

   <a href="1" className="destination-card">

     <figure className="card-banner">
     <img src={require("../../src/assets/images/war.webp")} width="1140" height="1100" loading="lazy" alt="Bangkok, Thailand" className="img-cover" />
     </figure>

     <div className="card-content">
       <p className="card-subtitle">war</p>

       <h3 className="h3 card-title">Kilinochchi</h3>
     </div>

   </a>
   </div>
 {/* </li> */}
 {/* </ul> */}
</div>
</div>

<div class="row g-3">
<div class="col-4">

   <a href="1" className="destination-card">

     <figure className="card-banner">
     <img src={require("../../src/assets/images/vavuniya.jpg")} width="1110" height="480" loading="lazy" alt="Kuala Lumpur, Malaysia" className="img-cover" />
     </figure>

     <div className="card-content">
       <p className="card-subtitle">Sri Dalatha</p>

       <h3 className="h3 card-title">Vavuniya</h3>
     </div>

   </a>
 </div>

 <div class="col-4">
   <a href="1" className="destination-card">

     <figure className="card-banner">
     <img src={require("../../src/assets/images/day.jpg")} width="1110" height="480" loading="lazy" alt="Kathmandu, Nepal" className="img-cover" />
     </figure>

     <div className="card-content">
       <p className="card-subtitle">Desland</p>

       <h3 className="h3 card-title">Mannar</h3>
     </div>

   </a>
 </div>

 <div class="col-4">
   <a href="1" className="destination-card">

     <figure className="card-banner">
     <img src={require("../../src/assets/images/mullai.jpg")}width="1110" height="480" loading="lazy" alt="Jakarta, Indonesia" className="img-cover" />
     </figure>

     <div className="card-content">
       <p className="card-subtitle">beach</p>

       <h3 className="h3 card-title">Mullaitivu</h3>
     </div>

   </a>
 </div>

</div>
</div>
</section>


        

        {/* About Section */}
	 <section class="section about">
        <div class="container">

          <div class="about-content">

            <p class="section-subtitle">About Us</p>

            <h2 class="h2 section-title">We create the trips you love</h2>

            <p class="about-text">
              We make the best of what we've learned over our years, of
              experience as luxury
              trave agents and bring it all together.
            </p>

            <ul class="about-list">
              <li class="about-item">

                <div class="about-item-icon">
                  <ion-icon name="compass"></ion-icon>
                </div>

                <div class="about-item-content">
                  <h3 class="h3 about-item-title">Best Tours</h3>

                  <p class="about-item-text">
                    A strict screening process ensures that we only offer the best tour and packages.
                  </p>
                </div>

              </li>

              <li class="about-item">

                <div class="about-item-icon">
                  <ion-icon name="briefcase"></ion-icon>
                </div>

                <div class="about-item-content">
                  <h3 class="h3 about-item-title">Friendly price</h3>

                  <p class="about-item-text">
                    We guarantee you the best price Found a lower price? We will match it.
                  </p>
                </div>

              </li>

              <li class="about-item">

                <div class="about-item-icon">
                  <ion-icon name="umbrella"></ion-icon>
                </div>

                <div class="about-item-content">
                  <h3 class="h3 about-item-title">Free Cancellation</h3>

                  <p class="about-item-text">
                    We understand how important flexibility is right now,just one click and it's done!.
                  </p>
                </div>

              </li>

            </ul>

            {/* <a href="1" class="btn btn-primary">View Details</a> */}
            <Link to="/allproducts" className="btn btn-info"
            style={{
              '--bs-btn-padding-y': '.85rem',
              '--bs-btn-padding-x': '.85rem',
              '--bs-btn-font-size': '1.5rem',
              backgroundColor: 'hsl(180, 98%, 31%)', color:'white' }}>
                View More
              </Link>

          </div>

          <figure class="about-banner">
		  <img src={require("../../src/assets/images/travel4.png")} width="756" height="842" loading="lazy" alt="" class="w-100"/>
          </figure>

        </div>
      </section>


        {/* Blog Section */}
	 <section class="section blog">
        <div class="container">

          <p class="section-subtitle">Explore Go Out havefun</p>

          <h2 class="h2 section-title">Affordable Travel Packages</h2>

          <ul class="blog-list">

            <li>
              <div class="blog-card">

                <figure class="card-banner">

                  <a href="1">
				  <img src={require("../../src/assets/images/pack1.jpg")} width="740" height="518" loading="lazy"
                      alt="A good traveler has no fixed plans and is not intent on arriving." class="img-cover"/>
                  </a>

                  <span class="card-badge">
                    <ion-icon name="time-outline"></ion-icon>

                    <time dateTime="12-04">DAYS</time>
                  </span>

                </figure>

                <div class="card-content">

                  <div class="card-wrapper">

                    <div class="author-wrapper">
                      <figure class="author-avatar">
					  <img src={require("../../src/assets/images/pack1.jpg")} width="30" height="30" alt="Jony bristow"/>
                      </figure>

                      <div>
                        <a href="1" class="author-name">Rs 37000</a>

                        <p class="author-title"></p>
                      </div>
                    </div>

                    {/* <time class="publish-time" dateTime="10:30">10:30 AM</time> */}

                  </div>

                  <h3 class="card-title">
                    <a href="1">
                     Place to visit Package
                    </a>
                  </h3>

                  <a href="1" class="btn-link">
                    <span>book Now</span>

                    <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                  </a>

                </div>

              </div>
            </li>

            <li>
              <div class="blog-card">

                <figure class="card-banner">

                  <a href="1">
				  <img src={require("../../src/assets/images/blog-2.jpg")} width="740" height="518" loading="lazy"
                      alt="A good traveler has no fixed plans and is not intent on arriving." class="img-cover"/>
                  </a>

                  <span class="card-badge">
                    <ion-icon name="time-outline"></ion-icon>

                    <time dateTime="12-04">04 Dec</time>
                  </span>

                </figure>

                <div class="card-content">

                  <div class="card-wrapper">

                    <div class="author-wrapper">
                      <figure class="author-avatar">
                       <img src={require("../../src/assets/images/blog-2.jpg")} width="30" height="30" alt="Jony bristow"/>
                      </figure>

                      <div>
                        <a href="1" class="author-name">Rs 29000</a>

                        <p class="author-title"></p>
                      </div>
                    </div>

                    {/* <time class="publish-time" dateTime="10:30">10:30 AM</time> */}

                  </div>

                  <h3 class="card-title">
                    <a href="1">
                      Temple Visit
                    </a>
                  </h3>

                  <a href="1" class="btn-link">
                    <span>Book Now</span>

                    <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                  </a>

                </div>

              </div>
            </li>

            <li>
              <div class="blog-card">

                <figure class="card-banner">

                  <a href="1">
				  <img src={require("../../src/assets/images/blog-3.jpg")} width="740" height="518" loading="lazy"
                      alt="A good traveler has no fixed plans and is not intent on arriving." class="img-cover"/>
                  </a>

                  <span class="card-badge">
                    <ion-icon name="time-outline"></ion-icon>

                    <time dateTime="12-04">04 Dec</time>
                  </span>

                </figure>

                <div class="card-content">

                  <div class="card-wrapper">

                    <div class="author-wrapper">
                      <figure class="author-avatar">
					  {/* <img src={require("../../src/assets/images/author-avartar.png")} width="30" height="30" alt="Jony bristow"/> */}
                      </figure>

                      <div>
                        <a href="1" class="author-name">Rs 24000</a>

                        {/* <p class="author-title">Admin</p> */}
                      </div>
                    </div>

                    {/* <time class="publish-time" dateTime="10:30">10:30 AM</time> */}

                  </div>

                  <h3 class="card-title">
                    <a href="1">
                      Summer Tour
                    </a>
                  </h3>

                  <a href="1" class="btn-link">
                    <span>Book Now</span>

                    <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                  </a>

                </div>

              </div>
            </li>

          </ul>

        </div>
      </section>

      </article>
    </main>
  );
};

export default Home;
