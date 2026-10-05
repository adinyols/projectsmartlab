import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminKey } from '@/lib/store';

const COOKIE_NAME = 'smartlab_admin_session';

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json();

    if (!passcode || !verifyAdminKey(passcode)) {
      return NextResponse.json(
        { error: 'Kata sandi admin tidak valid.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true, message: 'Login berhasil.' });
    
    // Simpan cookie sesi admin (valid 7 hari)
    response.cookies.set({
      name: COOKIE_NAME,
      value: 'authenticated_' + Buffer.from(passcode).toString('base64'),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Auth POST error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan sistem: ' + String(error) }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logout berhasil.' });
  response.cookies.delete(COOKIE_NAME);
  return response;
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME);
  const isAuthenticated = !!cookie?.value;
  return NextResponse.json({ authenticated: isAuthenticated });
}
