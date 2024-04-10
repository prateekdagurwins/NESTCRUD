import * as bcrypt from 'bcrypt';
import { userLoginDto } from 'src/users/user.dto';

export const setPassword = async (newPassword: String): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(newPassword, saltRounds);
};

export const comparePassword = async (inputPassword: String, password: String ): Promise<boolean> => {
    console.log(inputPassword, password, "kkkkkkkkkkkkkkkkkk");
  return bcrypt.compare(inputPassword, password);
};