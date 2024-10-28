import React from 'react'
import Slider from 'react-slick'

const Testimonials = () => {
   const settings = {
      dots:true,
      infinite:true,
      autoplay:true,
      speed:1000,
      swipeToSlide:true,
      autoplaySpeed:2000,
      slidesToShow:3,

      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
            breakpoint: 576,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
         }
      ]
   }

   return <Slider {...settings}>
      <div className="testimonial py-4 px-3">
         <p>"Traveling with Travel World was an incredible experience from start to finish. Their exceptional service ensured a seamless trip, with every detail meticulously planned. The local guides were passionate and knowledgeable, offering insights that we would have missed on our own. The accommodations were top-notch, and the suggested dining spots were fantastic. This was one of the best trips we've ever taken, and we can't wait to travel with you again!"
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            <div>
               <h6 className='mb-0 mt-3'>Ajay</h6>
               <p>Customer</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <p>"We had a fantastic family vacation, thanks to the wonderful team at trave world. They made sure every detail was taken care of, from our accommodations to the fun activities that kept our kids entertained. The personalized service and attention to detail made us feel special. The kids especially loved the guided nature walks and the interactive cultural experiences. Highly recommend for families looking to create lasting memories!"
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>            
            <div>
               <h6 className='mb-0 mt-3'>John</h6>
               <p>Customer</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <p>"I have always dreamed of visiting London, and travel world made it a reality. The trip exceeded all my expectations. The itinerary was thoughtfully curated, with a perfect balance of sightseeing, relaxation, and unique local experiences. The highlight was a private tour of the historic sites,
             which provided a deep understanding of the place's rich history. Thank you for making my dream trip come true!"
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>            
            <div>
               <h6 className='mb-0 mt-3'>Deepak</h6>
               <p>Customer</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <p>"From start to finish, our trip was absolutely amazing! The itinerary was perfectly planned, allowing us to experience the best of each destination without feeling rushed. Our guide was knowledgeable and friendly, providing us with fascinating insights into the local culture and history. The accommodations were comfortable and conveniently located. This was truly an unforgettable adventure, and we can't wait to book our next trip with you!"
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            <div>
               <h6 className='mb-0 mt-3'>Vishal</h6>
               <p>Customer</p>
            </div>
         </div> 
      </div>
   </Slider>
}

export default Testimonials