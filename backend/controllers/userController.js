import userModel from '../models/User.js'

class userController{
    constructor()
    {

    }

    async getAll(req, res)
    {
        try {
            const data = await userModel.getAll();
            res.status(200).json(data);
        } catch(e) {
            res.status(500).send(e);
        }
    }

    async getOne(req, res)
    {
        try {
            const { id } = req.params;
            const data = await userModel.getOne(id);         
            res.status(201).json(data);
        } catch(e) {
            res.status(500).send(e);
        }
    }
}

export default new userController();