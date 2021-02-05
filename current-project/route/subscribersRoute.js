const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscribersController');
const Subscriber = require('../models/subscriber');
const getSubscriber = require('../middlewares/subscriberMiddleware')

// Get all subscribers
router.get('/', subscriberController.getSubscribers ); 

// Get a subscriber
router.get('/:id', getSubscriber, subscriberController.getSubscriber);

// Create a subscriber
router.post('/', subscriberController.createSubscriber);

// Edit a subscriber
router.patch('/:id', getSubscriber, subscriberController.updateScriber);

// Delete a subscriber
router.delete('/:id', getSubscriber, subscriberController.deleteSubscriber); 

module.exports = router