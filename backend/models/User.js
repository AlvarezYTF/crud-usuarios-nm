import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";

class userModel
{
    async getAll()
    {
        const colaprendices = dbClient.db.collection ("crud_usuarios");
        return await colaprendices.find({}).toArray();
    }

    async getOne(id)
    {
        const colaprendices = dbClient.db.collection ("crud_usuarios");
        return await colaprendices.findOne({_id: new ObjectId(id)});
    }
}

export default new userModel();