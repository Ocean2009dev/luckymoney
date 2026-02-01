import { motion } from 'framer-motion';
import { useState } from 'react';

const RevealView = ({ results, setResults }) => {
    const handleOpen = (index) => {
        if (results[index].revealed) return;
        const newResults = [...results];
        newResults[index].revealed = true;
        setResults(newResults);
    };

    return (
        <div className="w-full max-w-7xl px-4 py-12 overflow-y-auto max-h-[85vh] custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-16 justify-items-center">
                {results.map((item, index) => (
                    <div key={index} className="relative w-[150px] h-[310px] cursor-pointer" onClick={() => handleOpen(index)}>
                        {/* Recipient Name Tag */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-yellow-400 text-red-800 px-4 py-1 rounded-full font-bold shadow-lg z-30 whitespace-nowrap border-2 border-red-600">
                            {item.name}
                        </div>

                        {/* Envelope & Money container with Flip Animation */}
                        <div className="relative w-full h-full perspective-1000">
                            <motion.div
                                initial={false}
                                animate={{ rotateY: item.revealed ? 180 : 0 }}
                                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                                className="w-full h-full relative"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Front Side: Red Envelope */}
                                <div
                                    className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border-2 border-yellow-600/50 shadow-2xl bg-red-800"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <img
                                        src="/src/assets/Baolixi/Baolixi1.png"
                                        alt="Envelope"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="w-16 h-16 border-4 border-yellow-400 bg-red-600/40 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                                        >
                                            <span className="text-yellow-400 text-sm font-black">Mở</span>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Back Side: Clear Money Bill */}
                                <div
                                    className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border-4 border-yellow-400 bg-white flex flex-col shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)"
                                    }}
                                >
                                    <div className="flex-1 w-full relative bg-red-50 flex items-center justify-center">
                                        <img
                                            src={item.img}
                                            alt={`${item.amount}VND`}
                                            className="max-w-[140%] h-auto object-contain rotate-90"
                                        />
                                    </div>
                                    <div className="h-16 bg-red-700 flex flex-col items-center justify-center border-t-4 border-yellow-400">
                                        <span className="text-yellow-400 font-black text-xl leading-none">
                                            {item.amount.toLocaleString()}
                                        </span>
                                        <span className="text-white text-[10px] font-bold uppercase tracking-widest mt-1">VND</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-20 flex justify-center pb-10">
                <button
                    onClick={() => window.location.reload()}
                    className="border-btn text-lg px-10 py-3 rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all bg-gradient-to-r from-red-600 to-red-800 border-2 border-yellow-500 text-white"
                >
                    🔄 Bốc lại từ đầu
                </button>
            </div>
        </div>
    );
};

export default RevealView;
