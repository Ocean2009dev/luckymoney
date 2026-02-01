import { useState, useMemo, useEffect } from 'react';

export const DENOMINATIONS = [
    { value: 1000, label: '1,000 VND', img: '/src/assets/money/1000VND.jpg' },
    { value: 2000, label: '2,000 VND', img: '/src/assets/money/2000VND.jpg' },
    { value: 5000, label: '5,000 VND', img: '/src/assets/money/5000VND.jpg' },
    { value: 10000, label: '10,000 VND', img: '/src/assets/money/10000VND.jpg' },
    { value: 20000, label: '20,000 VND', img: '/src/assets/money/20000VND.jpg' },
    { value: 50000, label: '50,000 VND', img: '/src/assets/money/50000VND.jpg' },
    { value: 100000, label: '100,000 VND', img: '/src/assets/money/100000VND.jpg' },
    { value: 200000, label: '200,000 VND', img: '/src/assets/money/200000VND.jpg' },
    { value: 500000, label: '500,000 VND', img: '/src/assets/money/500000VND.jpg' },
];

const STORAGE_KEYS = {
    NAMES: 'lucky_money_names',
    AMOUNTS: 'lucky_money_amounts',
    VIEW: 'lucky_money_view',
    RESULTS: 'lucky_money_results'
};

export const useLuckyMoney = () => {
    // Helper to load from localStorage
    const loadState = (key, defaultValue) => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    };

    const [names, setNames] = useState(() => loadState(STORAGE_KEYS.NAMES, []));
    const [selectedAmounts, setSelectedAmounts] = useState(() => loadState(STORAGE_KEYS.AMOUNTS, []));
    const [view, setView] = useState(() => loadState(STORAGE_KEYS.VIEW, 'setup')); // 'setup', 'spinning', 'reveal'
    const [results, setResults] = useState(() => loadState(STORAGE_KEYS.RESULTS, []));

    // Sync state to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.NAMES, JSON.stringify(names));
    }, [names]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.AMOUNTS, JSON.stringify(selectedAmounts));
    }, [selectedAmounts]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.VIEW, JSON.stringify(view));
    }, [view]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
    }, [results]);

    const startRandomizing = () => {
        if (names.length === 0 || selectedAmounts.length === 0) return;

        // Create a result mapping
        const shuffledNames = [...names].sort(() => Math.random() - 0.5);
        const mappedResults = shuffledNames.map((name) => {
            const randomAmount = selectedAmounts[Math.floor(Math.random() * selectedAmounts.length)];
            return {
                name,
                amount: randomAmount.value,
                img: randomAmount.img,
                revealed: false,
            };
        });

        setResults(mappedResults);
        setView('spinning');
    };

    const resetAll = () => {
        setNames([]);
        setSelectedAmounts([]);
        setResults([]);
        setView('setup');
        Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    };

    return {
        names, setNames,
        selectedAmounts, setSelectedAmounts,
        view, setView,
        results, setResults,
        startRandomizing,
        resetAll
    };
};
