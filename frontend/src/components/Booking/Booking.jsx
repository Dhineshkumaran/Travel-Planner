import React, { useState, useContext, useEffect } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const Booking = ({ tour, avgRating }) => {
   const { price, reviews, title } = tour;
   const navigate = useNavigate();

   const { user } = useContext(AuthContext);

   const usdToInrRate = 83;

   const [booking, setBooking] = useState({
      userId: user && user._id,
      userEmail: user && user.email,
      tourName: title,
      fullName: '',
      phone: '',
      guestSize: 1,
      bookAt: '',
   });

   const loadRazorpayScript = () => {
      return new Promise((resolve) => {
         const script = document.createElement('script');
         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
         script.onload = () => resolve(true);
         script.onerror = () => resolve(false);
         document.body.appendChild(script);
      });
   };

   useEffect(() => {
      loadRazorpayScript();
   }, []);

   const handleChange = (e) => {
      setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
   };

   const serviceFee = 10 * usdToInrRate;
   const totalAmount = Number(price) * usdToInrRate * Number(booking.guestSize) + Number(serviceFee); // Convert total to INR

   const handleClick = async (e) => {
      e.preventDefault();

      if (!user || user === undefined || user === null) {
         return alert('Please sign in');
      }

      if (!booking.fullName || !booking.phone || !booking.bookAt || booking.guestSize < 1) {
         return alert('Please fill in all required fields.');
      }

      try {
         const res = await fetch(`${BASE_URL}/create-order`, {
            method: 'POST',
            headers: {
               'content-type': 'application/json',
            },
            body: JSON.stringify({
               amount: totalAmount,
            }),
         });

         const { orderId } = await res.json();

         const options = {
            key: 'rzp_test_4rdgre6savrrmw',
            amount: totalAmount * 100,
            currency: 'INR',
            name: 'Tour Booking',
            description: 'Test Transaction',
            order_id: orderId,
            handler: async function (response) {
               const paymentData = {
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  signature: response.razorpay_signature,
               };

               const paymentResponse = await fetch(`${BASE_URL}/booking`, {
                  method: 'POST',
                  headers: {
                     'content-type': 'application/json',
                  },
                  credentials: 'include',
                  body: JSON.stringify({
                     ...booking,
                     paymentData,
                  }),
               });

               const paymentResult = await paymentResponse.json();

               if (paymentResult.success) {
                  navigate('/thank-you');
               } else {
                  alert('Payment failed. Please try again.');
               }
            },
            prefill: {
               name: booking.fullName,
               email: user.email,
               contact: booking.phone,
            },
            notes: {
               address: 'Razorpay Corporate Office',
            },
            theme: {
               color: '#3399cc',
            },
         };

         const rzp1 = new window.Razorpay(options);
         rzp1.open();
      } catch (error) {
         alert('Error initiating payment:', error.message);
      }
   };

   return (
      <div className='booking'>
         <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>₹{(price * usdToInrRate).toFixed(2)} <span>/per person</span></h3>
            <span className="tour__rating d-flex align-items-center">
               <i className='ri-star-fill' style={{ color: 'var(--secondary-color)' }}></i>
               {avgRating === 0 ? null : avgRating} ({reviews?.length})
            </span>
         </div>

         {/* =============== BOOKING FORM START ============== */}
         <div className="booking__form">
            <h5>Information</h5>
            <Form className='booking__info-form' onSubmit={handleClick}>
               <FormGroup>
                  <input
                     type="text"
                     placeholder="Full Name"
                     id="fullName"
                     required
                     onChange={handleChange}
                  />
               </FormGroup>
               <FormGroup>
                  <input
                     type="tel"
                     placeholder="Phone"
                     id="phone"
                     required
                     onChange={handleChange}
                  />
               </FormGroup>
               <FormGroup className="d-flex align-items-center gap-3">
                  <input
                     type="date"
                     placeholder=""
                     id="bookAt"
                     required
                     onChange={handleChange}
                  />
                  <input
                     type="number"
                     placeholder="Guest"
                     id="guestSize"
                     required
                     onChange={handleChange}
                  />
               </FormGroup>
            </Form>
         </div>
         {/* =============== BOOKING FORM END ================ */}

         {/* =============== BOOKING BOTTOM ================ */}
         <div className="booking__bottom">
            <ListGroup>
               <ListGroupItem className="border-0 px-0">
                  <h5 className="d-flex align-items-center gap-1">
                     ₹{(price * usdToInrRate).toFixed(2)}{' '}
                     <i className="ri-close-line"></i> 1 person
                  </h5>
                  <span> ₹{(price * usdToInrRate).toFixed(2)}</span>
               </ListGroupItem>
               <ListGroupItem className="border-0 px-0">
                  <h5>Service charge</h5>
                  <span>₹{serviceFee.toFixed(2)}</span>
               </ListGroupItem>
               <ListGroupItem className="border-0 px-0 total">
                  <h5>Total</h5>
                  <span>₹{totalAmount.toFixed(2)}</span>
               </ListGroupItem>
            </ListGroup>

            <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
               Book Now
            </Button>
         </div>
      </div>
   );
};

export default Booking;
