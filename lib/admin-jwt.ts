import { SignJWT, jwtVerify } from "jose"

const COOKIE_NAME = "admin_token"

function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

export function getAdminCookieName() {
  return COOKIE_NAME
}

export async function signAdminJwt() {
  const secret = requireEnv("JWT_SECRET")
  const ttl = Number(process.env.ADMIN_JWT_TTL_SECONDS ?? "86400")
  const key = new TextEncoder().encode(secret)

  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("admin")
    .setIssuedAt()
    .setExpirationTime(`${ttl}s`)
    .sign(key)
}

export async function verifyAdminJwt(token: string) {
  const secret = requireEnv("JWT_SECRET")
  const key = new TextEncoder().encode(secret)
  const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] })
  if (payload.sub !== "admin") throw new Error("Invalid subject")
  if ((payload as any).role !== "admin") throw new Error("Invalid role")
  return payload
}

