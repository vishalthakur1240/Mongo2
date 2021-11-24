const express = require('express');

const connectDB = require('./conn');
const peopleModel = require('./schema');

const app = express();
const port = 3000;

app.use(express.json()); // use to understand JSON

app.get('/', (req, res) => {
    res.send('hello');
})

app.get("/people", async (req, res) => {
    try {
        const getAll = await peopleModel.find();
        return res.status(201).send(getAll);
    } catch (error) {
        console.log("Error => ", error);
        return res.status(400).json({ message: "no users found" });
    }    
})

app.post("/people", async (req, res) => {
    try {
        const user =  new peopleModel(req.body);
        const createUser = await user.save();
        return res.status(201).send(createUser);
    } catch (error) {
        console.log("Error => ", error);
        return res.status(400).json({ message: "user Not Created" });
    }    
})

app.get("/people/:id", async (req, res) => {
    try {
        const _id =  req.params.id;
        const findUser = await peopleModel.findById(_id);
        return res.status(201).send(findUser);
    } catch (error) {
        console.log("Error => ", error);
        return res.status(400).json({ message: "invalid ID" });
    }    
})

app.patch("/people/:id", async (req, res) => {
    try {
        const _id =  req.params.id;
        const updateUser = await peopleModel.findByIdAndUpdate(_id, req.body, {new: true});
        return res.status(201).send(updateUser);
    } catch (error) {
        console.log("Error => ", error);
        return res.status(400).json({ message: "invalid" });
    }    
})

app.delete("/peopleDelete/:id", async (req, res) => {
    try {
        const _id =  req.params.id;
        const deleteUser = await peopleModel.findByIdAndDelete(_id);
        if(!_id){
            return res.status(400).send();
        }
        return res.status(201).send(deleteUser);
    } catch (error) {
        console.log("Error => ", error);
        return res.status(500).json({ message: "not deleted" });
    }    
})

app.listen(port, () =>
    connectDB()
        .then((data) => console.log(`Listeningggggggggggggg to the port no: ${port} and Database connected.`))
        .catch((error) => console.log(error))
);