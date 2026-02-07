import bcrypt from 'bcrypt';

const saltRound = 10;

export const hashPassword = async (password: string): Promise<string> => {
    try {
        return await bcrypt.hash(password, saltRound);
    } catch (err) {
        const error: any = new Error('Error: hashing password');
        error.statusCode = 500;
        throw error;
    }
};

export const verifyPassword = async (password: string, hashed: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hashed);
    } catch (error) {
        return false;
    }
};
