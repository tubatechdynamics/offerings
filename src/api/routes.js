import { TinaNodeBackend, LocalBackendAuthentication } from '@tinacms/datalayer'
import { TinaAuthJSOptions, AuthJsBackendAuthentication } from 'tinacms-authjs'

import databaseClient from '../../../tina/__generated__/databaseClient'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

export const NextAuthOptions = TinaAuthJSOptions({
  databaseClient: databaseClient,
  debug: process.env.DEBUG === 'true',
  secret: process.env.NEXTAUTH_SECRET,
  uidProp: 'name',
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
})

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({ authOptions: NextAuthOptions }),
  databaseClient,
})

export default (req, res) => {
  return handler(req, res)
}
