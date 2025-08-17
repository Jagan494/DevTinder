const express = require("express");
const connectionRequestRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const { auth } = require('../middlewares/auth');
const mongoose = require("mongoose");
// Middleware to authenticate user

connectionRequestRouter.use(auth)
connectionRequestRouter.post('/connection-request/send/:toUserId/:status', auth, async (req, res) => {
    try {
        console.log("***************Connection Request Router*****************", req.user)
        const fromUserId = req.user._id; // Get user ID from authenticated request
        const objectId = req.params.toUserId
        const toUserId = new mongoose.Types.ObjectId(objectId);
        const status = req.params.status;

        console.log("touser", toUserId, fromUserId, status)
        let isValidUserIds = false;
        let isStatusValid = false;
        allowedStatuses = ['ignored', 'interested'];
        
        isStatusValid = allowedStatuses.includes(status);
        if (!isStatusValid) {
            return res.status(400).send("Invalid status provided");
        }

        isValidUserIds =  await User.find({ _id: toUserId });
        if (!isValidUserIds) {
            return res.status(400).send("Invalid user IDs provided");
        }
        //validations before sending the request
        //check if the the user is sending request to the same user
        if (fromUserId.equals(toUserId)) {
            return res.status(400).send("You cannot send a connection request to yourself");
        }
        //check if the the user is already connected
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });
        if (existingRequest) {
            return res.status(400).send("Connection request already exists");
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status: req.params.status // 'pending', 'accepted', or 'rejected'
        });

        const savedRequest = await connectionRequest.save();
        console.log("Connection request sent successfully:", savedRequest);
        res.status(201).send("Connection request sent successfully");
    } catch (error) {
        console.error("Error sending connection request:", error);
        res.status(500).send("Error sending connection request: " + error.message);
    }
})

connectionRequestRouter.post('/connection-request/review/:requestId/:status', auth, async (req, res) => {
    // review the request
    // requestid, loggedin user and status

    const requestId = req.params.requestId;
    const status = req.params.status;
    const loggedInUserId = req.user._id;
    const allowedStatuses = ['accepted', 'rejected'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).send("Invalid status provided");
    }
    try{
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUserId,
            status: "interested"
        });
        if (!connectionRequest) {
            return res.status(400).send("Invalid request ID provided");
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({
            message: "Connection request reviewed successfully",
            data: data
        })
    }catch(error){
        res.status(500).send("Error reviewing connection request: " + error.message);
    }
})

module.exports = connectionRequestRouter;