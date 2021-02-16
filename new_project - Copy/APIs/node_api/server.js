//Import libraries to use
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt-nodejs')

// Create instance of Express library so we can code the API
const app = express();
//Make the instance use json format
app.use(express.json());
//make intance use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('uploads'))
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("File not supported"), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },

    fileFilter: fileFilter
})

const filevideo = (req, file, cb) => {
    if (file.mimetype === "video/mp4" || file.mimetype === "video/mwd") {
        cb(null, true);
    } else {
        cb(new Error("This is not a video file"), false);
    }
}

const uploadvideo = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1000
    },
    fileFilter: filevideo
})


//======================== Connection String =============================
const mongoose = require('mongoose'); // import library
mongoose.connect('mongodb://localhost/voting_office', { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

//Confirm connection to mongodb was successful
db.once('open', () => {
    console.log("connected to mongoDB successfully");
})

//Check if there are errors in the database
db.on('error', (err) => {
    console.log(err);
})

// load the model for newuser
let new_User = require('./models/newUser');

// load the model for photography
let photography = require('./models/photography');

let video = require('./models/video');


//1st end-point i.e. this is the address the front end will target for a specific operation
app.get('/', (req, res) => {
    res.json("This is home page of API");
})


//login existing users
app.post('/login', (req, res, next) => {
    new_User.find({ username: req.body.username }, (err, user) => {
        if (err) {
            next("failed");
        }
        else {
            if (user.length == 0 || user[0]['password'] !== req.body.password) {
                next("failed");
            }
            else {
                res.json("success");
            }
        }
    });
    // res.json(req.body)
})

//Register and upload Photographer content
app.post('/uploadPhotography', upload.array('photos'), (req, res, next) => {
    try {
        let phot = new photography();
        phot.price = req.body.price
        phot.bedrooms = req.body.bedrooms
        phot.bathrooms = req.body.bathrooms
        phot.location = req.body.location
        for (let i = 0; i < req.files.length; i++) {
            phot.pictures.push(req.files[i]);
        }
        phot.save((err) => {
            if (err) {
                next("error uploading images");
            } else {
                res.json("Uploaded images successfully");
            }
        });
    } catch (err) {
        next(err);
    }

})



app.post('/UploadVideo', uploadvideo.array("myVideos"), (req, res, next) => {
    try {
        let vid = new video();
        vid.price = req.body.price
        vid.bedrooms = req.body.bedrooms
        vid.bathrooms = req.body.bathrooms
        vid.location = req.body.location
        for (let i = 0; i < req.files.length; i++) {
            vid.eteteVideo.push(req.files[i]);

            vid.save((err) => {
                if (err) {
                    next("error uploading video");
                } else {
                    res.json("Uploaded video successfully");
                }
            });
        }
    }
    catch (err) {
        next(err)
    }
})


//Get all photographers
app.get('/all_photographers', (req, res) => {
    photography.find({}, (err, photographers) => {
        if (err) {
            res.json("error");
        }
        else {
            res.json(photographers);
        }
    });

})


app.get('/all_videos', (req, res) => {
    photography.find({}, (err, videos) => {
        if (err) {
            res.json("error");
        }
        else {
            res.json(videos);
        }
    });

})

//=========== Error Handler ----------------------------
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
})
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });

})
//=============================================================

//Declare a variable for our port to transmit on
//Process.env is used by cloud service if API is in the cloud and 3500 will be used by our computer to transmit
// '||' means 'OR' in JS
const port = process.env.PORT || 3501;

//Make instance of app listen for calls/requests
app.listen(port, () => console.log(`Server running on port: ${port}`));

