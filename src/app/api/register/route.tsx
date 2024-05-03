import { NextResponse } from "next/server";
import UserSchema, { type User } from "@/app/lib/schemas/User.schema";
import clientPromise from "@/app/lib/db";
clientPromise;

export async function POST(request: Request) {
  try {
    const data: User = await request.json();
    console.log("api",data);
    const userFound = await UserSchema.findOne({ usuarioCampusVirtual: data.usuarioCampusVirtual});

    if (userFound) {
      return NextResponse.json({ message: "Este usuario ya existe"   }, { status: 400 } );
    }
    
    const newUser = await UserSchema.create({ ...data });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        //@ts-expect-error
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}