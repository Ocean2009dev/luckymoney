import { useState } from 'react';

const InputView = ({ names, setNames, selectedAmounts, setSelectedAmounts, startRandomizing }) => {
    const [newName, setNewName] = useState('');

    const amounts = [
        { id: 1000, img: "/src/assets/money/1000VND.jpg", value: 1000 },
        { id: 2000, img: "/src/assets/money/2000VND.jpg", value: 2000 },
        { id: 5000, img: "/src/assets/money/5000VND.jpg", value: 5000 },
        { id: 10000, img: "/src/assets/money/10000VND.jpg", value: 10000 },
        { id: 20000, img: "/src/assets/money/20000VND.jpg", value: 20000 },
        { id: 50000, img: "/src/assets/money/50000VND.jpg", value: 50000 },
        { id: 100000, img: "/src/assets/money/100000VND.jpg", value: 100000 },
        { id: 200000, img: "/src/assets/money/200000VND.jpg", value: 200000 },
        { id: 500000, img: "/src/assets/money/500000VND.jpg", value: 500000 },
    ];

    const toggleAmount = (amount) => {
        setSelectedAmounts(prev =>
            prev.some(a => a.value === amount.value)
                ? prev.filter(a => a.value !== amount.value)
                : [...prev, amount]
        );
    };

    const handleAddName = () => {
        if (newName.trim()) {
            setNames([...names, newName.trim()]);
            setNewName('');
        }
    };

    const handleRemoveName = (index) => {
        setNames(names.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-4xl w-full h-full  p-8 border-4 border-[var(--color-border)] tet-card rounded-xl">
            <div className='w-full flex justify-between border-b border-[var(--color-border)] pb-4 space-x-8'>
                <div className='flex md:items-center flex-row md:flex-col flex-1'>
                    <div className='mb-4 w-full flex'>
                        <input
                            type="text"
                            placeholder='Nhập tên'
                            className='px-4 py-2 border border-[var(--color-border)] flex-1 text-white bg-red-900/50 outline-none rounded-l-lg'
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddName()}
                        />
                        <button className='border-btn rounded-r-lg px-6' onClick={handleAddName}>Thêm</button>
                    </div>
                    {/* HIển thị danh sách người được thêm may mắn */}
                    <div className='w-full h-40 grid grid-cols-2 gap-2 overflow-y-auto p-4 border border-[var(--color-border)] bg-black/20 rounded-lg custom-scrollbar'>
                        {names.map((name, index) => (
                            <div key={index} className='w-40 h-10 bg-red-600 text-white px-3 py-1 flex items-center justify-between rounded-md text-sm border border-yellow-500/30 group '>
                                <span className="truncate">{name}</span>
                                <button className=' bg-red-600 text-white px-3 py-1 flex items-center justify-between rounded-md text-2xl cursor-pointer' onClick={() => handleRemoveName(index)}>×</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-3 flex-1'>
                    {amounts.map((amount) => {
                        const isSelected = selectedAmounts.some(a => a.value === amount.value);
                        return (
                            <div
                                key={amount.id}
                                className={`w-full h-14 border-4 ${isSelected ? 'border-green-500 ' : 'border-[var(--color-border)]'} cursor-pointer relative transition-all duration-200 hover:border-yellow-400 rounded-lg overflow-hidden`}
                                onClick={() => toggleAmount(amount)}
                            >
                                <img src={amount.img} alt={`${amount.id}VND`} className='w-full h-full object-cover' />
                                {isSelected && (
                                    <div className="absolute top-1 right-1 bg-green-500 rounded-full p-0.5 shadow-md border-2 border-white z-20">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <button
                className={`border-btn mt-6 w-full text-xl font-bold py-4 rounded-xl shadow-lg transition-all ${names.length === 0 || selectedAmounts.length === 0 ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                onClick={startRandomizing}
                disabled={names.length === 0 || selectedAmounts.length === 0}
            >
                Bắt đầu quay
            </button>
        </div>
    );
};

export default InputView;
