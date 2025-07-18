import React from "react";
import { Container } from "react-bootstrap";
import AddConsumption from "../../Components/Consumption/AddConsumption";
import ConsumptionTable from "../../Components/Consumption/ConsumptionTable";
const Consumption = () => {
    return (
        <Container className="mt-5">
            <h2 className="mb-4">Add a new consumption</h2>
            <AddConsumption />
            <ConsumptionTable />
        </Container>
    );
};

export default Consumption;
