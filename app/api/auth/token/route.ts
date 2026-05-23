import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: 'AUTH_SECRET is not configured' },
      { status: 500 },
    );
  }

  const accessToken = await getToken({
    req,
    secret,
    raw: true,
    salt: 'authjs.session-token',
  });

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ accessToken });
}
