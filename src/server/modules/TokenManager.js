import jwt from 'jsonwebtoken'
import { jwtConfig } from '~configs/secret/secret.config'

export default class TokenManager {
    static issue (unique_id) {
        const token = jwt.sign(
            {
                user : {
                    unique_id
                }
            },
            jwtConfig.secret,
            jwtConfig.options
        )
        return token
    }
}