import jwt from "jsonwebtoken"
import { JWT_SECRETE } from "../config"


export function createToken(payload: any) {
    let token = jwt.sign(payload, JWT_SECRETE)
    return token

}

