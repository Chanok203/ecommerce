import { Topup } from '../../generated/prisma/client';
import { prisma } from '../../lib/prisma';

export class TopupService {
    /**
     *
     * @param ownerId id ของ user ที่จะเติมเงิน
     * @param price จำนวนเงินที่จะเติม
     * @param image path ของรูปหลักฐานการเติมเงิน
     */
    public async create(ownerId: string, price: number, image: string): Promise<Topup> {
        const topup = await prisma.topup.create({
            data: {
                ownerId,
                price,
                image,
            },
        });
        return topup;
    }

    // Read, List
    public async findAll(ownerId?: string) {
        const topupList = await prisma.topup.findMany({
            where: ownerId ? { ownerId } : {},
            orderBy: { createdAt: 'desc' },
        });
        return topupList.map((item) => {
            return {
                ...item,
                createdAt: item.createdAt.toLocaleString('en-EN', {
                    timeZone: 'Asia/Bangkok',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                }),
            };
        });
    }

    // Update (Admin Approve/Reject)
    // Delete (X)
}
