import User from "src/models/user.model";
import bcrypt from "bcrypt"
import { generateToken } from "@utils/auth";
import { IUserData } from "src/types/product.type";

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User is not existed')
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials')
  }
  const token = generateToken(user);

  return token
}

export const register = async (dataUser: IUserData) => {
  const existingUser = await User.findOne({ where: { email: dataUser.email } });
  if (existingUser) {
    throw new Error('User is existed!')
  }

  const encryptPass = await bcrypt.hash(dataUser.password, 10)

  // Create a new user
  const newUser = await User.create({ ...dataUser, password: encryptPass });

  // Generate a JWT token for the newly created user
  const token = generateToken(newUser);
  return token
}