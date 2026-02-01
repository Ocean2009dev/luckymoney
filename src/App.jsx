import MusicPlayer from './components/MusicPlayer';
import './index.css';
import InputView from './components/InputView';
import SpinningView from './components/SpinningView';
import RevealView from './components/RevealView';
import { useLuckyMoney } from './hooks/useLuckyMoney';
import monkeyImg from './assets/animations/monkey.png';
import horseImg from './assets/animations/horse.png';

function App() {
  const {
    names, setNames,
    selectedAmounts, setSelectedAmounts,
    view, setView,
    results, setResults,
    startRandomizing
  } = useLuckyMoney();

  return (
    <div className="w-screen min-h-screen flex items-center flex-col relative overflow-hidden">
      <div className="chase-wrapper">
        <div className="chase-container">
          <img src={monkeyImg} alt="Monkey" className="monkey monkey-staff-swing" />
          <img src={horseImg} alt="Horse" className="horse horse-staff-swing" />
        </div>
      </div>
      <h1 className="text-center text-6xl font-bold text-yellow-400 mb-10 mt-10 animate-textLeftToRight">Tích cực quay tay, vận may sẽ đến</h1>

      {view === 'setup' && (
        <InputView
          names={names}
          setNames={setNames}
          selectedAmounts={selectedAmounts}
          setSelectedAmounts={setSelectedAmounts}
          startRandomizing={startRandomizing}
        />
      )}

      {view === 'spinning' && (
        <SpinningView onComplete={() => setView('reveal')} />
      )}

      {view === 'reveal' && (
        <RevealView results={results} setResults={setResults} />
      )}

      <footer className="py-6 text-center text-yellow-600/50 text-sm italic">
        Chúc mừng năm mới - An khang thịnh vượng!
      </footer>
      <MusicPlayer />
    </div>
  );
}

export default App;

