const mongoose = require('mongoose');
const User = require('../models/user_model')

module.exports = {
    getAllUser: async (req, res) => {
        try {
            const user = await User.find();
            if (user) {
              res.status(200).json(user);
            } else {
              res.status(404).json({ error: 'User not found' });
            }
          } catch (error) {
            res.status(500).json({
                 error: 'Error retrieving user', 
                 details: error.message
                });
          }
    },

    getFromUsername: async (req, res) => {
        const { username } = req.params;
        try {
        const user = await User.findOne({ username });
    
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
        } catch (error) {
        res.status(500).json({ error: 'Error retrieving user' });
        } 
    },

    createUser: async (req, res) => {
        const { username, password, firstName, lastName, contactNum, email } = req.body;
      
        try {
          const user = new User({ username, password, firstName, lastName, contactNum, email });
          await user.save();
          res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            if (error.name === 'ValidationError') {
                // Handle validation errors (e.g., required fields, unique constraints)
                const validationErrors = {};
                // Iterate over errors and extract details
                for (const field in error.errors) {
                    if (error.errors.hasOwnProperty(field)) {
                        validationErrors[field] = error.errors[field].message;
                    }
                }
                // res.status(400).json({ error: 'โปรดกรอกข้อมูลที่จำเป็นให้ครบ'});
                res.status(400).json({ error: 'Validation error', details: validationErrors });
            } else {
                res.status(500).json({ error: 'Error creating user' });
            }
        }
    },

    updateUser: async (req, res) => {
        const id = req.params.id
        const updates = req.body;
        
        try {
          const doc = await User.findByIdAndUpdate(id, updates, {new: true});
          res.status(201).json({ message: 'User updated successfully', newData: doc});
        } catch (error) {
            if (error.name === 'ValidationError') {
                // Handle validation errors (e.g., required fields, unique constraints)
                const validationErrors = {};
                // Iterate over errors and extract details
                for (const field in error.errors) {
                    if (error.errors.hasOwnProperty(field)) {
                        validationErrors[field] = error.errors[field].message;
                    }
                }
                // res.status(400).json({ error: 'โปรดกรอกข้อมูลที่จำเป็นให้ครบ'});
                res.status(400).json({ error: 'Validation error', details: validationErrors });
            } else {
                res.status(500).json({ error: 'Error creating user' });
            }
        }
    },

    deleteUserFromID: async (req, res) => {
        const id = req.params.id;
        try {
        const result = await User.findByIdAndDelete(id);
    
        if (result) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'Invalid ID' });
        }
        } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
        } 
    },

}