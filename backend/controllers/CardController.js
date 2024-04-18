const CardModel = require('../models/CardModel');

const {validationResult} = require('express-validator');

module.exports.getCard = async (req, res) => {
    const card = await CardModel.find();
    res.send(card);
}

module.exports.saveCard = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({errors: errors.array()});
    }

    const {title, details} = req.body;

    CardModel.create({title, details})
        .then((data) => {
            console.log("Added successfully.....");
            res.send(data);
        })
        .catch((error) => {
            console.error("Error while saving card:", error);
            res.status(500).send("Internal server error.");
        });
};


module.exports.updateCardById = async (req, res) => {

    const {_id, title, details} = req.body;

    CardModel
        .findByIdAndUpdate(_id, {
            title, details
        })
        .then(() => {
            console.log("Updated successfully.");
            res.send("Updated successfully.");
        })

}

module.exports.deleteCardById = async (req, res) => {

    const {_id} = req.body;

    CardModel
        .findByIdAndDelete(_id)
        .then(() => {
            res.send("Deleted successfully.");
        }).catch((error) => {
        console.log(error)
    })

}


module.exports.getCardById = async (req, res) => {
    if (!req.params.id) {
        res.status(500)
    }

    const id = req.params.id;
    const card = await CardModel.findById(id);
    res.send(card);
}