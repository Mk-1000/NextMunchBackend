const express = require("express");
const Restaurant = require("../models/restaurant"); // Fix the import path
const Event = require("../models/event"); // Import the Event model
const router = express.Router();

router.post("/restaurants", async (req, res) => {
  try {
    const {
      ownerId,
      cin,
      bannerImg,
      mainImg,
      nameR,
      descriptionR,
      location,
      contact,
    } = req.body;

    // Create a new restaurant instance
    const newRestaurant = new Restaurant({
      ownerId,
      cin,
      bannerImg,
      mainImg,
      nameR,
      descriptionR,
      location,
      contact,
    });

    // Save the restaurant to the database
    const savedRestaurant = await newRestaurant.save();

    // Return the created restaurant's ID in the response
    res.status(201).json({
      message: "Restaurant saved successfully",
      restaurantId: savedRestaurant._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to create and associate an event with a restaurant
router.post("/restaurants/:id/events", async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Create a new event instance
    const newEvent = new Event({
      restaurantId,
      // Add other event properties based on your requirements
    });

    // Save the event to the database
    const savedEvent = await newEvent.save();

    // Find the restaurant by its ID and push the new event's ID to its events array
    await Restaurant.findByIdAndUpdate(restaurantId, { $push: { events: savedEvent._id } });

    res.status(201).json({
      message: "Event added to the restaurant successfully",
      eventId: savedEvent._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a specific restaurant by ID
router.get("/restaurant/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
