// message controller
// (c) 2017 Micha Hanselmann

"use strict"

// imports
const Message = require("../models/messageModel")
const User = require("../models/userModel")

// get all route
exports.all = (req, res) => {
    Message.find({}, (error, message) => {
        if (error)
            return res.send(error)
        res.status(200).json(message)
    })
}

// send route
exports.send = (req, res) => {
    const recipientId = req.body.recipient

    // check missing input
    if (!recipientId)
        return res.status(400).send({ "error": "Missing recipient." })

    // check recipient
    User.findById(recipientId, (error, recipient) => {
        if (error)
            return res.status(400).send({ "error": "Unknown recipient." })

        // create message
        let message = new Message({
            recipient: recipientId,
            sender: req.user._id,
            message: req.body.message
        })
        message.save((error, message) => {
            if (error)
                return res.send(error)
            res.status(201).json(message)
        })
    })
}
