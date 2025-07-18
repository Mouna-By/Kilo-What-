import React from "react";
import "./NotAuthorized.css";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
    return (
        <div className="not-authorized">
            <h1>🚫 Accès refusé</h1>
            <p>Vous n'avez pas les droits pour accéder à cette page.</p>
            <Link to="/">⬅️ Retour à l'accueil</Link>
        </div>
    );
};

export default NotAuthorized;
