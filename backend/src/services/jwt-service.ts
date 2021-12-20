const jwt = require('jsonwebtoken')

export class JwtService {

    private tokenSecret: string = process.env.TOKEN_SECRET

    public static generateAccessToken (username: string) {
        return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '7200s' })
    }

}
