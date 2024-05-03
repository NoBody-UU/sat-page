import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '../../../lib/db';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usuario: { label: "Usuario", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, _req) {
        console.log(credentials);
        if (!(credentials?.usuario && credentials.password)) throw new Error('Missing credentials')
        const database = (await db).db("sat");

        const userFound = await database.collection('users').findOne({ email: credentials!.usuario })

        if (!userFound) throw new Error('Las credenciales no coinciden con un usuario registrado')

        console.log(userFound)

        const matchPassword = await bcrypt.compare(credentials!.password, userFound.password)

        if (!matchPassword) throw new Error('Wrong password')

        return {
            id: userFound.id,
            name: userFound.name,
            usuariio: userFound.usuario,
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/auth/login",
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };