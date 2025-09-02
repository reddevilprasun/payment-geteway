// app/api/auth/login/route.ts
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {mobile, password} = body;

        // Forward request to external API
        const apiRes = await fetch("http://148.72.244.77:5003/api/user/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({mobile, password}),
        });
        console.log("Login attempt:", {mobile});


        const apiData = await apiRes.json();

        return NextResponse.json(apiData, {status: apiRes.status});
    } catch (error) {
        console.error("Error in login route:", error);
        return NextResponse.json(
            {status: 0, message: "Internal Server Error"},
            {status: 500}
        );
    }
}
