import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/app/lib/prisma";
import { generateToken } from "@/app/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    console.log("Login Attempt");
    console.log("Email:", email);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log("User Found:", user);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password Valid:", validPassword);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateToken(user.id);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        plan: user.plan,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log("Login Successful");

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}