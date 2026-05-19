import * as bcrypt from 'bcrypt';
import envConfig from 'src/config/env.config';

export async function hashData(password: string) {
  return bcrypt.hash(password, envConfig().bcrypt.saltRounds);
}

export async function compareHashedData(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
