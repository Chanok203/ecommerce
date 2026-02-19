import { prisma } from '../../lib/prisma';
import { hashPassword, verifyPassword } from '../../utils/hash.util';

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

export const register = async (name: string, avatarPath: string, username: string, password: string, password2: string) => {
    if (password !== password2) {
        const error: any = new Error(`Password and Comfirm Password must be the same`);
        error.statusCode = 400;
        throw error;
    }

    const dupUser = await prisma.user.findUnique({
        where: { username: username },
    });

    if (dupUser) {
        const error: any = new Error(`Username already exists`);
        error.statusCode = 400;
        throw error;
    }

    const user = await prisma.user.create({
        data: {
            username: username,
            name: name,
            avatar: avatarPath,
            basicAuth: {
                create: {
                    passwordHash: await hashPassword(password),
                },
            },
        },
    });
    return user;
};
