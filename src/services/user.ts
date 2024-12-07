// user.service.ts

import User from "src/models/user.model";
import { IUserData } from "src/types/product.type";


export const getUserByEmail = async (email: string) => {
  const res = await User.findOne({ where: { email } });
  if (!res) throw new Error("User is not existed")
  return res
};

export const createUser = async (user: Omit<IUserData, "id">): Promise<string> => {
  try {
    const newUser = await User.create(user)
    if (newUser) {
      return 'Created successfully'
    }
    return 'Create failed'
  }
  catch (err: any) {
    return 'Something went wrong'
  }
};

