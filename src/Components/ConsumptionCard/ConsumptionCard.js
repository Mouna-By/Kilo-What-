import React from "react";
import { Card, Badge } from "react-bootstrap";
import "./ConsumptionCard.css";

const ConsumptionCard = ({ item }) => {
  return (
    <Card className={`mb-3 shadow-sm card-${item.type}`}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="text-capitalize">{item.type}</Card.Title>
          <Badge bg="secondary">{item.type}</Badge>
        </div>
        <Card.Text>
          <strong>Value:</strong> {item.value}<br />
          <strong>Date:</strong> {item.date}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ConsumptionCard;
