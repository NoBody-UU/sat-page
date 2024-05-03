import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserSchema from "@/app/lib/schemas/User.schema";
import clientPromise from "@/app/lib/db";

clientPromise

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usuario: { label: "Usuario", type: "text", placeholder: "Usuario" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, _req) {
        console.log(credentials);

        if (!(credentials?.usuario && credentials.password)) throw new Error('Una o más credenciales no fueron enviadas');
        console.log(await UserSchema.find())
        const userFound = await UserSchema.findOne({ usuarioCampusVirtual: credentials.usuario }).catch(() => new Error('Error al buscar el usuario'))

        if (!userFound) throw new Error('Las credenciales no coinciden con un usuario registrado')

        console.log(userFound)

        const matchPassword = credentials.password === userFound.claveCampusVirtual;

        if (!matchPassword) throw new Error('Las credenciales no coinciden con un usuario registrado')

        return {
            id: userFound.id,
            email: userFound.email,
            usuario: userFound.usuarioCampusVirtual,
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