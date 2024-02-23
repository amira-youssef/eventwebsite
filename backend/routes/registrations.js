const express = require("express"); 
const router = express.Router();
const Registration = require('../models/Registration');


router.post("/registerEvent", async (req, res) => {
    const newRegistration = new Registration(req.body);

    try {
        const event = await newRegistration.save();
        res.send('Registered Successfully !');
    } catch (error) {
        return res.status(400).json({ error });
    }
});


router.post("/userRegistrations", async (req, res) => {
    const { userId } = req.body ;

    try {
        const userRegistrations = await Registration.find({ userID: userId});
        res.json({userRegistrations});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
});

router.get("/allRegistrations", async (req, res) => {
    try {
      const allRegistrations = await Registration.find();
      res.json({ allRegistrations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete("/deleteRegistration/:registrationID", async (req, res) => {
    const { registrationId } = req.params;
  
    try {
      await Registration.findByIdAndDelete(registrationId);
      res.json({ message: 'registration deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;