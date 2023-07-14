import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(passord) {
        const salt = randomBytes(8).toString('hex');

        const buf = await scryptAsync(passord, salt, 64);

        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword, suppliedPassowrd) {
        const [hashedPassword, salt] = storedPassword.split('.');

        const buf = await scryptAsync(suppliedPassowrd, salt, 64);

        return buf.toString('hex') === hashedPassword;
    }
}