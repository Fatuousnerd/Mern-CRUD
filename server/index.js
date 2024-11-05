const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://calvinkmwaura:Fatuous_1764@cluster0.htwpufj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.get("/getUser/:id", (req, res) => {
    const id = req.params.id
    UserModel.findById({ _id: id })
        .then(users => {
            res.json(users)
            console.log(users)
        })
        .catch(err => res.json(err))
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, email: req.body.email, age: req.body.age })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete({ _id: id })
        .then(res => res.json(res))
        .catch(err => res.json(err))
})

// Corrected route to '/create'
app.post("/create", (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));
});

app.listen(3001, () => {
    console.log("Server Is Running!!");
});
