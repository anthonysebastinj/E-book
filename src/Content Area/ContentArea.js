import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, NavLink, Offcanvas, Button } from 'react-bootstrap';
import tarangaData from './taranga.json';

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
    clearSearchQuery(); // Clear the search query when an item is clicked
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

  return (
    <div className='container-fluid'>
      <Row>
        <Row className='m-auto p-1'>
          <Button style={{ width: '40px', borderRadius: '50%' }} className="d-md-none btn-light" onClick={handleSidebarToggle}>
            ☰
          </Button>
        </Row>
        <Row>
          <div className="jumbotron jumbotron-fluid mt-3">
            <div className="container">
              <h1 className="display-6">"कथापीठं नाम प्रथमो लम्बकः"</h1>
              <p className="lead fs-6">इदं गुरुगिरीन्द्रजाप्रणयमन्दरान्दोलनात् पुरा किल कथामृतं हरमुखाम्बुधेरुद्गतम् । प्रसह्य सरयन्ति ये विगतविघ्नलब्धर्द्वयो धुरं दधति वैवुधीं भुवि भवप्रसादेन ते ॥ १॥</p>
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
                    <p style={{ fontSize: '12px' }}>{selectedShloka.join('\n')}</p>
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
                <img 
                  style={{ borderRadius: '50%' }} 
                  className='w-50' 
                  src='/pngtree-alot-of-books-illustration-png-image_11519708.png' 
                  alt='Select Chapter' 
                />
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
