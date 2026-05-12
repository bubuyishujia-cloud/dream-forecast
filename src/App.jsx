import { useState, useEffect } from 'react';
import DreamInput from './components/DreamInput';
import LoadingAnimation from './components/LoadingAnimation';
import DreamResult from './components/DreamResult';
import HistoryPanel from './components/HistoryPanel';
import { analyzeDream } from './api/anthropic';
import { saveDreamRecord, parseShareUrl } from './utils/storage';

function App() {
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [historyRefresh, setHistoryRefresh] = useState(0);

  useEffect(() => {
    const sharedData = parseShareUrl();
    if (sharedData) {
      setCurrentResult({
        dreamText: sharedData.dream,
        emotions: sharedData.emotions || [],
        result: sharedData.result,
        timestamp: sharedData.timestamp
      });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleAnalyze = async (dreamText, emotions) => {
    setLoading(true);
    setCurrentResult(null);

    try {
      const result = await analyzeDream(dreamText, emotions);
      const record = saveDreamRecord({ dreamText, emotions, result });
      setCurrentResult({
        dreamText,
        emotions,
        result,
        timestamp: record.timestamp
      });
      setHistoryRefresh(prev => prev + 1);
    } catch (error) {
      alert(`解析失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (record) => {
    setCurrentResult({
      dreamText: record.dreamText,
      emotions: record.emotions || [],
      result: record.result,
      timestamp: record.timestamp
    });
  };

  const handleNewAnalysis = () => {
    setCurrentResult(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <header className="text-center mb-24">
          <h1 className="text-5xl font-light tracking-wide mb-6 text-gray-900">
            梦境预报
          </h1>
          <p className="text-base font-light text-gray-500 tracking-wider">
            DREAM FORECAST
          </p>
        </header>

        <div className="space-y-20">
          {!loading && !currentResult && (
            <DreamInput onSubmit={handleAnalyze} loading={loading} />
          )}

          {loading && <LoadingAnimation />}

          {currentResult && (
            <>
              <DreamResult
                dreamText={currentResult.dreamText}
                emotions={currentResult.emotions}
                result={currentResult.result}
                timestamp={currentResult.timestamp}
              />
              <div className="text-center">
                <button
                  onClick={handleNewAnalysis}
                  className="px-12 py-4 border border-gray-300 text-gray-900 font-light tracking-wider hover:border-gray-900 transition-colors duration-300"
                >
                  新的解析
                </button>
              </div>
            </>
          )}

          <HistoryPanel onSelectRecord={handleSelectHistory} refreshTrigger={historyRefresh} />
        </div>

        <footer className="mt-32 text-center text-xs font-light text-gray-400 tracking-widest">
          <p>POWERED BY INTELLIGENT ALGORITHM</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
