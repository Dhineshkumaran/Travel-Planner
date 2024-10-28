// Bookings.js
import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import '../styles/admin.css';

const Book = () => {
  const { data: bookings, loading, error } = useFetch(`${BASE_URL}/booking`);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mt-5">
            <h2 className="text-center">Bookings</h2>
            {loading && <h4 className="text-center pt-5">LOADING..........</h4>}
            {error && <h4 className="text-center pt-5">{error}</h4>}
            {!loading && !error && (
              <Row>
                <Col lg="12">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Tour Name</th>
                        <th>Full Name</th>
                        <th>Guest Size</th>
                        <th>Phone</th>
                        <th>Booked At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings?.map((booking) => (
                        <tr key={booking._id}>
                          <td>{booking.tourName}</td>
                          <td>{booking.fullName}</td>
                          <td>{booking.guestSize}</td>
                          <td>{booking.phone}</td>
                          <td>{new Date(booking.bookAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Book;
