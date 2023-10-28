const express = require('express')
const User = require('../models/user.models')
const router = express.Router()

router.post('/signup', (req, res) => {
    User.findOne({ email: req.body.email }) // Check if user with the same email already exists
        .then(existingUser => {
            if (existingUser) {
                res.json({ message: "Email already exist" });
            } else {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                user.save()
                    .then(savedUser => {
                        res.json(savedUser);
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ message: 'Internal server error' });
                    });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});


router.post('/signin', (req, res) => {
    User.findOne({ email: req.body.email, password: req.body.password })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.json({ message: 'User not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});


module.exports = router