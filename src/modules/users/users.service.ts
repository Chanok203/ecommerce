import { prisma } from '../../lib/prisma';
import { hashPassword, verifyPassword } from '../../utils/hash.util';

export class UserService {
    public async findOne(id: string, include_auth: boolean = false) {
        const user = await prisma.user.findUnique({
            where: { id: id },
            include: {
                basicAuth: include_auth,
            },
        });

        if (!user || user.isDeleted) {
            const error: any = new Error(`User not found`);
            error.statusCode = 404;
            throw error;
        }

        return user;
    }

    public async update(id: string, data: any) {
        try {
            const user = await prisma.user.update({
                where: { id: id },
                data: data,
            });
            return user;
        } catch (e: any) {
            if (e.code === 'P2025') {
                const error: any = new Error(`User not found`);
                error.statusCode = 404;
                throw error;
            }

            throw e;
        }
    }

    public async changePassword(id: string, currentPassword: string, newPassword: string, newPassword2: string) {
        // newPassword != newPassword2
        if (newPassword !== newPassword2) {
            const error: any = new Error(`Password and Comfirm Password must be the same`);
            error.statusCode = 400;
            throw error;
        }

        // currentPassword ผิด
        const user = await this.findOne(id, true);
        const isMatch = await verifyPassword(currentPassword, user.basicAuth!.passwordHash);
        if (!isMatch) {
            const error: any = new Error(`Invalid password`);
            error.statusCode = 401;
            throw error;
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                basicAuth: {
                    update: { passwordHash: await hashPassword(newPassword) },
                },
            },
        });
        return updatedUser;
    }

    public async delete(id: string) {
        const timestamp = Date.now();

        await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({ where: { id: id } });
            if (!user) {
                const error: any = new Error('User not found');
                error.statusCode = 404;
                throw error;
            }

            await tx.user.update({
                where: {id: id},
                data: {
                    isDeleted: true,
                    username: `deleted__${timestamp}__${user.username}`
                }
            })
        });
    }
}
