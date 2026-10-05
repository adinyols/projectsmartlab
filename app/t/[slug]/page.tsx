import { redirect } from 'next/navigation';

interface ShortQrProps {
  params: Promise<{ slug: string }>;
}

export default async function ShortQrPage({ params }: ShortQrProps) {
  const { slug } = await params;
  redirect(`/tool/${slug}`);
}
