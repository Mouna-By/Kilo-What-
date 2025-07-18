import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import logo from "../../assets/logo.png";
import "./NavBar.css";

const NavBar = () => {
    const { token, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <Navbar expand="lg" variant="dark" className="custom-navbar">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                    
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        {token && user?.role === "user" && (
                            <>
                                <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link as={NavLink} to="/consumption">Consumption</Nav.Link>
                            </>
                        )}
                        {token && user?.role === "admin" && (
                            <Nav.Link as={NavLink} to="/admin-panel">Admin Panel</Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {!token ? (
                            <>
                                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
