import { getDreamHistory, deleteDreamRecord, exportHistory, importHistory } from '../utils/storage';
import { useState, useEffect } from 'react';

const ratingLabel = {
  '吉': '吉',
  '凶': '凶',
  '平': '平',
  '奇': '奇'
};

export default function HistoryPanel({ onSelectRecord, refreshTrigger }) {
  const [history, setHistory] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadHistory();
  }, [refreshTrigger]);

  const loadHistory = () => {
    setHistory(getDreamHistory());
  };

  const handleDelete = (id) => {
    if (confirm('确定删除此记录？')) {
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
          alert(`已导入 ${count} 条记录`);
          loadHistory();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="border-t border-gray-200 pt-16">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-xs font-normal text-gray-600 tracking-widest">历史记录</h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-normal text-gray-600 tracking-wider hover:text-gray-900 transition-colors"
        >
          {expanded ? '收起' : '展开'}
        </button>
      </div>

      {expanded && (
        <>
          <div className="flex gap-4 mb-12">
            <button
              onClick={handleExport}
              className="flex-1 py-3 border border-gray-300 text-xs font-normal text-gray-700 tracking-wider hover:border-gray-900 hover:text-gray-900 transition-colors"
            >
              导出数据
            </button>
            <label className="flex-1 py-3 border border-gray-300 text-xs font-normal text-gray-700 tracking-wider hover:border-gray-900 hover:text-gray-900 transition-colors cursor-pointer text-center">
              导入数据
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>

          <div className="space-y-6">
            {history.length === 0 ? (
              <p className="text-center text-gray-400 py-16 text-sm font-normal tracking-wide">暂无记录</p>
            ) : (
              history.map((record) => (
                <div
                  key={record.id}
                  className="border border-gray-300 p-6 hover:border-gray-900 transition-colors cursor-pointer group"
                  onClick={() => onSelectRecord(record)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs font-normal text-gray-500 tracking-widest">
                        评级
                      </span>
                      <h3 className="text-lg font-normal text-gray-900 mt-1">
                        {record.result.rating}
                      </h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(record.id);
                      }}
                      className="text-xs font-normal text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      删除
                    </button>
                  </div>
                  <p className="text-sm font-normal text-gray-700 leading-relaxed line-clamp-2 mb-4">
                    {record.dreamText}
                  </p>
                  <p className="text-xs font-normal text-gray-400 tracking-wider">
                    {new Date(record.timestamp).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    }).replace(/\//g, '.')}
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
