import { prisma } from '../src/lib/prisma';
import { hashPassword } from '../src/utils/hash.util';

async function main() {
    // Seed User
    await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            name: 'ADMIN',
            isAdmin: true,
            basicAuth: {
                create: {
                    passwordHash: await hashPassword('admin'),
                },
            },
        },
    });
}

main()
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
