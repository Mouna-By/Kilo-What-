import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import "./Profile.css";

const Profile = () => {
    //  Données utilisateur simulées
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        role: "User",
    });

    const [formData, setFormData] = useState({ name: user.name, email: user.email });
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //  Simule la mise à jour du profil (plus tard on utilisera Redux/API)
        setUser((prev) => ({ ...prev, ...formData }));
        setSuccess(true);

        // Réinitialiser l'alerte après 3s
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <Container className="mt-5">
            <Card className="shadow p-4 rounded">
                <Card.Body>
                    <h3 className="mb-4 profile-title"> My Profile</h3>

                    {success && (
                        <Alert variant="success">Your profile has been updated!</Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="text"
                                value={user.role}
                                disabled
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;
