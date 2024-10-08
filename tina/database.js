import { createDatabase, createLocalDatabase } from '@tinacms/datalayer'
import { GitHubProvider } from 'tinacms-gitprovider-github'
import { RedisLevel } from 'upstash-redis-level'
import redis from 'ioredis'

// Manage this flag in your CI/CD pipeline and make sure it is set to false in production
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main'

if (!branch) {
  throw new Error(
    'No branch found. Make sure that you have set the GITHUB_BRANCH or process.env.VERCEL_GIT_COMMIT_REF environment variable.'
  )
}

const redisInstance = new redis(process.env.KV_REST_API_URL);

// Create a wrapper for the redisInstance
const redisWrapper = {
  zadd: async (key, score, member) => {
    // ioredis expects zadd to be called with (key, score, member)
    return await redisInstance.zadd(key, score, member);
  },
  zrem: async (key, member) => {
    // ioredis expects zrem to be called with (key, member)
    return await redisInstance.zrem(key, member);
  },
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
};

export default isLocal
  ? // If we are running locally, use a local database that stores data in memory and writes to the local filesystem on save
    createLocalDatabase()
  : // If we are not running locally, use a database that stores data in redis and Saves data to github
    createDatabase({
      // May vary depending on your git provider
      gitProvider: new GitHubProvider({
        repo: process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG,
        owner: process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        branch: branch,
      }),
      // May vary depending on your database adapter
      databaseAdapter: new RedisLevel({
        redis: redisWrapper, // Use the wrapper instead of redisInstance directly
        debug: process.env.DEBUG === 'true' || false,
        namespace: branch,
      }),
    });
