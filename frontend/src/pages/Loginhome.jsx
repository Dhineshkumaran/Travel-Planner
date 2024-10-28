import React, { useState } from 'react';
import '../styles/home.css';
import { Container, Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
import Subtitle from '../shared/subtitle';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';

const Loginhome = () => {
   // State for the selected category
   const [category, setCategory] = useState('');

   // Trip purpose options
   const tripCategories = ['Devotional', 'Hills', 'Beach', 'Family Fun', 'Adventure', 'Historical'];

   const handleCategoryChange = (e) => {
      setCategory(e.target.value);
   };

   return (
      <>
         <section>
            <Container>
               <Row>
                  <Col lg='12' className='mb-5 d-flex justify-content-between align-items-center'>
                     <div>
                        <Subtitle subtitle={'Explore'} />
                        <h2 className='featured__tour-title'>Our featured tours</h2>
                     </div>
                     {/* Search Bar and Dropdown */}
                     <Form inline>
                        <FormGroup>
                           <Label for="tripCategory" className="mr-sm-2">Filter by Category:</Label>
                           <Input 
                              type="select" 
                              name="tripCategory" 
                              id="tripCategory" 
                              value={category} 
                              onChange={handleCategoryChange}
                           >
                              <option value=''>All</option>
                              {tripCategories.map((cat, index) => (
                                 <option key={index} value={cat}>{cat}</option>
                              ))}
                           </Input>
                        </FormGroup>
                     </Form>
                  </Col>
               </Row>
               {/* Pass the selected category to FeaturedTourList */}
               <Row>
                  <FeaturedTourList selectedCategory={category} />
               </Row>
            </Container>
         </section>
      </>
   );
};

export default Loginhome;
