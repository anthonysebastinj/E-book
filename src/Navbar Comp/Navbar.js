import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './TitleNavbar.css';

function MyVerticallyCenteredModal(props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    props.onSearch(searchQuery);
    setSearchQuery(''); // Reset the search input
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form className="d-flex" onSubmit={handleSearchSubmit}>
          <FormControl
            type="search"
            placeholder="Search taranga here"
            className="me-2"
            aria-label="Search"
            style={{ borderRadius: '20px', width: '100%' }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button type="submit" variant="outline-danger" style={{ borderRadius: '20px' }}>
            Search
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function TitleNavbar({ onSearch }) {
  const [modalShow, setModalShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
    setSearchQuery(''); // Reset the search input
  };

  return (
    <>
      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand className='w-50 text-start' href="#home">महाकविश्रीसोमदेवभट्टविरचितः कथासरित्सागरः</Navbar.Brand>
          <Navbar.Toggle style={{ borderRadius: '35px' }} variant="outline-primary" aria-controls="navbarScroll" onClick={() => setModalShow(true)}>
            <FontAwesomeIcon icon={faSearch} />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <div style={{ width: '100%', borderRadius: '20px' }}>
              <Form className="d-flex ms-auto d-none d-md-flex" onSubmit={handleSearchSubmit}>
                <FormControl
                  type="search"
                  placeholder="Search taranga here"
                  className="me-2 outline-danger"
                  aria-label="Search"
                  style={{ borderRadius: '20px' }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Button style={{ borderRadius: '35px' }} variant="outline-danger" className="no-outline" type="submit">
                  Search
                </Button>
              </Form>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSearch={onSearch}
      />
    </>
  );
}

export default TitleNavbar;
