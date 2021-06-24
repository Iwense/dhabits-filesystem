import bcrypt from 'bcrypt'
import TokenService from '../services/tokenService.js'
import User from '../models/UserModel.js'

class UserService {
    async regestration (username, password){
        const condidate = await User.findOne({username})
        if(condidate){
            throw Error (`Пользователь с таким логином: ${username}, уже существует`)
        }
        const hashPassword = bcrypt.hashSync(password, 5)
        const user = await User.create({username, password: hashPassword})
        
        const tokens = TokenService.generateTokens(user._id, user.username)
        await TokenService.saveToken(user._id, tokens.refreshToken)

        return { ...tokens, user: user.username}
    }

    async login(username, password){

        const user = await User.findOne({username})
        if(!user){
            throw Error ( `Пользователь ${username} не найден`)
        }
        const vaildPassword = bcrypt.compareSync(password, user.password)
        if(!vaildPassword){
            throw Error ("Введён не верный пароль")
        }
        const tokens = TokenService.generateTokens(user._id, user.username)
        await TokenService.saveToken(user._id, tokens.refreshToken)

        return { ...tokens, user: user.username}

    }
}

export default new UserService();