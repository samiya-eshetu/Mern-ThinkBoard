import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

// Load environment variables immediately 
dotenv.config();

// Initialize Upstash Redis connection using env variables
const redisInstance = Redis.fromEnv();

// Configure the rate limiter: 10 requests allowed per 20 seconds
const rateLimitInstance = new Ratelimit({
  redis: redisInstance,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    // Fallback logic to catch localhost (::1) and proxy setups
    let identifier = req.ip || req.headers["x-forwarded-for"] || "global";
    
    if (identifier === "::1" || identifier === "127.0.0.1" || !identifier) {
      identifier = "local-development-user";
    }

    // Call Upstash to verify and increment the limit counter
    const { success, limit, reset, remaining } = await rateLimitInstance.limit(identifier);

    // Optional but highly recommended: Send standard rate-limiting headers back to the client
    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);

    // Block the client if the request limit is exceeded
    if (!success) {
      return res.status(429).json({
        error: "Too Many Requests",
        message: "You have exceeded your 10 requests per 20 seconds limit. Please try again later."
      });
    }

    next();
  } catch (error) {
    console.error("Rate Limiter System Error:", error);
    // Let the request proceed if Upstash goes down so your API doesn't break for users
    next(); 
  }
};

export default rateLimiterMiddleware;
