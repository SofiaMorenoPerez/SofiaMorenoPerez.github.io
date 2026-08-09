import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

// Portfolio / Projects collection — Markdown content. Cover and gallery
// images go through astro:assets via `image()`.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      description: z.string().optional(),
      cover: image(),
      coverAlt: z.string().optional(),
      images: z.array(image()).optional(),
      tech: z.array(z.string()),
      role: z.string(),
      year: z.number(),
      featured: z.boolean().default(false),
      links: z
        .object({
          live: z.url().optional(),
          github: z.url().optional(),
          case: z.string().optional(),
        })
        .optional(),
      client: z.string().optional(),
      duration: z.string().optional(),
    }),
});

export const collections = { projects };