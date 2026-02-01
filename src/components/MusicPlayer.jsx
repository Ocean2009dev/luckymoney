import React, { useState, useRef, useEffect } from 'react';
import musicFile from '../assets/music/melodia_dla_zuzi.mp3';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(false);
    const audioRef = useRef(null);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                    setError(false);
                })
                .catch(err => {
                    console.error("Playback failed:", err);
                    setError(true);
                    setIsPlaying(false);
                });
        }
    };

    // Attempt to handle mobile interaction requirements
    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!isPlaying && audioRef.current) {
                // We don't auto-play here to respect user but we can 'unlock' it
                // Most browsers unlock the audio context on first click
            }
        };
        window.addEventListener('click', handleFirstInteraction, { once: true });
        return () => window.removeEventListener('click', handleFirstInteraction);
    }, [isPlaying]);

    return (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end group">
            <audio ref={audioRef} src={musicFile} loop preload="auto" />

            {/* Tooltip hint */}
            <div className={`mb-2 whitespace-nowrap bg-red-800 text-yellow-400 text-[10px] md:text-xs px-2 py-1 rounded border border-yellow-500 transition-opacity duration-300 ${isPlaying ? 'opacity-40 group-hover:opacity-100' : 'opacity-100 shadow-[0_0_10px_rgba(255,215,0,0.3)] anim-pulse-slow'}`}>
                {error ? '❌ Lỗi nhạc' : (isPlaying ? '🎵 Đang phát nhạc Xuân' : '🧧 Bật nhạc Xuân')}
            </div>

            <button
                onClick={toggleMusic}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-2 md:border-4 ${isPlaying
                        ? 'bg-yellow-500 text-red-800 border-red-800 scale-100'
                        : 'bg-red-700 text-yellow-400 border-yellow-500 scale-110 anim-pulse-slow'
                    } hover:scale-125 active:scale-90`}
            >
                <i className={`bx ${isPlaying ? 'bx-volume-full bx-tada' : 'bx-volume-mute'} text-2xl md:text-3xl`}></i>
            </button>
        </div>
    );
};

export default MusicPlayer;
