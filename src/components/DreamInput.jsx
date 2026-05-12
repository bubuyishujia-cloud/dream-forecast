import { useState } from 'react';

const EMOTION_TAGS = [
  '平静', '焦虑', '喜悦', '恐惧', '悲伤',
  '兴奋', '困惑', '愤怒', '温暖', '孤独'
];

export default function DreamInput({ onSubmit, loading }) {
  const [dreamText, setDreamText] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState([]);

  const toggleEmotion = (emotion) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleSubmit = () => {
    if (dreamText.trim() && !loading) {
      onSubmit(dreamText.trim(), selectedEmotions);
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-amber-500/20 shadow-xl">
      <h2 className="text-2xl font-serif mb-4 text-amber-200">✨ 记录你的梦境</h2>

      <textarea
        value={dreamText}
        onChange={(e) => setDreamText(e.target.value)}
        placeholder="请描述你的梦境...&#10;&#10;例如：我梦见自己在一片星空下飞翔，周围有许多发光的蝴蝶..."
        className="w-full h-40 px-4 py-3 bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 resize-none font-serif"
        disabled={loading}
      />

      <div className="mt-4">
        <h3 className="text-sm text-amber-300 mb-2 font-serif">情绪标签（可选）</h3>
        <div className="flex flex-wrap gap-2">
          {EMOTION_TAGS.map((emotion) => (
            <button
              key={emotion}
              onClick={() => toggleEmotion(emotion)}
              disabled={loading}
              className={`px-3 py-1 rounded-full text-sm font-serif transition-all duration-300 ${
                selectedEmotions.includes(emotion)
                  ? 'bg-amber-500/50 border-amber-400 text-amber-100 shadow-lg shadow-amber-500/30'
                  : 'bg-black/30 border-purple-500/30 text-gray-300 hover:border-amber-500/50'
              } border disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!dreamText.trim() || loading}
        className="w-full mt-6 py-4 bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-amber-500/50 text-lg font-serif"
      >
        {loading ? '解析中...' : '🔮 开始解析'}
      </button>
    </div>
  );
}
