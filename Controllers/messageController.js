const constants = require('../Utils/constants.js');
const messageProvider = require("../Repository/messageProvider");

exports.create = async (req, res, next) => {
    const { message, nickName, recipientNickName } = req.body;
    try {

        const params = {
            message,
            nickName,
            recipientNickName
        };
        
        const response = await messageProvider.create(params);
        
        if (response.status === constants.STATUSES.OK) {
            return res.status(200).json(response);
        } else {
            return res.status(500).json(response);
        }
        
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};
