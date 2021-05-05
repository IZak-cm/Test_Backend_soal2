// console.log('Hellooooo!')

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mgi_ilham', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// model
const userSchema = mongoose.Schema({
    nama: {type: String},
    hobi: {type: String},
    alamat: {type: String},
    nomor_telp: {type: Number}
  });
  const userModel = mongoose.model('users', userSchema);

app.get('/', (req, res) => {
    res.send(' Welcome to UM App!')
})

app.post('/add', (req, res) => {
    const newUser = new userModel({
        nama: req.body.nama,
        hobi: req.body.hobi,
        alamat: req.body.alamat,
        nomor_telp: req.body.nomor_telp
    });
    const result = newUser.save();

    res.send({
        status: 200,
        message: "add new user completed",
        data: result
    })
})

app.get("/all", async (req, res) => {
    const all = await userModel.find();

    res.send({
        status: 200,
        message: "success get all users",
        data: all
    })
})

app.get("/getuser", async (req, res)=> {
    const findUser = await userModel.findOne({id: req.params.id})

    res.send({
        status: 200,
        message: "success get a user",
        data: findUser
    })
})

app.put("/update", async (req, res) => {
    const updatedUser = await userModel.findOneAndUpdate(
        {id: req.params.id},
        {nama: req.body.nama},
        {hobi: req.body.hobi},
        {alamat: req.body.alamat},
        {nomor_telp: req.body.nomor_telp},
        {new: true}
        );
    

    res.send({
        status: 200,
        message: "success update user",
        data: updatedUser
    })
})