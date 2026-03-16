import crypto from "crypto"

function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

export function verifyAdminPassword(password: string): boolean {
  const encoded = requireEnv("ADMIN_PASSWORD_HASH")
  const [saltB64, hashB64] = encoded.split(":")
  if (!saltB64 || !hashB64) return false

  const salt = Buffer.from(saltB64, "base64")
  const expected = Buffer.from(hashB64, "base64")
  const actual = crypto.scryptSync(password, salt, expected.length)
  if (actual.length !== expected.length) return false
  return crypto.timingSafeEqual(actual, expected)
}

