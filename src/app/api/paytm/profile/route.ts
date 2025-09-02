import {log} from "console";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {token} = body;

        const apiRes = await fetch(`http://148.72.244.77:5003/api/paytm/profile?token=${token}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });

        const apiData = await apiRes.json();

        return NextResponse.json(apiData, {status: apiRes.status});
    } catch (error) {
        console.error("Error getting Paytm profile:", error);
        return NextResponse.json(
            {status: false, msg: "Internal Server Error"},
            {status: 500}
        );
    }
}