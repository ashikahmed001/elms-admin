'use strict';

module.exports.validate = (req, res, next) => {

    const leave = req.body;

    if(!leave){
        next("Leave object is missing");
    }
    if(!leave.FromDTTM || !leave.ToDTTM){
        next("FromDTTM or ToDTTM of leave object is missing");
    }
    if(!leave.Comments){
        next("Comments of leave object is missing");
    }
    if(!leave.Owner || !leave.Owner.Name || !leave.Owner.Email){
        next("Owner details in leave object is missing");
    }
    if(!leave.Owner.Manager || !leave.Owner.Manager.Name || !leave.Owner.Manager.Email){
        next("Manager details in leave owner object is missing");
    }
    next();
}

module.exports.requested = (req, res, next) => {

    const leave = req.body;

    req.params.mailOptions = {
        from: process.env.GMAIL_ID,
        to: leave.Owner.Manager.Email,
        cc: leave.Owner.Email,
        subject: 'LMS - New Leave Request',
        html: '<p>Your html here</p>'
    };

    next();
}

module.exports.approved = (req, res, next) => {

    const leave = req.body;

    req.params.mailOptions = {
        from: process.env.GMAIL_ID,
        to: leave.Owner.Email,
        cc: leave.Owner.Manager.Email,
        subject: 'LMS - Leave Request Approved',
        html: '<p>Your html here</p>'
    };

    next();
}

module.exports.declined = (req, res, next) => {

    const leave = req.body;

    req.params.mailOptions = {
        from: process.env.GMAIL_ID,
        to: leave.Owner.Email,
        cc: leave.Owner.Manager.Email,
        subject: 'LMS - Leave Request Declined',
        html: '<p>Your html here</p>'
    };

    next();
}

module.exports.canceled = (req, res, next) => {

    const leave = req.body;

    req.params.mailOptions = {
        from: process.env.GMAIL_ID,
        to: leave.Owner.Manager.Email,
        cc: leave.Owner.Email,
        subject: 'LMS - Leave Request Cancelled',
        html: '<p>Your html here</p>'
    };

    next();
    
}