import JWT from "jsonwebtoken"

export const createJWT = (data,secret,options={
    expiresIn:"1y"
})=>{
    return JWT.sign(data,secret,options)
}

export const verifyJWT = (token,secret)=>{
    return JWT.verify(token,secret)
}