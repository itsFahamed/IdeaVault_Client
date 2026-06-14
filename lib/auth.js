import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { createAuthMiddleware } from 'better-auth/api'
import { bearer } from 'better-auth/plugins'
import { mongoClient, getDb } from './mongodb'

function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 6) {
    return 'Password must be at least 6 characters.'
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must include at least one uppercase letter.'
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must include at least one lowercase letter.'
  }
  return null
}

export const auth = betterAuth({
  database: mongodbAdapter(getDb(), {
    client: mongoClient,
    transaction: false,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      prompt: 'select_account',
    },
  },
  user: {
    additionalFields: {
      image: {
        type: 'string',
        required: false,
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== '/sign-up/email') return
      const body = ctx.body
      if (!body || typeof body.password !== 'string') return
      const error = validatePassword(body.password)
      if (error) {
        throw new Error(error)
      }
    }),
  },
  plugins: [bearer()],
})
