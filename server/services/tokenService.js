import jwt from 'jsonwebtoken'
import TokenModel from '../models/TokenModel.js'

class TokenService {
    generateTokens (id, username) {
        const payload = {
            id,
            username,
        }
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_JWT_TOKEN,{expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_JWT_TOKEN,{expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await TokenModel.findOne({user: userId})
        if (tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save();
        }
        const token = await TokenModel.create({user: userId, refreshToken})
        return token
    }
}

export default new TokenService();