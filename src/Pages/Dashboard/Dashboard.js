import React from "react";
import { useSelector } from "react-redux";
import MonthlyChart from "../../Components/MonthlyChart/MonthlyChart";
import ConsumptionCardList from "../../Components/ConsumptionCardList/ConsumptionCardList";

const Dashboard = () => {
    const consumptions = useSelector((state) => state.consumption.list);
    //  récupération de l'utilisateur connecté
    const user = useSelector((state) => state.auth.user); 
    //  Calcul total par type
    const totals = consumptions.reduce(
        (acc, item) => {
            if (!item.type || !item.value) return acc;
            acc[item.type] += Number(item.value);
            return acc;
        },
        { electricity: 0, water: 0, gas: 0 }
    );

    return (
        <div className="container mt-5">
            <h2>Welcome, {user?.name || "User"} 👋</h2>
            <p>Your consumption statistics are shown below.</p>

            {/* Résumé total par type */}
            <div className="mb-4">
                <p>🔌 <strong>Total Electricity:</strong> {totals.electricity} kWh</p>
                <p>🚰 <strong>Total Water:</strong> {totals.water} m³</p>
                <p>🔥 <strong>Total Gas:</strong> {totals.gas} m³</p>
            </div>

            <h3 className="mb-3">Monthly Consumption Overview</h3>
            <MonthlyChart data={consumptions} />

            <h3 className="mt-4">Visual View</h3>
            <ConsumptionCardList />
        </div>
    );
};

export default Dashboard;
