import { PrismaClient } from '@prisma/client';
import { INITIAL_TOOLS } from '../lib/initial-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai seeding data ke Supabase...');

  for (const tool of INITIAL_TOOLS) {
    const existing = await prisma.tool.findUnique({
      where: { slug: tool.slug },
    });

    if (existing) {
      console.log(`Tool ${tool.name} sudah ada, memperbarui...`);
      await prisma.tool.update({
        where: { slug: tool.slug },
        data: {
          name: tool.name,
          category: tool.category,
          code: tool.code,
          location: tool.location,
          imageUrl: tool.imageUrl,
          description: tool.description,
          functionSummary: tool.functionSummary,
          specs: tool.specs,
          videoUrl: tool.videoUrl,
          moduleSummary: tool.moduleSummary,
          moduleContent: tool.moduleContent,
        },
      });
    } else {
      console.log(`Membuat tool baru: ${tool.name}...`);
      await prisma.tool.create({
        data: {
          id: tool.id,
          slug: tool.slug,
          name: tool.name,
          category: tool.category,
          code: tool.code,
          location: tool.location,
          imageUrl: tool.imageUrl,
          description: tool.description,
          functionSummary: tool.functionSummary,
          specs: tool.specs,
          videoUrl: tool.videoUrl,
          moduleSummary: tool.moduleSummary,
          moduleContent: tool.moduleContent,
          steps: {
            create: tool.steps.map((s) => ({
              stepNumber: s.stepNumber,
              title: s.title,
              description: s.description,
              tip: s.tip,
            })),
          },
          practiceTasks: {
            create: tool.practiceTasks.map((p) => ({
              order: p.order,
              title: p.title,
              instruction: p.instruction,
              expectedResult: p.expectedResult,
            })),
          },
          quizzes: {
            create: tool.quizzes.map((q) => ({
              question: q.question,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
            })),
          },
          troubleshoots: {
            create: tool.troubleshoots.map((t) => ({
              problem: t.problem,
              symptom: t.symptom,
              solution: t.solution,
              preventive: t.preventive,
            })),
          },
          challenges: {
            create: tool.challenges.map((c) => ({
              title: c.title,
              level: c.level,
              description: c.description,
              criteria: c.criteria,
            })),
          },
        },
      });
    }
  }

  console.log('Seeding selesai dengan sukses!');
}

main()
  .catch((e) => {
    console.error('Error saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
