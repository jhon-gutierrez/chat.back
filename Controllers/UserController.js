const userProvider = require("../Repository/UserProvider");

exports.create = async (req, res, next) => {

    const { nickName } = req.body;  //Extrae el nickName del cuerpo de la solicitud
    
    try {

        const params = {
            nickName,              //Crea un objeto params con el nickName extraído
        };          

        const response = await userProvider.create(params); //Llama al método create del userProvider y espera su resultado
        return res.status(200).json(response); //Si la operación es exitosa, devuelve una respuesta con estado 200 y el resultado en formato JSON
        
    } catch (error) {
        return res.status(500).json({
            msg: error.message,     //Si ocurre un error, captura el error y devuelve una respuesta con estado 500 y el mensaje del error
        });
    }
};