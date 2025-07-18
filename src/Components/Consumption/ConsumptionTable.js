import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeConsumption, clearAllConsumptions, editConsumption, } from "../../redux/slices/consumptionSlice";
import { Table, Button, Form } from "react-bootstrap";
import html2pdf from "html2pdf.js";

const ConsumptionTable = () => {
    const consumptions = useSelector((state) => state.consumption.list);
    const dispatch = useDispatch();

    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [editDate, setEditDate] = useState("");

    const handleEditClick = (item) => {
        setEditingId(item.id);
        setEditValue(item.value);
        setEditDate(item.date);
    };

    const handleSaveEdit = (id) => {
        dispatch(
            editConsumption({
                id,
                updatedData: { value: Number(editValue), date: editDate },
            })
        );
        setEditingId(null);
        setEditValue("");
        setEditDate("");
    };

    const handleExportPDF = () => {
        const element = document.getElementById("consumption-table-pdf");

        const options = {
            filename: "consumption_report.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        html2pdf().set(options).from(element).save();
    };

    if (consumptions.length === 0) {
        return <p className="mt-4 text-muted">No data to display.</p>;
    }

    return (
        <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Recorded Consumptions</h4>
                <div>
                    <Button variant="outline-primary" onClick={handleExportPDF} className="me-2">
                        Export as PDF
                    </Button>
                    <Button variant="outline-danger" onClick={() => dispatch(clearAllConsumptions())}>
                        Clear All
                    </Button>
                </div>
            </div>

            <div id="consumption-table-pdf">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consumptions.map((item) => (
                            <tr key={item.id}>
                                <td>{item.type}</td>
                                <td>
                                    {editingId === item.id ? (
                                        <Form.Control
                                            type="number"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                    
                                        />
                                    ) : (
                                        item.value
                                    )}
                                </td>
                                <td>
                                    {editingId === item.id ? (
                                        <Form.Control
                                            type="date"
                                            value={editDate}
                                            onChange={(e) => setEditDate(e.target.value)}
                                        />
                                    ) : (
                                        item.date
                                    )}
                                </td>
                                <td>
                                    {editingId === item.id ? (
                                        <Button
                                            size="sm"
                                            variant="success"
                                            onClick={() => handleSaveEdit(item.id)}
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                size="sm"
                                                variant="warning"
                                                onClick={() => handleEditClick(item)}
                                                className="me-2"
                                            >
                                                ✏️ Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() => dispatch(removeConsumption(item.id))}
                                            >
                                                🗑️ Delete
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ConsumptionTable;
