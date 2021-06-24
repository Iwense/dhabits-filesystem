import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res , next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }
        const decodeData = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = decodeData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: 'Пользователь не авторизован'})
    }
} 