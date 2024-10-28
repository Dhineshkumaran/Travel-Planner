import React from 'react'
import '../styles/home.css'
import { Container, Row, Col,  } from 'reactstrap'


import Subtitle from './../shared/subtitle'

import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
import Testimonials from '../components/Testimonial/Testimonials'


const About = () => {
   return <>
      <section>
         <Container>
            <Row>
               <Col lg='12'>
                 
                  <h2 className="gallery__title">Visit our customers tour gallery</h2>
               </Col>
               <Col lg='12'>
                  <MasonryImagesGallery />
               </Col>
            </Row>
         </Container>
      </section>
      {/* ========== GALLERY SECTION END ================ */}

      {/* ========== TESTIMONIAL SECTION START ================ */}
      <section>
         <Container>
            <Row>
               <Col lg='12'>
                  <h2 className="testimonial__title">What our fans say about us</h2>
               </Col>
               <Col lg='12'>
                  <Testimonials />
               </Col>
            </Row>
         </Container>
      </section>
     
   </>
}

export default About