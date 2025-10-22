import { cookies } from 'next/headers';
import * as jose from 'jose';

interface UserPayload {
  userId: string;
  username: string;
  iat: number;
  exp: number;
}

export async function getSessionUser() {
  const token = cookies().get('token')?.value;
  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify<UserPayload>(token, secret);
    return { id: payload.userId, username: payload.username };
  } catch (error) {
    console.error('Failed to verify session token:', error);
    return null;
  }
}
