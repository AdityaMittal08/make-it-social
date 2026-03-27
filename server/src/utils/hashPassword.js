const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


const hashPassword = async (plainPassword) => {
  if (!plainPassword || typeof plainPassword !== 'string') {
    throw new Error('Password must be a non-empty string');
  }
 
  const hashed = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hashed;
};

const comparePassword = async (plainPassword, hashedPassword) => {
  if(!plainPassword || typeof plainPassword !== 'string'){
    throw new Error('Plain password must be a non-empty string')
  }

  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}

module.exports = { hashPassword, comparePassword }