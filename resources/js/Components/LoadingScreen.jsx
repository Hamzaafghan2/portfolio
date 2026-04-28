import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ isLoading }) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#0b1120] via-[#111827] to-[#1e293b] flex items-center justify-center overflow-hidden"
                >
                    {/* Background Glow Effects */}
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.35, 0.2],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute w-72 h-72 bg-indigo-500/30 blur-3xl rounded-full"
                    />

                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.15, 0.3, 0.15],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute w-96 h-96 bg-cyan-400/20 blur-3xl rounded-full"
                    />

                    {/* Main Loader Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 flex flex-col items-center gap-6 px-10 py-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
                    >
                        {/* Rotating Rings */}
                        <div className="relative w-20 h-20 flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent"
                            />

                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute inset-2 rounded-full border-4 border-cyan-400 border-b-transparent"
                            />

                            <motion.div
                                animate={{
                                    scale: [1, 1.15, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                                className="w-4 h-4 rounded-full bg-white shadow-lg"
                            />
                        </div>

                        {/* Text */}
                        <div className="text-center">
                            <motion.h2
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                }}
                                className="text-white text-xl font-semibold tracking-wide"
                            >
                                Loading Experience
                            </motion.h2>

                            <p className="text-gray-300 text-sm mt-2">
                                Please wait a moment...
                            </p>
                        </div>

                        {/* Progress Dots */}
                        <div className="flex gap-2">
                            {[0, 1, 2].map((dot) => (
                                <motion.span
                                    key={dot}
                                    animate={{
                                        y: [0, -6, 0],
                                        opacity: [0.4, 1, 0.4],
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: dot * 0.15,
                                    }}
                                    className="w-2.5 h-2.5 rounded-full bg-indigo-400"
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// import { motion, AnimatePresence } from 'framer-motion';

// export default function LoadingScreen({ isLoading }) {
//     return (
//         <AnimatePresence>
//             {isLoading && (
//                 <motion.div 
//                     initial={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="fixed inset-0 z-[9999] bg-[#0b1120] flex flex-col items-center justify-center gap-4"
//                 >
//                     <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                         className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
//                     />
//                     <p className="text-white text-lg font-medium animate-pulse">Loading...</p>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// }