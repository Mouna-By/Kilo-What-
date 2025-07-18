import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import ConsumptionCard from "../ConsumptionCard/ConsumptionCard";

const ConsumptionCardList = () => {
    const consumptions = useSelector((state) => state.consumption.list);

    if (consumptions.length === 0) {
        return <p className="text-muted mt-4">No consumptions yet.</p>;
    }

    //  Grouper par type
    const types = ["electricity", "water", "gas"];

    return (
        <Container className="mt-4">
            {types.map((type) => {
                const filtered = consumptions.filter((c) => c.type === type);
                if (filtered.length === 0) return null;

                // Emoji + titre capitalisé
                const titleMap = {
                    electricity: "⚡ Electricity",
                    water: "💧 Water",
                    gas: "🔥 Gas",
                };

                return (
                    <div key={type} className="mb-4">
                        <h5 className="mb-3">{titleMap[type]}</h5>
                        <Row>
                            {filtered.map((item) => (
                                <Col key={item.id} xs={12} md={6} lg={4}>
                                    <ConsumptionCard item={item} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                );
            })}
        </Container>
    );
};

export default ConsumptionCardList;
