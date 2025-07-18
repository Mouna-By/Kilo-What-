import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addConsumption } from "../../redux/slices/consumptionSlice";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

const AddConsumption = () => {
    const [type, setType] = useState("electricity");
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            addConsumption({
                type,
                value: Number(value),
                date,
            })
        );

        setSubmitted(true);
        setValue("");
        setDate("");

        // Disparition de l’alerte après 3 secondes
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <>
            {submitted && (
                <Alert variant="success">Consumption added successfully!</Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Energy Type</Form.Label>
                            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="electricity">Electricity</option>
                                <option value="water">Water</option>
                                <option value="gas">Gas</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Value</Form.Label>
                            <Form.Control
                                type="number"
                                required
                                placeholder="Enter value"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Save Consumption
                </Button>
            </Form>
        </>
    );
};

export default AddConsumption;
