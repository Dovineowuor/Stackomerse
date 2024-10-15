import React from 'react';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressCard, faShoppingCart, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage = () => {
    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <Card>
                        <Card.Header>
                            <FontAwesomeIcon icon={faUser} /> User Profile
                        </Card.Header>
                        <Card.Body>
                            <Tab.Container defaultActiveKey="contact">
                                <Row>
                                    <Col sm={3}>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link eventKey="contact">
                                                    <FontAwesomeIcon icon={faAddressCard} /> Contact
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="address">
                                                    <FontAwesomeIcon icon={faAddressCard} /> Address
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="orders">
                                                    <FontAwesomeIcon icon={faShoppingCart} /> Orders
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="payments">
                                                    <FontAwesomeIcon icon={faCreditCard} /> Payment Methods
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={9}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="contact">
                                                <h4>Contact Information</h4>
                                                <p>Details about contact information...</p>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="address">
                                                <h4>Address</h4>
                                                <p>Details about address...</p>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="orders">
                                                <h4>Orders</h4>
                                                <p>Details about orders...</p>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="payments">
                                                <h4>Payment Methods</h4>
                                                <p>Details about payment methods...</p>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;