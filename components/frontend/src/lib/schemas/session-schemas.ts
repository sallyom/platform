/**
 * Zod validation schemas for agentic session types
 * These schemas provide runtime validation that mirrors the TypeScript types
 * defined in @/types/agentic-session
 */

import { z } from "zod";

/**
 * Schema for repository location (input or output)
 * Matches the RepoLocation TypeScript type
 */
export const repoLocationSchema = z.object({
  url: z.string().min(1, "URL is required").url("Must be a valid URL"),
  branch: z.string().optional(),
});

/**
 * Schema for session repository configuration
 * Matches the SessionRepo TypeScript type
 */
export const sessionRepoSchema = z.object({
  name: z.string().optional(),
  input: repoLocationSchema,
  output: repoLocationSchema.optional(),
  autoPush: z.boolean().optional(),
});

/**
 * Schema for LLM settings
 * Matches the LLMSettings TypeScript type
 */
export const llmSettingsSchema = z.object({
  model: z.string(),
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().positive(),
});

/**
 * Schema for active workflow configuration
 * Matches the activeWorkflow field in AgenticSessionSpec
 */
export const activeWorkflowSchema = z.object({
  gitUrl: z.string().url("Must be a valid URL"),
  branch: z.string(),
  path: z.string().optional(),
});

/**
 * Schema for creating an agentic session
 * Matches the CreateAgenticSessionRequest type
 */
export const createSessionSchema = z.object({
  initialPrompt: z.string().optional(),
  llmSettings: llmSettingsSchema.partial().optional(),
  displayName: z.string().optional(),
  timeout: z.number().positive().optional(),
  project: z.string().optional(),
  parent_session_id: z.string().optional(),
  environmentVariables: z.record(z.string(), z.string()).optional(),
  interactive: z.boolean().optional(),
  repos: z.array(sessionRepoSchema).optional(),
  autoPushOnComplete: z.boolean().optional(),
  labels: z.record(z.string(), z.string()).optional(),
  annotations: z.record(z.string(), z.string()).optional(),
});

// Export type inference helpers for use in components
export type RepoLocationInput = z.infer<typeof repoLocationSchema>;
export type SessionRepoInput = z.infer<typeof sessionRepoSchema>;
export type LLMSettingsInput = z.infer<typeof llmSettingsSchema>;
export type CreateSessionInput = z.infer<typeof createSessionSchema>;
