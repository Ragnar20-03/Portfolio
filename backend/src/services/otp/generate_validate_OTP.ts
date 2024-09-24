import crypto from "crypto"

export const generateOTP = () => {
    return crypto.randomBytes(3).toString('hex')
}

for (let i = 0; i < 5; i++) {
    console.log(i, " : ", generateOTP());
}