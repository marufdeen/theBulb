const Subscriber = require("../models/subscriber");

// Initilaize the subscribersController object
const subscriberController = {};

subscriberController.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
subscriberController.getSubscriber = (req, res) => { 
  res.send(res.subscriber);
};

subscriberController.createSubscriber = async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
subscriberController.updateScriber =  async(req, res) => {
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
};

subscriberController.deleteSubscriber =  async(req, res) => {
    try {
        await res.subscriber.remove();
        res.status(200).json({message: 'Subscriber Deleted'})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports = subscriberController;
