import { mkdirSync } from 'fs';
import multer, { Options } from 'multer';
import path from 'path';

const uploadPath = 'uploads/topup';
mkdirSync(uploadPath, { recursive: true });

const fileFilter: Options['fileFilter'] = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        const error: any = new Error('Only image files allowed');
        error.statsCode = 400;
        cb(error);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = crypto.randomUUID() + ext;
        cb(null, filename)
    }
});

export const topupUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024,
    }
});