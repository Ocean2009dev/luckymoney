import React, { useState, useRef, useEffect } from 'react';
import musicFile from '../assets/music/melodia_dla_zuzi.mp3';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        // Attempt to play on mount (might be blocked by browser)
        const playAttempt = () => {
            // Many browsers block autopay without interaction
        };
        playAttempt();
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <audio ref={audioRef} src={musicFile} loop />
            <button
                onClick={toggleMusic}
                className="w-14 h-14 rounded-full bg-yellow-500 text-red-800 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border-4 border-red-800"
            >
                <i className={`bx ${isPlaying ? 'bx-volume-full bx-tada' : 'bx-volume-mute'} text-3xl`}></i>
            </button>

            {/* Tooltip hint */}
            <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-red-800 text-yellow-400 text-xs px-2 py-1 rounded border border-yellow-500 opacity-60">
                {isPlaying ? 'Tắt nhạc' : 'Bật nhạc Xuân'}
            </div>
        </div>
    );
};

export default MusicPlayer;
