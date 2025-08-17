const express = require('express');
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');
const {auth} = require('../middlewares/auth');

userRouter.get('/user/requests/received', auth, async(req, res) => {
    try{
        console.log("Connection Request Received")
        const loggedInUser = req.user
        const receivedRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate(
            "fromUserId", "firstName lastName photoUrl age gender"
        )
        res
        .json({
            message: "Received requests",
            receivedRequests: receivedRequests.map((value) => value.fromUserId)
        })
    }catch(error){
        console.log("error", error)
        res.status(400).send(error)
    }
})

userRouter.get('/user/connections', auth, async(req, res) => {
    try{
        console.log("Connection Request Received")
        const loggedInUser = req.user
        const receivedRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "accepted"
        }).populate(
            "fromUserId", "firstName lastName photoUrl age gender"
        )
        res
        .json({
            message: "Received requests",
            receivedRequests: receivedRequests.map((value) => value.fromUserId)
        })
    }catch(error){
        console.log("error", error)
        res.status(400).send(error)
    }
})
module.exports = userRouter;