import {Request, Response} from "express";
import User from "../models/user";

const createCurrentUser = async (request: Request, response: Response) => {
  try {
    const {auth0Id} = request.body;
    const userExists = await User.findOne({ auth0Id});

    if (userExists) {
     return response.status(200).send();
    }

    const userCreated = await User.create(request.body);
    return response.status(201).json(userCreated.toObject());
  } catch (error: any) {
    return response.status(500).json({ error: error.message });
  }
};

const updateCurrentUser = async (request: Request, response: Response) => {
  const { userId } = request;

  try{
  const user = await User.findById(userId);

  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }

  user.set(request.body);
  await user.save();
  response.status(200).json(user.toObject());
  }catch(error: any) {
    return response.status(500).json({error: error.message});
  }
}

const getCurrentUser = async (request: Request, response: Response) => {
  try{
    const currentUser = await User.findById(request.userId);
    if(!currentUser){
      return response.status(404).json({error: "User not found"});
    }
    return response.status(200).json(currentUser.toObject());
  }catch(error: any){
    return response.status(500).json({error: error.message});
  }
}

export default { createCurrentUser, updateCurrentUser, getCurrentUser};
