"use client";
import { useSearchParams } from "next/navigation";
// ...other imports...

export default function QrPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "sumanmanna";
  const amount = searchParams.get("amount") || "100";
  // ...rest of your QR page logic...
}