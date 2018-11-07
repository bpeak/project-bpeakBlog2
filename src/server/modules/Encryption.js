import * as crypto from 'crypto'
import { encryptionConfig } from '~configs/secret/secret.config'

class Encryption {
    static getPwSet (password){
        const salt = this.getSalt()
        const hash = this.getHash(password, salt)
        return { salt, hash }
    }

    static getSalt = () => {
        return crypto.randomBytes(encryptionConfig.byteSize).toString('base64')
    }

    static getHash = (password, salt) => {
        return crypto.pbkdf2Sync(password, salt, encryptionConfig.iiterations, encryptionConfig.keyLen, 'sha512').toString('base64')
    }
    
}

export default Encryption
