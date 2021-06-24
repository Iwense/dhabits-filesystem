import User from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import TokenService from '../services/tokenService.js'
import UserService from '../services/userService.js'

const cookieMaxAge = 30*24*60*60*1000 

export const registration = async (req, res) => {
    try {
       const {username, password} = req.body
       const userData = await UserService.regestration(username, password)
       res.cookie('refreshToken', userData.refreshToken, {maxAge:cookieMaxAge, httpOnly: true })
       
       return res.json(userData)
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Registration error'})
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const userData = await UserService.login(username, password)
        res.cookie('refreshToken', userData.login, {maxAge:cookieMaxAge, httpOnly: true })
        return res.json(userData)
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Login error'})
    }
}

export const logout = async (req, res) => {
    try {
        //TODO : Logout
        const {username ,token} = req.body
        const user = await User.findOne({username})
        if(!user){
            res.status(400).json({message: `Пользователь ${username} не найден`})
        }
        res.status(200).json({token})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Logout error'})
    }
}

export const refresh = async (req, res) => {
    try {
        //TODO : refresh token
        const {username ,token} = req.body
        const user = await User.findOne({username})
        if(!user){
            res.status(400).json({message: `Пользователь ${username} не найден`})
        }
        res.status(200).json({token})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Logout error'})
    }
}