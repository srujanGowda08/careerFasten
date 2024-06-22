import { User } from "../models/user.model.js"; 

const getUserFromDB = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    console.error("Error fetching user from DB", err);
    return null;
  }
};

export {
    getUserFromDB
}