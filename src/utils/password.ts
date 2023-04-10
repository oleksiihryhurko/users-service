import bcrypt from 'bcryptjs'

const encryptPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);;
}

const validatePassword = async (password: string, encryptedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, encryptedPassword);
}

export { encryptPassword, validatePassword }