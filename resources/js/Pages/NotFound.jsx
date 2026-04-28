import { Link } from '@inertiajs/react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-indigo-600 animate-pulse">404</h1>
                <h2 className="text-3xl font-bold text-white mt-4">Page Not Found</h2>
                <p className="text-gray-400 mt-4 max-w-md mx-auto">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="mt-10 flex gap-4 justify-center">
                    <Link href="/" className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
                        Go Home
                    </Link>
                    <Link href="/#contact" className="px-8 py-3 border border-gray-600 text-gray-300 rounded-xl font-semibold hover:border-indigo-500 hover:text-white transition">
                        Contact Me
                    </Link>
                </div>
            </div>
        </div>
    );
}