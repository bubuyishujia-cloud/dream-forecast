import { useRef } from 'react';
import { generateShareUrl } from '../utils/storage';
import html2canvas from 'html2canvas';

const ratingConfig = {
  '吉': { label: 'AUSPICIOUS', color: 'text-gray-900' },
  '凶': { label: 'OMINOUS', color: 'text-gray-900' },
  '平': { label: 'NEUTRAL', color: 'text-gray-900' },
  '奇': { label: 'MYSTERIOUS', color: 'text-gray-900' }
};

export default function DreamResult({ dreamText, emotions, result, timestamp }) {
  const cardRef = useRef(null);
  const config = ratingConfig[result.rating] || ratingConfig['平'];

  const handleShare = () => {
    const shareUrl = generateShareUrl({ dreamText, emotions, result, timestamp });
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert('分享链接已复制'))
        .catch(() => alert('复制失败：\n' + shareUrl));
    } else {
      alert('分享链接：\n' + shareUrl);
    }
  };

  const handleScreenshot = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: window.devicePixelRatio || 2,
        useCORS: true,
        allowTaint: true,
        logging: false
      });

      canvas.toBlob((blob) => {
        if (!blob) {
          alert('图片生成失败');
          return;
        }

        if (navigator.share && navigator.canShare) {
          const file = new File([blob], `dream-forecast-${Date.now()}.png`, { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            navigator.share({
              files: [file],
              title: '梦境预报',
              text: '梦境解析结果'
            }).catch(() => {
              downloadImage(blob);
            });
            return;
          }
        }

        downloadImage(blob);
      }, 'image/png');

    } catch (error) {
      console.error('截图错误:', error);
      alert('截图失败，请使用截屏功能');
    }
  };

  const downloadImage = (blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `dream-forecast-${Date.now()}.png`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-16">
      <div ref={cardRef} className="bg-white py-12">
        {/* 评级 */}
        <div className="text-center mb-16 pb-16 border-b border-gray-200">
          <div className="inline-block">
            <p className="text-xs font-light text-gray-400 tracking-widest mb-4">RATING</p>
            <h2 className={`text-4xl font-light tracking-wider ${config.color}`}>
              {result.rating}
            </h2>
            <p className="text-xs font-light text-gray-400 tracking-widest mt-2">
              {config.label}
            </p>
          </div>
          <p className="mt-8 text-sm font-light text-gray-600 leading-relaxed max-w-md mx-auto">
            {result.ratingReason}
          </p>
        </div>

        {/* 梦境内容 */}
        <div className="mb-16 pb-16 border-b border-gray-200">
          <h3 className="text-xs font-light text-gray-400 tracking-widest mb-8">DREAM</h3>
          <p className="text-base font-light text-gray-700 leading-loose">
            {dreamText}
          </p>
          {emotions && emotions.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {emotions.map((emotion, index) => (
                <span
                  key={index}
                  className="px-4 py-1 border border-gray-200 text-xs font-light text-gray-500 tracking-wide"
                >
                  {emotion}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 核心意象 */}
        <div className="mb-16 pb-16 border-b border-gray-200">
          <h3 className="text-xs font-light text-gray-400 tracking-widest mb-8">SYMBOLS</h3>
          <div className="flex flex-wrap gap-4">
            {result.coreSymbols.map((symbol, index) => (
              <span
                key={index}
                className="px-6 py-2 border border-gray-900 text-sm font-light text-gray-900 tracking-wide"
              >
                {symbol}
              </span>
            ))}
          </div>
        </div>

        {/* 近期预示 */}
        <div className="mb-16 pb-16 border-b border-gray-200">
          <h3 className="text-xs font-light text-gray-400 tracking-widest mb-8">PREDICTION</h3>
          <p className="text-base font-light text-gray-700 leading-loose">
            {result.recentPrediction}
          </p>
        </div>

        {/* 潜在警示 */}
        <div className="mb-16 pb-16 border-b border-gray-200">
          <h3 className="text-xs font-light text-gray-400 tracking-widest mb-8">WARNING</h3>
          <p className="text-base font-light text-gray-700 leading-loose">
            {result.potentialWarning}
          </p>
        </div>

        {/* 今日指引 */}
        <div className="mb-16">
          <h3 className="text-xs font-light text-gray-400 tracking-widest mb-8">GUIDANCE</h3>
          <p className="text-base font-light text-gray-700 leading-loose">
            {result.todayGuidance}
          </p>
        </div>

        {/* 时间戳 */}
        <div className="text-center pt-8">
          <p className="text-xs font-light text-gray-300 tracking-widest">
            {new Date(timestamp).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }).replace(/\//g, '.')}
          </p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleScreenshot}
          className="px-8 py-3 border border-gray-300 text-gray-600 text-sm font-light tracking-wider hover:border-gray-900 hover:text-gray-900 transition-colors duration-300"
        >
          保存图片
        </button>
        <button
          onClick={handleShare}
          className="px-8 py-3 border border-gray-300 text-gray-600 text-sm font-light tracking-wider hover:border-gray-900 hover:text-gray-900 transition-colors duration-300"
        >
          分享链接
        </button>
      </div>
    </div>
  );
}

            return;
          }
        }

        // 桌面端或不支持分享 API 的设备，直接下载
        downloadImage(blob);
      }, 'image/png');

    } catch (error) {
      console.error('截图错误:', error);
      alert('截图失败，请重试或使用手机截屏功能');
    }
  };

  const downloadImage = (blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `dream-forecast-${Date.now()}.png`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert('图片已保存！');
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
