import React from 'react';
import TourCard from '../../shared/TourCard';
import { Col } from 'reactstrap';
import useFetch from './../../hooks/useFetch';
import { BASE_URL } from './../../utils/config';

const FeaturedTourList = ({ selectedCategory }) => {
   // API endpoint with dynamic category query
   const categoryQuery = selectedCategory ? `?category=${selectedCategory}` : '';
   const { data: featuredTours, loading, error } = useFetch(`${BASE_URL}/tours/search/getFeaturedTour${categoryQuery}`);
   
   return (
      <>
         {loading && <h4>Loading.....</h4>}
         {error && <h4>{error}</h4>}
         {!loading && !error && featuredTours?.map(tour => (
            <Col lg='3' md='4' sm='6' className='mb-4' key={tour._id}>
               <TourCard tour={tour} />
            </Col>
         ))}
      </>
   );
};

export default FeaturedTourList;
