import mongoose from "mongoose";

type NonNullableProps<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

type UserSchema = mongoose.InferSchemaType<typeof userSchema>;
export type User = NonNullableProps<UserSchema>;

const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  codigo: String,
  tipoDocumento: String,
  numeroDocumento: Number,
  jornada: String,
  formaPago: String,
  semestre: Number,
  telefono: String,
  direccion: String,
  barrio: String,
  fechaNacimiento: Date,
  usuarioCampusVirtual: String,
  claveCampusVirtual: String,
  email: String,
  claveCorreo: String,
});

export default mongoose.models.User || mongoose.model('User', userSchema);