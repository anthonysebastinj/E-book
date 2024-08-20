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
import '../styles/Navbar.css';

function MyVerticallyCenteredModal(props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    props.onSearch(searchQuery);
    setSearchQuery('');
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
        <Form className="searchPopupMobile" onSubmit={handleSearchSubmit}>
          <FormControl
            type="search"
            placeholder="Search taranga here"
            className='SearchbarOnModal'
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button type="submit" className='SearcBtnOnModal' >
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
    setSearchQuery('');
  };

  return (
    <>
      <Navbar className='NavbarContainer' expand="md">
        <Container>
          <Navbar.Brand className="NavbarLogo" href="#home">
            महाकविश्रीसोमदेवभट्टविरचितः कथासरित्सागरः
          </Navbar.Brand>
          <Navbar.Toggle 
            className="searchOptionMobile"
            aria-controls="navbarScroll" 
            onClick={() => setModalShow(true)}
          >
            <FontAwesomeIcon icon={faSearch} />
          </Navbar.Toggle>
          <Navbar.Collapse className='NavbarCollapseContainer' id="navbarScroll" >
            <Form className="searchbarAndBtnDesktop d-none d-md-flex" onSubmit={handleSearchSubmit}>
              <FormControl
                type="search"
                className='searchOptionDesktop'
                placeholder="Search taranga here"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button className="SearchbuttonDesktop" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MyVerticallyCenteredModal show={modalShow}onHide={() => setModalShow(false)}onSearch={onSearch}/>
    </>
  );
}

export default TitleNavbar;
