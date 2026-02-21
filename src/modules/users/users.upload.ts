import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import multer, { Options } from 'multer';
import path from 'path';
import sharp from 'sharp';

const uploadPath = 'uploads/avatars';
const uploadPath32x32 = path.join(uploadPath, '32x32');
const uploadPath256x256 = path.join(uploadPath, '256x256');

const paths = [uploadPath, uploadPath32x32, uploadPath256x256];

for (const dir of paths) {
    fs.mkdirSync(dir, { recursive: true });
}

const fileFilter: Options['fileFilter'] = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        const error: any = new Error('Only image files allowed');
        error.statsCode = 400;
        cb(error);
    }
};

export const avatarUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
});

export const resizeAvatar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return next();
        }

        const ext = '.png';
        const filename = crypto.randomUUID() + ext;
        const filepath32x32 = path.join(uploadPath32x32, filename);
        const filepath256x256 = path.join(uploadPath256x256, filename);

        await sharp(req.file.buffer).resize(32, 32).png().toFile(filepath32x32);
        await sharp(req.file.buffer).resize(256, 256).png().toFile(filepath256x256);

        res.locals.avatarPath = filename;
        next();
    } catch (error) {
        next(error);
    }
};
