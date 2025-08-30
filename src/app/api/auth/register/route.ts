import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullName, email, mobile, password } = body;

        // Basic validation
        if (!fullName || !email || !mobile || !password) {
            return NextResponse.json(
                { status: 0, message: "All fields are required" },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { status: 0, message: "Invalid email format" },
                { status: 400 }
            );
        }

        // Phone validation (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(mobile.replace(/\D/g, ''))) {
            return NextResponse.json(
                { status: 0, message: "Phone number must be 10 digits" },
                { status: 400 }
            );
        }

        // Password validation
        if (password.length < 6) {
            return NextResponse.json(
                { status: 0, message: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        // TODO: In a real application, you would:
        // 1. Hash the password using bcrypt
        // 2. Check if email already exists in database
        // 3. Save user to database
        // 4. Send verification email
        // 5. Create session/JWT token

        console.log("Registration attempt:", { fullName, email, mobile });

         // Forward request to external API
        const apiRes = await fetch("http://148.72.244.77:5003/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: fullName, email, mobile, password }),
        });

        const apiData = await apiRes.json();        

        return NextResponse.json(apiData, { status: apiRes.status });

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { status: 0, message: "Internal server error" },
            { status: 500 }
        );
    }
}