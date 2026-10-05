import { NextRequest, NextResponse } from 'next/server';
import { getTools, saveTool, deleteTool } from '@/lib/store';
import { ToolData } from '@/types/tool';

const COOKIE_NAME = 'smartlab_admin_session';

function checkAdminAuth(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME);
  return !!cookie?.value;
}

export async function GET() {
  const tools = await getTools();
  return NextResponse.json({ tools });
}

export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Akses ditolak. Silakan login sebagai admin.' }, { status: 401 });
  }

  try {
    const data: ToolData = await req.json();

    if (!data.name || !data.slug || !data.code) {
      return NextResponse.json(
        { error: 'Nama alat, kode alat, dan slug URL wajib diisi.' },
        { status: 400 }
      );
    }

    const saved = await saveTool(data);
    return NextResponse.json({ success: true, tool: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan data alat.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Akses ditolak. Silakan login sebagai admin.' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug alat tidak ditentukan.' }, { status: 400 });
  }

  const success = await deleteTool(slug);
  return NextResponse.json({ success });
}
