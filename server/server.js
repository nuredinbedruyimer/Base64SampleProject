import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import profileModel from './Models/profileModel.js';
import cors from 'cors';
const app = express();
dotenv.config();

const PORT = process.env.PORT;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
// getting user
app.get('/', async (req, res) => {
    try {
        const user = await profileModel.findOne({});
        if (!user) { 
            return res.status(404).send({
                success: false,
                message:"No user and Photo Found "
            })
        }
        res.status(200).send({
            success: true,
            message: "Photo Access Success Fully",
            user: {
                name: user.name,
                photo:user.photo
            }
        })
        
    } catch (error) {
        
    }
    
    
});
    
    // upload Route
app.post('/upload', async (req, res) => {
        try {
            const { name, photo } = req.body;
            
            
            const user = await new profileModel({
                name: name,
                photo: photo
            
            }).save();
            res.status(201).send({
                success: true,
                message: "Photo Upload Successfully",
                user
            });
        
        } catch (error) {
            console.log(req.body)
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error In Photo Uploading"
            })
        
        }
    })
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.MODE} Mode on Port ${PORT}`)
})