const userProvider = require("../Repository/UserProvider");

exports.create = async (req, res, next) => {
    const { nickName } = req.body;
    try {
        const params = {
            nickName,
        };
        const response = await userProvider.create(params);

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};