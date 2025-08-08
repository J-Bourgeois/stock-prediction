import "server-only";
import { SignJWT, jwtVerify } from "jose";

// Github Copilot was used to help create Server-Side validation for JWTs

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7 days from now")
    .sign(secret);
}

export async function verifyJwt(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}
