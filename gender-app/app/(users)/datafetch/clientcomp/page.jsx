"use client";

import { useState } from "react";
import { User, Users, Star, TrendingUp } from "lucide-react";

export default function ClientComp() {
    const [userName, setUserName] = useState("");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!userName.trim()) {
            setError("Please enter a name.");
            setUserData(null);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const res = await fetch(
                `https://api.genderize.io?name=${userName}`
            );

            const data = await res.json();

            if (!data.gender) {
                setError("No prediction found for this name.");
                setUserData(null);
            } else {
                setUserData(data);
            }
            setUserName("");
        } catch (err) {
            setError("Something went wrong.");
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const isMale = userData?.gender === "male";
    const confidence = userData
        ? userData.probability * 100
        : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full relative overflow-hidden">

                {/* Background Decoration - Top Right */}
                <div
                    className={`absolute top-0 right-0 w-32 h-32 ${isMale
                        ? "bg-blue-200"
                        : "bg-pink-100"
                        } rounded-full -translate-y-16 translate-x-16 opacity-50`}
                />

                {/* Background Decoration - Bottom Left */}
                <div
                    className={`absolute bottom-0 left-0 w-24 h-24 ${isMale
                        ? "bg-blue-50"
                        : "bg-pink-50"
                        } rounded-full -translate-y-12 -translate-x-12 opacity-50`}
                />

                <div className="relative z-10">

                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        Gender Predictor
                    </h1>

                    <div className="space-y-3 mb-6">

                        <input
                            type="text"
                            placeholder="Enter a name..."
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />

                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                            {loading ? "Searching..." : "Predict Gender"}
                        </button>

                        {error && (
                            <p className="text-center text-red-500 text-sm">
                                {error}
                            </p>
                        )}

                    </div>
                    {userData && !loading && (
                        <>
                            {/* Header Section */}
                            <div className="text-center mb-8">
                                {/* Icon Container */}
                                <div className="flex justify-center mb-4">
                                    <div
                                        className={`p-4 rounded-full ${isMale ? "bg-blue-100" : "bg-pink-100"
                                            }`}
                                    >
                                        <User
                                            size={48}
                                            className={`${isMale ? "text-blue-600" : "text-pink-600"
                                                }`}
                                        />
                                    </div>
                                </div>

                                {/* Name */}
                                <h1 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
                                    {userData.name}
                                </h1>

                                {/* Gender Badge */}
                                <div
                                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${isMale
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-pink-100 text-pink-700"
                                        }`}
                                >
                                    {isMale ? "Male" : "Female"}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8" />

                            {/* Statistics */}
                            <div className="space-y-4 mb-8">
                                {/* Confidence */}
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Star
                                            size={20}
                                            className={`${isMale ? "text-blue-600" : "text-pink-600"
                                                }`}
                                        />
                                        <span className="text-gray-700 font-medium">
                                            Confidence
                                        </span>
                                    </div>

                                    <span className="text-lg font-bold text-gray-800">
                                        {confidence.toFixed(1)}%
                                    </span>
                                </div>

                                {/* Samples */}
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Users
                                            size={20}
                                            className="text-indigo-600"
                                        />
                                        <span className="text-gray-700 font-medium">
                                            Total Samples
                                        </span>
                                    </div>

                                    <span className="text-lg font-bold text-gray-800">
                                        {userData.count?.toLocaleString() || "N/A"}
                                    </span>
                                </div>

                                {/* Accuracy */}
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <TrendingUp
                                            size={20}
                                            className={`${confidence > 70
                                                ? "text-green-600"
                                                : "text-yellow-600"
                                                }`}
                                        />

                                        <span className="text-gray-700 font-medium">
                                            Accuracy
                                        </span>
                                    </div>

                                    <span
                                        className={`text-lg font-bold ${confidence > 70
                                            ? "text-green-600"
                                            : "text-yellow-600"
                                            }`}
                                    >
                                        {confidence > 70
                                            ? "High"
                                            : "Moderate"}
                                    </span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="text-center text-xs text-gray-500 p-4 bg-gray-50 rounded-lg">
                                <p>Powered by genderize.io API</p>

                                <p className="mt-1">
                                    Designed & Developed by{" "}
                                    <a
                                        href="https://github.com/RabiulAsif"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
                                    >
                                        MD. Rabiul Islam Asif
                                    </a>
                                </p>
                            </div>

                            {/* Confidence Bar */}
                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-semibold text-gray-600">
                                        Confidence Level
                                    </span>

                                    <span className="text-xs font-bold text-gray-700">
                                        {confidence.toFixed(0)}%
                                    </span>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${isMale
                                            ? "bg-blue-500"
                                            : "bg-pink-500"
                                            }`}
                                        style={{
                                            width: `${confidence}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}