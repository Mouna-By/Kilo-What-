import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Fonction pour regrouper les consommations par mois et type
const prepareChartData = (consumptions) => {
    const grouped = {};

    consumptions.forEach(({ type, value, date }) => {
        if (!date) return;

        const month = new Date(date).toLocaleString("default", { month: "short" });

        if (!grouped[month]) {
            grouped[month] = { month, electricity: 0, water: 0, gas: 0 };
        }

        if (grouped[month][type] !== undefined) {
            grouped[month][type] += value;
        }
    });

    // Retourne un tableau prêt à afficher
    return Object.values(grouped).sort((a, b) =>
        new Date(`01 ${a.month} 2000`) - new Date(`01 ${b.month} 2000`)
    );
};

const MonthlyChart = ({ data }) => {
    const chartData = prepareChartData(data);

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="electricity"
                        stroke="#007bff"
                        name="Electricity (kWh)"
                    />
                    <Line
                        type="monotone"
                        dataKey="water"
                        stroke="#28a745"
                        name="Water (m³)"
                    />
                    <Line
                        type="monotone"
                        dataKey="gas"
                        stroke="#ffc107"
                        name="Gas (m³)"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyChart;
