"use client";

import {Suspense, useEffect, useState, useRef} from "react";
import {X} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";

function QrPageContent() {
    const [seconds, setSeconds] = useState(180); // 3 minutes
    const [qrData, setQrData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const checkInterval = useRef<NodeJS.Timeout | null>(null);

    // Get token and amount from query or set default
    const token = searchParams.get("token") || "";
    const amount = searchParams.get("amount") || "";

    // Fetch QR data on mount
    useEffect(() => {
        const fetchQr = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/paytm/generate", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({token, amount}),
                });
                const data = await res.json();
                setQrData(data);
            } catch (err) {
                setQrData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchQr();
    }, [token, amount]);

    // Countdown timer
    useEffect(() => {
        if (seconds === 0) return;
        const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        return () => clearTimeout(timer);
    }, [seconds]);

    // Poll payment status every 5 seconds
    useEffect(() => {
        if (!qrData?.orderId || paymentSuccess || seconds === 0) return;

        const interval = setInterval(async () => {
            try {
                const res = await fetch("/api/paytm/check", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({token, orderId: qrData.orderId}),
                });
                const data = await res.json();

                if (data.status === true) {
                    setPaymentSuccess(true);
                    clearInterval(interval);
                }
            } catch (err) {
                // Optionally handle error
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [qrData?.orderId, paymentSuccess, token]);

    const handleCancel = () => {
        if (checkInterval.current) clearInterval(checkInterval.current);
        router.push("/dashboard");
    };

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 relative flex flex-col items-center">
                {paymentSuccess ? (
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <div className="mb-6">
                            <svg className="w-20 h-20 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#d1fae5"/>
                                <path stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                      d="M8 12l2 2 4-4"/>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
                        <p className="text-md text-gray-700 mb-6">Thank you for your payment.</p>
                        <button
                            className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-purple-700 mb-4">Scan to Pay</h1>
                        {loading ? (
                            <div className="mb-6 text-gray-500">Loading QR...</div>
                        ) : qrData && qrData.qr ? (
                            <img
                                src={qrData.qr}
                                alt="QR Code"
                                className="mb-6 w-48 h-48 object-contain border border-gray-200 rounded-xl"
                            />
                        ) : (
                            <div className="mb-6 text-red-500">Failed to load QR code</div>
                        )}
                        <div className="mb-2 text-lg font-semibold text-gray-800">
                            Amount: <span className="text-purple-600">₹{amount}</span>
                        </div>
                        <div className="mb-6 text-md text-gray-600">
                            Business: <span className="font-medium">{qrData?.upi || "Paytm Merchant"}</span>
                        </div>
                        <div className="mb-6 flex items-center gap-2">
                            <span className="text-gray-500">Expires in:</span>
                            <span className="font-mono text-lg text-red-500">{formatTime(seconds)}</span>
                        </div>
                        <button
                            onClick={handleCancel}
                            className="mt-auto w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-600 transition"
                        >
                            <X className="w-5 h-5"/>
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function QrPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <QrPageContent/>
        </Suspense>
    );
}