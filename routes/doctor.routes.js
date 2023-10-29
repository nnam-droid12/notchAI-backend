const express = require('express')
const Doctor = require('../models/doctor.models')
const router = express.Router()



router.post('/doctor-signup', (req, res) => {
    Doctor.findOne({ email: req.body.email  }) // Check if user with the same email already exists
        .then(existingDoctor => {
            if (existingDoctor) {
                res.json({ message: "Doctor already exist" });
            } else {
                const doctor = new Doctor({
                    name: req.body.name,
                    email: req.body.email,
                    hospitalname: req.body.hospitalname,
                    specialty: req.body.specialty,
                    yearsofexperience: req.body.yearsofexperience,
                    batchno: req.body.batchno,
                    password: req.body.password
                });

                doctor.save()
                    .then(savedDoctor => {
                        res.json(savedDoctor);
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



router.post('/doctor-signin', (req, res) => {
    Doctor.findOne({ email: req.body.email, password: req.body.password })
        .then(doctor => {
            if (doctor) {
                res.json(doctor);
            } else {
                res.json({ message: 'Doctor not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});


module.exports = router