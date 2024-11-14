const userProvider = require("../Repository/UserProvider");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const constants = require('../Utils/constants.js');

exports.login = async (req, res) => {
    try {
        const { nickName, password } = req.body;    
        const user = await userProvider.findUserByNickName(nickName);  
        
        if (!user)
            return res.status(401).json({ msg: 'Username does not exist.' });        

        const isMatch = await bcrypt.compare(password, user.userPassword);  
        if (!isMatch)
            return res.status(401).json({ msg: 'Invalid password' });

        const payload = {  
            userId: user.id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); 

        res.cookie('access_token', token, { httpOnly: true });   
        return res.status(200).json({ msg: 'Login successful', status: 'OK'});
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

exports.create = async (req, res, next) => {
    
    try {

        const { nickName, password } = req.body;  //Extrae el nickName y del cuerpo de la solicitud
        const hashedPassword = bcrypt.hashSync(password, constants.SALT_ROUNDS.TEST);
        console.log(hashedPassword);
        const params = {
            nickName,
            password: hashedPassword              //Crea un objeto params con el nickName extraído
        };          

        const response = await userProvider.create(params); //Llama al método create del userProvider y espera su resultado
        return res.status(200).json(response); //Si la operación es exitosa, devuelve una respuesta con estado 200 y el resultado en formato JSON
        
    } catch (error) {
        return res.status(500).json({
            msg: error.message,     //Si ocurre un error, captura el error y devuelve una respuesta con estado 500 y el mensaje del error
        });
    }
};