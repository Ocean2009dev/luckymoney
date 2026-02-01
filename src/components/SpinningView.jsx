import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SpinningView = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-8 tet-card rounded-2xl border-4 border-yellow-500/50 shadow-[0_0_50px_rgba(255,215,0,0.2)]">

            <div className="space-y-4 px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 drop-shadow-lg">
                    Đang bốc thăm may mắn...
                </h2>
                <div className=" loading-spinner mx-auto scale-75 md:scale-100">

                </div>
                <p className="text-white/80 text-lg md:text-xl font-medium italic">
                    Thần tài đang chuẩn bị những phong bao lì xì cho bạn!
                </p>
            </div>
        </div>
    );
};

export default SpinningView;

