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
    <div className="space-y-12">
      <div>
        <label className="block text-sm font-light text-gray-500 tracking-wider mb-6">
          梦境描述
        </label>
        <textarea
          value={dreamText}
          onChange={(e) => setDreamText(e.target.value)}
          placeholder="请详细描述你的梦境..."
          className="w-full h-48 px-0 py-4 bg-transparent border-0 border-b border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 resize-none font-light text-base leading-relaxed transition-colors duration-300"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-light text-gray-500 tracking-wider mb-6">
          情绪标签
        </label>
        <div className="flex flex-wrap gap-3">
          {EMOTION_TAGS.map((emotion) => (
            <button
              key={emotion}
              onClick={() => toggleEmotion(emotion)}
              disabled={loading}
              className={`px-6 py-2 border text-sm font-light tracking-wide transition-all duration-300 ${
                selectedEmotions.includes(emotion)
                  ? 'border-gray-900 text-gray-900'
                  : 'border-gray-200 text-gray-400 hover:border-gray-400'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center pt-8">
        <button
          onClick={handleSubmit}
          disabled={!dreamText.trim() || loading}
          className="px-16 py-4 border border-gray-900 text-gray-900 font-light tracking-widest hover:bg-gray-900 hover:text-white disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading ? '解析中' : '开始解析'}
        </button>
      </div>
    </div>
  );
}
