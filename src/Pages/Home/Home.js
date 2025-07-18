import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container fluid className="home-container">
            <Row className="justify-content-center align-items-center text-center">
                <Col md={8}>
                    <h1 className="brand mb-3">KiloWhat?</h1>
                    <p className="lead">
                        Track, manage and understand your energy consumption —
                        simply and intelligently.
                    </p>
                    <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
                        <Button variant="light" size="lg" onClick={() => navigate("/register")}>
                            Get Started
                        </Button>
                        <Button variant="outline-light" size="lg" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
