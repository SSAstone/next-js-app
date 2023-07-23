import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const body = await request.json();

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = 'HS256'

    const jwt = await new SignJWT(body)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(secret)

    // console.log(jwt)
    cookies().set({
        name: "jwt-token",
        value: `bearer ${jwt}`,
        secure: true,
        httpOnly: true
    })
    // localStorage.setItem("jwt", `bearer ${jwt}`)
    return NextResponse.json({ message: "success" })
}