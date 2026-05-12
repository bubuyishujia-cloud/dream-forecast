import { useState, useEffect } from 'react';
import StarryBackground from './components/StarryBackground';
import DreamInput from './components/DreamInput';
import LoadingAnimation from './components/LoadingAnimation';
import DreamResult from './components/DreamResult';
import HistoryPanel from './components/HistoryPanel';
import { analyzeDream } from './api/anthropic';
import { saveDreamRecord, parseShareUrl } from './utils/storage';

function App() {
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);

  useEffect(() => {
    // 检查是否有分享链接
    const sharedData = parseShareUrl();
    if (sharedData) {
      setCurrentResult({
        dreamText: sharedData.dream,
        emotions: sharedData.emotions || [],
        result: sharedData.result,
        timestamp: sharedData.timestamp
      });
      // 清除 URL 参数
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
    <div className="min-h-screen relative">
      <StarryBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold font-serif mb-4 bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-float">
            🌙 梦境预报
          </h1>
          <p className="text-gray-400 text-lg font-serif">探索潜意识的星辰大海</p>
        </header>

        <div className="space-y-6">
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
              <button
                onClick={handleNewAnalysis}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-700 hover:to-purple-700 rounded-lg font-semibold font-serif text-white transition-all duration-300 shadow-lg"
              >
                ✨ 解析新梦境
              </button>
            </>
          )}

          <HistoryPanel onSelectRecord={handleSelectHistory} />
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm font-serif">
          <p>Powered by Claude API • 数据存储在本地浏览器</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
