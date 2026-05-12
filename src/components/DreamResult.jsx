import { useRef } from 'react';
import { generateShareUrl } from '../utils/storage';
import html2canvas from 'html2canvas';

const ratingConfig = {
  '吉': { emoji: '✨', color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/50' },
  '凶': { emoji: '⚠️', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50' },
  '平': { emoji: '🌙', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/50' },
  '奇': { emoji: '🌟', color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/50' }
};

export default function DreamResult({ dreamText, emotions, result, timestamp }) {
  const cardRef = useRef(null);
  const config = ratingConfig[result.rating] || ratingConfig['平'];

  const handleShare = () => {
    const shareUrl = generateShareUrl({ dreamText, emotions, result, timestamp });
    navigator.clipboard.writeText(shareUrl);
    alert('分享链接已复制到剪贴板！');
  };

  const handleScreenshot = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#1a1f3a',
        scale: 2
      });

      const link = document.createElement('a');
      link.download = `dream-forecast-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      alert('截图失败，请重试');
    }
  };

  return (
    <div className="space-y-4">
      <div
        ref={cardRef}
        className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-amber-500/20 shadow-xl"
      >
        <div className="text-center mb-6">
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${config.bg} border ${config.border}`}>
            <span className="text-3xl">{config.emoji}</span>
            <span className={`text-2xl font-bold font-serif ${config.color}`}>{result.rating}</span>
          </div>
          <p className={`mt-2 text-sm font-serif ${config.color}`}>{result.ratingReason}</p>
        </div>

        <div className="space-y-6">
          <div className="bg-black/20 rounded-xl p-4 border border-amber-500/20">
            <h3 className="text-lg font-semibold font-serif text-amber-300 mb-2">💭 梦境内容</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-serif">{dreamText}</p>
            {emotions && emotions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {emotions.map((emotion, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-amber-600/20 border border-amber-500/30 rounded-full text-xs text-amber-200 font-serif"
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-black/20 rounded-xl p-4 border border-purple-500/20">
            <h3 className="text-lg font-semibold font-serif text-purple-300 mb-3">🎨 核心意象</h3>
            <div className="flex flex-wrap gap-2">
              {result.coreSymbols.map((symbol, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full text-sm text-purple-200 font-serif"
                >
                  {symbol}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-black/20 rounded-xl p-4 border border-amber-500/20">
            <h3 className="text-lg font-semibold font-serif text-amber-300 mb-2">🔮 近期预示</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-serif">{result.recentPrediction}</p>
          </div>

          <div className="bg-black/20 rounded-xl p-4 border border-orange-500/20">
            <h3 className="text-lg font-semibold font-serif text-orange-300 mb-2">⚡ 潜在警示</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-serif">{result.potentialWarning}</p>
          </div>

          <div className="bg-black/20 rounded-xl p-4 border border-green-500/20">
            <h3 className="text-lg font-semibold font-serif text-green-300 mb-2">💡 今日行动指引</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-serif">{result.todayGuidance}</p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500 font-serif">
          {new Date(timestamp).toLocaleString('zh-CN')}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleScreenshot}
          className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-700 hover:to-purple-700 rounded-lg font-semibold font-serif text-white transition-all duration-300 shadow-lg"
        >
          📸 保存为图片
        </button>
        <button
          onClick={handleShare}
          className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold font-serif text-white transition-all duration-300 shadow-lg"
        >
          🔗 复制分享链接
        </button>
      </div>
    </div>
  );
}
