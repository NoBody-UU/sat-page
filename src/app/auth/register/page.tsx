"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm();
  const errors = formState.errors as any;
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        fechaNacimiento: new Date(data.fechaNacimiento).toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    }
  });

  return (
    <div className="h-screen flex justify-center register-container">
  <form onSubmit={onSubmit} className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 bg-gray-100 rounded-lg shadow-lg p-8">
    <h1 className="text-slate-950 font-bold text-4xl mb-4">Formulario Registro</h1>

    <label htmlFor="nombre" className="text-zinc-800 mb-2 block text-sm">
      Nombre:
    </label>
    <input
      type="text"
      {...register("nombre", { required: true })}
      className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
      placeholder="Your Name"
    />
    {errors.nombre && (
      <span className="text-red-500 text-xs">{errors.nombre.message || "Nombre is required"}</span>
    )}

    <label htmlFor="apellido" className="text-zinc-800 mb-2 block text-sm">
      Apellidos:
    </label>
    <input
      type="text"
      {...register("apellido", { required: true })}
      className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
      placeholder="Your Last Name"
    />
    {errors.apellido && (
      <span className="text-red-500 text-xs">{errors.apellido.message || "Apellido is required"}</span>
    )}

    <label htmlFor="tipoDocumento" className="text-zinc-800 mb-2 block text-sm">
      Tipo de Documento:
    </label>
    <select
      {...register("tipoDocumento", { required: true })}
      className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
    >
      <option value="">Selecciona un tipo de documento</option>
      <option value="CC">CC</option>
      <option value="CI">CI</option>
      <option value="TI">TI</option>
    </select>
    {errors.tipoDocumento && (
      <span className="text-red-500 text-xs">{errors.tipoDocumento.message || "Tipo de Documento is required"}</span>
    )}

    <label htmlFor="numeroDocumento" className="text-zinc-800 mb-2 block text-sm">
      Número de Documento:
    </label>
    <input
      type="text"
      {...register("numeroDocumento", { required: true })}
      className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
      placeholder="Your Document Number"
    />
    {errors.numeroDocumento && (
      <span className="text-red-500 text-xs">{errors.numeroDocumento.message || "Número de Documento is required"}</span>
    )}

    <label htmlFor="telefono" className="text-zinc-800 mb-2 block text-sm">
      Teléfono:
    </label>
    <input
      type="text"
      {...register("telefono", { required: true })}
      className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
      placeholder="Your Phone Number"
    />
    {errors.telefono && (
      <span className="text-red-500 text-xs">{errors.telefono.message || "Teléfono is required"}</span>
    )}

    <label htmlFor="direccion" className="text-zinc-800 mb-2 block text-sm">
      Dirección:
    </label>
    <input
      type="text"
      {...register("direccion", { required: true })}
      className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
      placeholder="Your Address"
    />
    {errors.direccion && (
      <span className="text-red-500 text-xs">{errors.direccion.message || "Dirección is required"}</span>
    )}

    <label htmlFor="barrio" className="text-zinc-800 mb-2 block text-sm">
      Barrio:
    </label>
    <input
      type="text"
      {...register("barrio", { required: true })}
      className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
      placeholder="Your Neighborhood"
    />
    {errors.barrio && (
      <span className="text-red-500 text-xs">{errors.barrio.message || "Barrio is required"}</span>
    )}

    <label htmlFor="fechaNacimiento" className="text-zinc-800 mb-2 block text-sm">
      Fecha de Nacimiento:
    </label>
    <input
      type="date"
      {...register("fechaNacimiento", { required: true })}
      className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
    />
    {errors.fechaNacimiento && (
      <span className="text-red-500 text-xs">{errors.fechaNacimiento.message || "Fecha de Nacimiento is required"}</span>
    )}
    <label htmlFor="usuarioCampusVirtual" className="text-zinc-800 mb-2 block text-sm">
      Usuario Campus Virtual:
    </label>
    <input
      type="text"
      {...register("usuarioCampusVirtual", { required: true })}
      className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
      placeholder="Your Campus Virtual Username"
    />
    {errors.usuarioCampusVirtual && (
      <span className="text-red-500 text-xs">{errors.usuarioCampusVirtual.message || "Usuario Campus Virtual is required"}</span>
    )}

    <label htmlFor="claveCampusVirtual" className="text-zinc-800 mb-2 block text-sm">
      Clave Campus Virtual:
    </label>
    <input
      type="password"
      {...register("claveCampusVirtual", { required: true })}
      className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
      placeholder="********"
    />
    {errors.claveCampusVirtual && (
      <span className="text-red-500 text-xs">{errors.claveCampusVirtual.message || "Clave Campus Virtual is required"}</span>
    )}
    <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
      Register
    </button>
  </form>
</div>

  );
}

export default RegisterPage;
