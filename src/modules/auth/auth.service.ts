import { prisma } from '../../lib/prisma';
import { verifyPassword } from '../../utils/hash.util';

export const login = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { username: username },
        include: {
            basicAuth: true,
        },
    });

    if (!user || user.isDeleted || !user.basicAuth) {
        const error: any = new Error(`Invalid username or password`);
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await verifyPassword(password, user.basicAuth.passwordHash);
    if (!isMatch) {
        const error: any = new Error(`Invalid username or password`);
        error.statusCode = 401;
        throw error;
    }
    return {
        id: user.id,
        username: username,
        isAdmin: user.isAdmin,
    };
};

// TODO: register
