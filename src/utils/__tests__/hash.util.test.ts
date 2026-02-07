import { hashPassword, verifyPassword } from '../hash.util';

describe('hashPassword / verifyPassword', () => {
    const password = 'ABC123_-$';

    it('hashPassword', async () => {
        const hashed = await hashPassword(password);

        expect(typeof hashed).toBe('string');
        expect(hashed).not.toBe(password);
        expect(hashed.length).toBeGreaterThan(20);
    });

    it('verifyPassword: Correct', async () => {
        const hashed = await hashPassword(password);
        const result = await verifyPassword(password, hashed);
        expect(result).toBe(true);
    });

    it('verifyPassword: Wrong', async () => {
        const hashed = await hashPassword(password);
        const result = await verifyPassword('fgh4567', hashed);
        expect(result).toBe(false);
    });
});
