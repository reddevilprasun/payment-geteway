"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Smartphone, ArrowRight, KeyRound} from "lucide-react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PaytmConnect() {
    const [mobile, setMobile] = useState("");
    const [token, setToken] = useState("");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined" && !localStorage.getItem('token')) {
            router.push('/login');
        }
    }, []);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/paytm/send-otp", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({mobile, token}),
            });

            const data = await res.json();
            if (data.status === true || data.status === 1) {
                toast.success("OTP sent successfully!");
                setOtpSent(true);
            } else {
                toast.error(data.msg || "Failed to send OTP");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Replace with your actual Paytm OTP verification API endpoint
            const res = await fetch("/api/paytm/verify-otp", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({mobile, otp, token}),
            });

            const data = await res.json();
            if (data.status === true || data.status === 1) {
                toast.success("OTP verified successfully!");
                router.push("/dashboard"); // or any next step
            } else {
                toast.error(data.msg || "Invalid OTP");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 relative">
                <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">
                    Connect with Paytm Business
                </h1>
                {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Mobile Number
                            </label>
                            <div className="relative">
                                <Smartphone
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                                <input
                                    type="tel"
                                    placeholder="Enter your mobile number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    maxLength={10}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Send OTP
                                    <ArrowRight className="w-4 h-4"/>
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Enter 6-digit OTP
                            </label>
                            <div className="relative">
                                <KeyRound
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Verify OTP
                                    <ArrowRight className="w-4 h-4"/>
                                </>
                            )}
                        </button>
                    </form>
                )}
                <ToastContainer/>
            </div>
        </div>
    );
}