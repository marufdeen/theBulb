const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber')

// Get all subscribers
router.get('/', async(req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers)
    } catch (error) {
       res.status(500).json({ message: error.message }) 
    }
});

// Get a subscriber
router.get('/:id', getSubscriber, (req, res) => {
    res.send(res.subscriber); 
});

// Create a subscriber
router.post('/', async(req, res) => {
 const subscriber = new Subscriber({
     name: req.body.name,
     subscribedToChannel: req.body.subscribedToChannel
 });
 try {
     const newSubscriber = await subscriber.save();
     res.status(201).json(newSubscriber);
 } catch (error) {
    res.status(400).json({ message: error.message })
 }
});

// Edit a subscriber
router.patch('/:id', getSubscriber, async(req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const uodatedSubscriber = await res.subscriber.save();
        res.status(201).json(uodatedSubscriber);
    } catch (error) {
    res.status(500).json({ message: error.message })
    }
});

// Delete a subscriber
router.delete('/:id', getSubscriber, async(req, res) => {
    try {
        await res.subscriber.remove();
        res.status(200).json({message: 'Subscriber Deleted'})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});
async function getSubscriber (req, res, next) {
let subscriber;
try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
        return res.status(404).json({message: 'Subscriber not found'})
    }
} catch (error) {
    return res.status(500).json({message: error.message})
}
res.subscriber = subscriber;
next()
}
module.exports = router