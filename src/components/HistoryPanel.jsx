import { getDreamHistory, deleteDreamRecord, exportHistory, importHistory } from '../utils/storage';
import { useState, useEffect } from 'react';

const ratingEmoji = {
  '吉': '✨',
  '凶': '⚠️',
  '平': '🌙',
  '奇': '🌟'
};

export default function HistoryPanel({ onSelectRecord, refreshTrigger }) {
  const [history, setHistory] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadHistory();
  }, [refreshTrigger]); // 当 refreshTrigger 变化时重新加载

  const loadHistory = () => {
    setHistory(getDreamHistory());
  };

  const handleDelete = (id) => {
    if (confirm('确定要删除这条记录吗？')) {
      deleteDreamRecord(id);
      loadHistory();
    }
  };

  const handleExport = () => {
    exportHistory();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importHistory(file)
        .then((count) => {
          alert(`成功导入 ${count} 条记录`);
          loadHistory();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-amber-500/20 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold font-serif text-amber-200">📚 历史记录</h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-amber-300 transition-colors font-serif"
        >
          {expanded ? '收起 ▲' : '展开 ▼'}
        </button>
      </div>

      {expanded && (
        <>
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleExport}
              className="flex-1 py-2 bg-amber-600/50 hover:bg-amber-600/70 rounded-lg text-sm font-semibold font-serif text-white transition-all"
            >
              📤 导出
            </button>
            <label className="flex-1 py-2 bg-purple-600/50 hover:bg-purple-600/70 rounded-lg text-sm font-semibold font-serif text-white transition-all cursor-pointer text-center">
              📥 导入
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-center text-gray-400 py-8 font-serif">暂无历史记录</p>
            ) : (
              history.map((record) => (
                <div
                  key={record.id}
                  className="bg-black/30 rounded-lg p-4 border border-amber-500/20 hover:border-amber-500/50 transition-all cursor-pointer"
                  onClick={() => onSelectRecord(record)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{ratingEmoji[record.result.rating]}</span>
                      <span className="font-semibold font-serif text-amber-300">{record.result.rating}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(record.id);
                      }}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      🗑️
                    </button>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2 mb-2 font-serif">
                    {record.dreamText}
                  </p>
                  <p className="text-xs text-gray-500 font-serif">
                    {new Date(record.timestamp).toLocaleString('zh-CN')}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
