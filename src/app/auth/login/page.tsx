"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter()
  const [error, setError] = useState(null)
  
  const onSubmit = handleSubmit(async (data) => {

    const res = await signIn("credentials", {
      usuario: data.usuario,
      password: data.password,
      redirect: false,
    });

    console.log(res)
    if (res?.error) {
      setError(res.error as any)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center login-container">
      <form onSubmit={onSubmit} className="w-1/4">

        {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">{error}</p>
        )}

        <h1 className="font-bold text-4xl mb-4 Inicio Session ">Inicio Session</h1>

        <label htmlFor="usuario" className="text-slate-500 mb-2 block text-sm Usuario">
          Usuario:
        </label>
        <input
          type="text"
          {...register("usuario", {
            required: {
              value: true,
              message: "Usuario es requerido",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />

        {errors.usuario && (
          <span className="text-red-500 text-xs">{errors.usuario.message as string}</span>
        )}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm Contraseña">
          Contraseña:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "La contraseña es requerida",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="******"
        />

        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message as string}
          </span>
        )}
        
        <button className="w-full p-3 rounded-lg mt-2 button-Iniciar-Session">
          Iniciar Session
        </button>
        <button 
        className="w-full p-3 rounded-lg mt-2 button-register"
        onClick={() => router.push('/auth/register')}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
export default LoginPage;