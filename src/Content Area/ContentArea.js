import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, NavLink, Offcanvas, Button } from 'react-bootstrap';
import tarangaData from '../Json Files/taranga.json';
import '../styles/ContentArea.css'; // Importing the external CSS file

function ContentAreaComp({ searchQuery, clearSearchQuery }) {
  const [cardData, setCardData] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCardData(tarangaData.page.lambhaka.taranga);
  }, []);

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  const handleItemClick = (index) => {
    navigate(`/taranga/${index}`);
    setShowSidebar(false);
    clearSearchQuery();
  };

  const selectedTaranga = id ? cardData[parseInt(id)] : null;
  const selectedShloka = selectedTaranga ? selectedTaranga.shloka : null;

  const filteredData = searchQuery
    ? cardData.filter(item =>
        item.taranga_heading.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cardData;

  useEffect(() => {
    if (searchQuery) {
      const match = cardData.find(item =>
        item.taranga_heading.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (match) {
        navigate(`/taranga/${cardData.indexOf(match)}`);
      }
    }
  }, [searchQuery, cardData, navigate]);

  const lambhakaHeading = tarangaData.page.lambhaka.lambhaka_heading;
  const mangalaShloka = tarangaData.page.lambhaka.mangala_shloka;

  return (
    <div className='container-fluid'>
      <Row>
        {/* Option button on mobile screen row */}
        <Row className='m-auto p-1'>
          <Button style={{ width: '40px', borderRadius: '50%' }} className="d-md-none btn-light" onClick={handleSidebarToggle}>
            ☰
          </Button>
        </Row>
        {/* Taranga heading and mangala shloka container */}
        <Row>
          <div className="jumbotron jumbotron-fluid mt-3">
            <div className="container">
              <h1 className="display-6">{lambhakaHeading}</h1>
              <p className="lead fs-6">{mangalaShloka}</p>
            </div>
          </div>
        </Row>

        <Col className='p-4 d-none d-md-block' xs={12} md={3}>
          <Card>
            <Card.Header className='text-light' style={{ backgroundColor: '#427D9D' }}>Taranga Chapters</Card.Header>
            <Card.Body className='text-start'>
              {cardData.map((item, index) => (
                <Card.Text key={index}>
                  <NavLink onClick={() => handleItemClick(index)}>
                    <li>{item.taranga_heading}</li>
                  </NavLink>
                </Card.Text>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Offcanvas show={showSidebar} onHide={handleSidebarToggle} className="d-md-none">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Taranga Chapters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div>
              <img 
                style={{ width: '100%', height: '200px', padding: '10px', borderRadius: '20px' }} 
                src='/taranga1.jpg' 
                alt='Taranga Chapter' 
                onError={(e) => e.target.src = '/path/to/placeholder.jpg'} 
              />
            </div>
            {cardData.map((item, index) => (
              <Card.Text key={index}>
                <NavLink onClick={() => handleItemClick(index)}>
                  <li>{item.taranga_heading}</li>
                </NavLink>
              </Card.Text>
            ))}
          </Offcanvas.Body>
        </Offcanvas>

        <Col className='p-4' xs={12} md={9}>
          {selectedShloka ? (
            <div className="card">
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <div>
                    <h2>{selectedTaranga.taranga_heading}</h2>
                    <div className='container-fluid w-100 p-3'>
                      <img 
                        className='container-fluid w-100' 
                        style={{ borderRadius: '40px' }} 
                        src={`/imagesForChapters/${selectedTaranga.taranga_image}`} 
                        alt="Taranga" 
                      />
                    </div>
                    <div style={{display:'flex', justifyContent:'space-evenly', fontSize:'18px', textAlign:'justify'}}>
                      <div style={{padding:'0px',textAlign:'justify'}}>
                        {Array.isArray(selectedShloka[0]) ? (
                          selectedShloka[0].map((shloka, index) => (
                            <p key={index}>{shloka}</p>
                          ))
                        ) : (
                          <p>{selectedShloka[0]}</p>
                        )}
                      </div>
                      <div style={{padding:'0px'}}>
                        {Array.isArray(selectedShloka[1]) ? (
                          selectedShloka[1].map((shloka, index) => (
                            <p key={index}>{shloka}</p>
                          ))
                        ) : (
                          <p>{selectedShloka[1]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <footer className="blockquote-footer text-end p-3">
                    {selectedTaranga.authorline}
                  </footer>
                </blockquote>
              </div>
            </div>
          ) : (
            <div className='mt-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <div style={{ borderRadius: '50%' }}>
                <p className='fs-4'>Select a chapter to start reading.</p>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ContentAreaComp;
