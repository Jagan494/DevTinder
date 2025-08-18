const express = require('express');
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');
const { auth } = require('../middlewares/auth');
const User = require('../models/user');

userRouter.get('/user/requests/received', auth, async (req, res) => {
    try {
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
    } catch (error) {
        console.log("error", error)
        res.status(400).send(error)
    }
})

userRouter.get('/user/connections', auth, async (req, res) => {
    try {
        console.log("Connection Request Received")
        const loggedInUser = req.user
        const receivedRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "interested" },
                { fromUserId: loggedInUser._id, status: "interested" }]
        }).populate(
            "fromUserId", "firstName lastName photoUrl age gender"
        )
        res
            .json({
                message: "Received requests",
                receivedRequests: receivedRequests.map((value) => value.fromUserId)
            })
    } catch (error) {
        console.log("error", error)
        res.status(400).send(error)
    }
})

userRouter.get('/user/feeds', async (req, res) => {
    const loggedInUser = req.user
    console.log("loggedIn User", loggedInUser)
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip =  (page-1) * limit
    const connectionRequests = await ConnectionRequest.find({
        $or: [{ fromUserId: loggedInUser._id},
            { toUserId: loggedInUser._id}]
    }).select('fromUserId toUserId')

    console.log("connectionRequests", connectionRequests)
    const hideUserIds = new Set();
    connectionRequests.forEach((value) => {
        hideUserIds.add(value.fromUserId.toString())
        hideUserIds.add(value.toUserId.toString())
    })

    console.log("hideUserIds", hideUserIds)

    const userFeeds = await User.find({
        $and: [
            { _id: { $nin: Array.from(hideUserIds) } },
            { _id: { $ne: loggedInUser._id } }
        ]
    }).populate('firstName lastName photoUrl age gender').skip(skip).limit(limit)
    res
        .json({
            message: "Received requests",
            receivedRequests: userFeeds
        })
})


module.exports = userRouter;