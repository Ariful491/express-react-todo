const {Router} = require('express');
const {getCard, saveCard, updateCardById, deleteCardById, getCardById} = require("../controllers/CardController");
const {body} = require('express-validator');
const router = Router();
const saveCardValidationRules = [
    body('title').trim().notEmpty().withMessage('Title is required.'),
    body('details').trim().notEmpty().withMessage('Details are required.')
];

router.get('/', getCard);
router.get('/get-card/:id', getCardById);
router.post('/save-card', saveCardValidationRules, saveCard);
router.post('/update-card', updateCardById);
router.post('/delete-card', deleteCardById);

module.exports = router;