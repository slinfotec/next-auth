import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    console.log(secret_key + "-- secret key")
    const decoded = jwt.verify(token, secret_key!);
    console.log(decoded + " -- decode key")
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error + "-- error secret");
    return null;
  }
}
