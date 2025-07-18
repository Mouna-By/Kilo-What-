import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { deleteUser, updateUser } from "../../redux/slices/userSlice";

import "./AdminPanel.css";

const AdminPanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { list: users } = useSelector((state) => state.user);

    useEffect(() => {
        if (user?.role !== "admin") {
            navigate("/not-authorized");
        } else {
            dispatch(fetchAllUsers());
        }
    }, [user, navigate, dispatch]);

    const handleEdit = (user) => {
        const newPhone = prompt("Enter new phone number", user.phone);
        if (newPhone) {
            dispatch(updateUser({ id: user._id, data: { ...user, phone: newPhone } }));
        }
    };



    return (
        <div className="admin-panel">
            <h2>Admin Panel - All Users</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((u) => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td>{u.role}</td>
                            <td className="action-buttons">
                                <button className="btn-edit" onClick={() => handleEdit(u)}>Edit</button>
                                <button className="btn-delete" onClick={() => dispatch(deleteUser(u._id))}>Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
