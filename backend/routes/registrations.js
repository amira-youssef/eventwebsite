const express = require("express"); 
const router = express.Router();
const Registration = require('../models/Registration');
const User = require('../models/user');
const Event = require('../models/Event');



router.post("/registerEvent", async (req, res) => {
    try {
        // Extract eventId and userId from the request body
        const { eventId, userId } = req.body;
        
        // Create a new registration document
        const newRegistration = new Registration({
            eventID: eventId,
            userID: userId
        });

        // Save the registration to the database
        await newRegistration.save();
        
        // Send success response
        res.status(201).send('Registered Successfully!');
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(400).json({ error: 'Failed to register for the event.' });
    }
});

router.get("/userRegistrations/:userID", async (req, res) => {
    try {
        // Extract userId from the URL params
        const { userID } = req.params ;

        // Find all registrations for the given userId
        const userRegistrations = await Registration.find({ userID: userID });

        // Array to store processed registration data
        const processedRegistrations = [];

        // Iterate over each registration to fetch username and event name
        for (const registration of userRegistrations) {
            // Find user details by userId
            const user = await User.findById(registration.userID);
            const username = user ? user.username : 'Unknown User';

            // Find event details by eventId
            const event = await Event.findById(registration.eventID);
            const eventName = event ? event.title : 'Unknown Event';
            const registrationDate = event ? event.date : 'Unknown Event';
            const registrationId = registration._id ; 
            // Push processed registration data to array
            processedRegistrations.push({
                registrationId ,
                username,
                eventName,
                registrationDate, // You might want to format this date
            });
        }

        // Send the list of processed registrations as JSON response
        res.json({ userRegistrations: processedRegistrations });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get("/allRegistrations", async (req, res) => {
    try {

        // Find all registrations
        const allRegistrations = await Registration.find();

        const processedRegistrations = [];

        // Iterate over each registration to fetch username and event name
        for (const registration of allRegistrations) {
            // Find user details by userId
            const user = await User.findById(registration.userID);
            const username = user ? user.username : 'Unknown User';

            // Find event details by eventId
            const event = await Event.findById(registration.eventID);
            const eventName = event ? event.title : 'Unknown Event';
            const registrationDate = event ? event.date : 'Unknown Event';
            const registrationId = registration._id ; 
            // Push processed registration data to array
            processedRegistrations.push({
                registrationId ,
                username,
                eventName,
                registrationDate, // You might want to format this date
            });
        }

        // Send the list of processed registrations as JSON response
        res.json({ allRegistrations: processedRegistrations });
        
        // Send the list of all registrations as JSON response
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete("/deleteRegistration/:registrationId", async (req, res) => {
    try {
        // Extract registrationId from the request parameters
        const { registrationId } = req.params;
        
        // Find and delete the registration by its ID
        await Registration.findByIdAndDelete(registrationId);
        
        // Send success message
        res.json({ message: 'Registration deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

