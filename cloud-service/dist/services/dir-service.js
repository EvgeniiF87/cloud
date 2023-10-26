import fs from 'fs';
import path from 'path';
import { logger } from '../utils/loger.js';
export class DirService {
    createDir(pathDir) {
        return new Promise((resolve, reject) => {
            fs.mkdir(path.resolve(`./${pathDir}`), { recursive: true }, (error) => {
                if (error) {
                    logger.error(`${error}`);
                    reject(new Error('create dir error'));
                    return;
                }
                resolve(true);
            });
        });
    }
    removeDir(pathDir) {
        const checkDir = this.checkFileExists(pathDir);
        if (!checkDir) {
            throw new Error('Error to Dir no exsist');
        }
        return new Promise((resolve, reject) => {
            fs.rmdir(path.resolve(`./${pathDir}`), (error) => {
                if (error) {
                    logger.error(`${error}`);
                    reject(true);
                }
            });
            resolve(true);
        });
    }
    checkFileExists(filePath) {
        return fs.existsSync(filePath);
    }
}
