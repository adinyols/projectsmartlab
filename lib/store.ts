import { ToolData } from '@/types/tool';
import { INITIAL_TOOLS } from './initial-data';
import { prisma } from './prisma';

export async function getTools(): Promise<ToolData[]> {
  try {
    const dbTools = await prisma.tool.findMany({
      include: {
        steps: { orderBy: { stepNumber: 'asc' } },
        practiceTasks: { orderBy: { order: 'asc' } },
        quizzes: true,
        troubleshoots: true,
        challenges: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    if (dbTools && dbTools.length > 0) {
      return dbTools.map((t) => ({
        ...t,
        imageUrl: t.imageUrl || undefined,
        videoUrl: t.videoUrl || undefined,
        moduleSummary: t.moduleSummary || undefined,
        moduleContent: t.moduleContent || undefined,
        steps: t.steps.map((s) => ({
          ...s,
          tip: s.tip || undefined,
        })),
        practiceTasks: t.practiceTasks.map((p) => ({
          ...p,
          expectedResult: p.expectedResult || undefined,
        })),
        quizzes: t.quizzes.map((q) => ({
          ...q,
          explanation: q.explanation || undefined,
        })),
        troubleshoots: t.troubleshoots.map((tb) => ({
          ...tb,
          symptom: tb.symptom || undefined,
          preventive: tb.preventive || undefined,
        })),
        challenges: t.challenges.map((c) => ({
          ...c,
          level: c.level as 'Pemula' | 'Menengah' | 'Mahir',
        })),
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
      }));
    }
  } catch (error) {
    console.error('Error fetching tools from Prisma/Supabase, using fallback:', error);
  }

  return INITIAL_TOOLS;
}

export async function getToolBySlug(slug: string): Promise<ToolData | null> {
  try {
    const t = await prisma.tool.findFirst({
      where: {
        OR: [{ slug: slug }, { id: slug }],
      },
      include: {
        steps: { orderBy: { stepNumber: 'asc' } },
        practiceTasks: { orderBy: { order: 'asc' } },
        quizzes: true,
        troubleshoots: true,
        challenges: true,
      },
    });

    if (t) {
      return {
        ...t,
        imageUrl: t.imageUrl || undefined,
        videoUrl: t.videoUrl || undefined,
        moduleSummary: t.moduleSummary || undefined,
        moduleContent: t.moduleContent || undefined,
        steps: t.steps.map((s) => ({
          ...s,
          tip: s.tip || undefined,
        })),
        practiceTasks: t.practiceTasks.map((p) => ({
          ...p,
          expectedResult: p.expectedResult || undefined,
        })),
        quizzes: t.quizzes.map((q) => ({
          ...q,
          explanation: q.explanation || undefined,
        })),
        troubleshoots: t.troubleshoots.map((tb) => ({
          ...tb,
          symptom: tb.symptom || undefined,
          preventive: tb.preventive || undefined,
        })),
        challenges: t.challenges.map((c) => ({
          ...c,
          level: c.level as 'Pemula' | 'Menengah' | 'Mahir',
        })),
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
      };
    }
  } catch (error) {
    console.error('Error fetching tool by slug from Prisma/Supabase:', error);
  }

  const fallback = INITIAL_TOOLS.find((t) => t.slug === slug || t.id === slug);
  return fallback || null;
}

export async function saveTool(tool: ToolData): Promise<ToolData> {
  try {
    // Upsert Tool in Supabase
    const existing = await prisma.tool.findFirst({
      where: {
        OR: [{ id: tool.id }, { slug: tool.slug }],
      },
    });

    if (existing) {
      // Hapus data relasi lama untuk di-replace dengan kustomisasi baru
      await prisma.usageStep.deleteMany({ where: { toolId: existing.id } });
      await prisma.practiceTask.deleteMany({ where: { toolId: existing.id } });
      await prisma.quizQuestion.deleteMany({ where: { toolId: existing.id } });
      await prisma.troubleshootItem.deleteMany({ where: { toolId: existing.id } });
      await prisma.challengeItem.deleteMany({ where: { toolId: existing.id } });

      const updated = await prisma.tool.update({
        where: { id: existing.id },
        data: {
          slug: tool.slug,
          name: tool.name,
          category: tool.category,
          code: tool.code,
          location: tool.location,
          imageUrl: tool.imageUrl || null,
          description: tool.description,
          functionSummary: tool.functionSummary,
          specs: tool.specs,
          videoUrl: tool.videoUrl || null,
          moduleSummary: tool.moduleSummary || null,
          moduleContent: tool.moduleContent || null,
          steps: {
            create: tool.steps.map((s, idx) => ({
              stepNumber: s.stepNumber || idx + 1,
              title: s.title,
              description: s.description,
              tip: s.tip || null,
            })),
          },
          practiceTasks: {
            create: tool.practiceTasks.map((p, idx) => ({
              order: p.order || idx + 1,
              title: p.title,
              instruction: p.instruction,
              expectedResult: p.expectedResult || null,
            })),
          },
          quizzes: {
            create: tool.quizzes.map((q) => ({
              question: q.question,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation || null,
            })),
          },
          troubleshoots: {
            create: tool.troubleshoots.map((tb) => ({
              problem: tb.problem,
              symptom: tb.symptom || null,
              solution: tb.solution,
              preventive: tb.preventive || null,
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
        include: {
          steps: true,
          practiceTasks: true,
          quizzes: true,
          troubleshoots: true,
          challenges: true,
        },
      });

      return {
        ...updated,
        imageUrl: updated.imageUrl || undefined,
        videoUrl: updated.videoUrl || undefined,
        moduleSummary: updated.moduleSummary || undefined,
        moduleContent: updated.moduleContent || undefined,
        steps: updated.steps.map((s) => ({ ...s, tip: s.tip || undefined })),
        practiceTasks: updated.practiceTasks.map((p) => ({ ...p, expectedResult: p.expectedResult || undefined })),
        quizzes: updated.quizzes.map((q) => ({ ...q, explanation: q.explanation || undefined })),
        troubleshoots: updated.troubleshoots.map((tb) => ({ ...tb, symptom: tb.symptom || undefined, preventive: tb.preventive || undefined })),
        challenges: updated.challenges.map((c) => ({ ...c, level: c.level as any })),
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      };
    } else {
      const created = await prisma.tool.create({
        data: {
          id: tool.id,
          slug: tool.slug,
          name: tool.name,
          category: tool.category,
          code: tool.code,
          location: tool.location,
          imageUrl: tool.imageUrl || null,
          description: tool.description,
          functionSummary: tool.functionSummary,
          specs: tool.specs,
          videoUrl: tool.videoUrl || null,
          moduleSummary: tool.moduleSummary || null,
          moduleContent: tool.moduleContent || null,
          steps: {
            create: tool.steps.map((s, idx) => ({
              stepNumber: s.stepNumber || idx + 1,
              title: s.title,
              description: s.description,
              tip: s.tip || null,
            })),
          },
          practiceTasks: {
            create: tool.practiceTasks.map((p, idx) => ({
              order: p.order || idx + 1,
              title: p.title,
              instruction: p.instruction,
              expectedResult: p.expectedResult || null,
            })),
          },
          quizzes: {
            create: tool.quizzes.map((q) => ({
              question: q.question,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation || null,
            })),
          },
          troubleshoots: {
            create: tool.troubleshoots.map((tb) => ({
              problem: tb.problem,
              symptom: tb.symptom || null,
              solution: tb.solution,
              preventive: tb.preventive || null,
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
        include: {
          steps: true,
          practiceTasks: true,
          quizzes: true,
          troubleshoots: true,
          challenges: true,
        },
      });

      return {
        ...created,
        imageUrl: created.imageUrl || undefined,
        videoUrl: created.videoUrl || undefined,
        moduleSummary: created.moduleSummary || undefined,
        moduleContent: created.moduleContent || undefined,
        steps: created.steps.map((s) => ({ ...s, tip: s.tip || undefined })),
        practiceTasks: created.practiceTasks.map((p) => ({ ...p, expectedResult: p.expectedResult || undefined })),
        quizzes: created.quizzes.map((q) => ({ ...q, explanation: q.explanation || undefined })),
        troubleshoots: created.troubleshoots.map((tb) => ({ ...tb, symptom: tb.symptom || undefined, preventive: tb.preventive || undefined })),
        challenges: created.challenges.map((c) => ({ ...c, level: c.level as any })),
        createdAt: created.createdAt.toISOString(),
        updatedAt: created.updatedAt.toISOString(),
      };
    }
  } catch (error) {
    console.error('Error saving tool to Prisma:', error);
    throw error;
  }
}

export async function deleteTool(slug: string): Promise<boolean> {
  try {
    const existing = await prisma.tool.findFirst({
      where: {
        OR: [{ slug: slug }, { id: slug }],
      },
    });

    if (existing) {
      await prisma.tool.delete({ where: { id: existing.id } });
      return true;
    }
  } catch (error) {
    console.error('Error deleting tool from Prisma:', error);
  }
  return false;
}

export function verifyAdminKey(providedKey: string): boolean {
  const validKey = process.env.ADMIN_SECRET_KEY || 'admin123';
  return providedKey.trim() === validKey.trim();
}
