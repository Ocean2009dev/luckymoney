import { useState, useMemo } from 'react';

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

export const useLuckyMoney = () => {
    const [names, setNames] = useState([]);
    const [selectedAmounts, setSelectedAmounts] = useState([]);
    const [view, setView] = useState('setup'); // 'setup', 'spinning', 'reveal'
    const [results, setResults] = useState([]);

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

    return {
        names, setNames,
        selectedAmounts, setSelectedAmounts,
        view, setView,
        results, setResults,
        startRandomizing
    };
};
