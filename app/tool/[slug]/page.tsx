import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/store';
import ToolLearningView from '@/components/tool-learning-view';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Perangkat Tidak Ditemukan | Smart Lab QR',
    };
  }

  return {
    title: `${tool.name} (${tool.code}) | Smart Lab QR`,
    description: tool.functionSummary || tool.description,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <ToolLearningView tool={tool} />;
}
