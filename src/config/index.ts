import zennv from "zennv";
import { z } from 'zod'

const schema = z.object({
    PORT: z.number().default(4001),
    HOST: z.string().default('0.0.0.0'),
    DATABASE_URL: z.string().optional(),
    DATABASE_NAME: z.string().default('dispo-admin'),
    LOG_LEVEL: z.string().default('info'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
});

export type DConfig = z.infer<typeof schema>;

export const config = zennv({
    schema: schema,
    dotenv: true
});