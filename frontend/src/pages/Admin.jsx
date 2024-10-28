import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import Book from './Book';
const Admin = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [newTour, setNewTour] = useState({ title: '', city: '', address: '', distance: '', photo: '', desc: '', price: '', maxGroupSize: '', featured: false });
  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);
  const navigate = useNavigate();

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/tours/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'admin@gmail.com', password: 'admin' }),
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };



  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${BASE_URL}/tours`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTour, email: 'admin@gmail.com', password: 'admin' }),
      });
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setNewTour({ ...newTour, [e.target.name]: e.target.value });
  };

  const handleFeaturedToggle = async (id, currentFeatured) => {
    try {
      const updatedTour = { ...tours.find(tour => tour._id === id), featured: !currentFeatured };
      await fetch(`${BASE_URL}/tours/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTour),
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <h1 className=" a text-center">Admin Dashboard</h1>
          </Col>
          <Col lg="12">
            <Form onSubmit={handleCreate}>
              <Row>
                {Object.keys(newTour).map((key) => (
                  <Col lg="6" key={key}>
                    <FormGroup>
                      <Input
                        type={key === 'featured' ? 'checkbox' : 'text'}
                        name={key}
                        checked={key === 'featured' ? newTour[key] : undefined}
                        onChange={handleChange}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={newTour[key]}
                        required={key !== 'featured'}
                      />
                    </FormGroup>
                  </Col>
                ))}
              </Row>
              <Button type="submit"  className="create">Create Tour</Button>
            </Form>
          </Col>
          <Col lg="12">
            {loading && <h4 className="text-center pt-5">LOADING..........</h4>}
            {error && <h4 className="text-center pt-5">{error}</h4>}
            {!loading && !error && (
              <Row>
                <Col lg="12">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Distance</th>
                        <th>Photo</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Max Group Size</th>
                        <th>Category</th>
                        <th>Featured</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tours?.map((tour) => (
                        <tr key={tour._id}>
                          <td>{tour.title}</td>
                          <td>{tour.city}</td>
                          <td>{tour.address}</td>
                          <td>{tour.distance}</td>
                          <td>{tour.photo}</td>
                          <td>{tour.desc}</td>
                          <td>{tour.price}</td>
                          <td>{tour.maxGroupSize}</td>
                          <td>{tour.category}</td>
                          <td>
                            <Input
                              type="checkbox"
                              checked={tour.featured}
                              onChange={() => handleFeaturedToggle(tour._id, tour.featured)}
                            />
                          </td>
                          <td>
                            <Button color="danger" className='create' onClick={() => handleDelete(tour._id)}>Delete</Button>{' '}
                           
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Col>
              </Row>
            )}
          </Col>
          <Col lg="12">
            <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
              {[...Array(pageCount).keys()].map((number) => (
                <span key={number} onClick={() => setPage(number)}
                  className={page === number ? 'active__page' : ''}
                >
                  {number + 1}
                </span>
              ))}
            </div>
          </Col>
        </Row>
        <Book/>
      </Container>
     
    </section>
    </>
  );
};

export default Admin;
