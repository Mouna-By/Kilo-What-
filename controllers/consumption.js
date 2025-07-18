const Consumption = require("../models/Consumption");

// Ajouter une consommation liée à l'utilisateur connecté
exports.addConsumption = async (req, res) => {
    try {
        const newEntry = new Consumption({
            ...req.body,
            user: req.user._id, // Utiliser "user" (référence MongoDB)
        });
        const saved = await newEntry.save();
        res.status(201).send({ msg: "Consumption added", consumption: saved });
    } catch (err) {
        res.status(500).send({ errors: [{ msg: "Failed to add consumption" }] });
    }
};

// Obtenir toutes les consommations de l'utilisateur connecté
exports.getUserConsumptions = async (req, res) => {
    try {
        const data = await Consumption.find({ userId: req.user.id });
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ errors: [{ msg: "Failed to fetch data" }] });
    }
};

// Mettre à jour une consommation uniquement si elle appartient à l'utilisateur
exports.updateConsumption = async (req, res) => {
    try {
        const consumption = await Consumption.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!consumption) {
            return res.status(403).send({ errors: [{ msg: "Not authorized or not found" }] });
        }
        res.status(200).send({ msg: "Updated", updated: consumption });
    } catch (err) {
        res.status(500).send({ errors: [{ msg: "Update failed" }] });
    }
};

// Supprimer une consommation uniquement si elle appartient à l'utilisateur
exports.deleteConsumption = async (req, res) => {
    try {
        const consumption = await Consumption.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });
        if (!consumption) {
            return res.status(403).send({ errors: [{ msg: "Not authorized or not found" }] });
        }
        res.status(200).send({ msg: "Deleted successfully" });
    } catch (err) {
        res.status(500).send({ errors: [{ msg: "Deletion failed" }] });
    }
};
