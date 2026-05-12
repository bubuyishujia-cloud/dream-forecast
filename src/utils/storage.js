const STORAGE_KEY = 'dream_forecast_history';

export function saveDreamRecord(record) {
  const history = getDreamHistory();
  const newRecord = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...record
  };
  history.unshift(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return newRecord;
}

export function getDreamHistory() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function deleteDreamRecord(id) {
  const history = getDreamHistory();
  const filtered = history.filter(record => record.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function exportHistory() {
  const history = getDreamHistory();
  const dataStr = JSON.stringify(history, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dream-forecast-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function importHistory(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (Array.isArray(data)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          resolve(data.length);
        } else {
          reject(new Error('无效的 JSON 格式'));
        }
      } catch (error) {
        reject(new Error('文件解析失败'));
      }
    };
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsText(file);
  });
}

export function generateShareUrl(record) {
  const data = {
    dream: record.dreamText,
    emotions: record.emotions,
    result: record.result,
    timestamp: record.timestamp
  };
  const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
  return `${window.location.origin}${window.location.pathname}?share=${encoded}`;
}

export function parseShareUrl() {
  const params = new URLSearchParams(window.location.search);
  const shareData = params.get('share');
  if (!shareData) return null;

  try {
    const decoded = JSON.parse(decodeURIComponent(atob(shareData)));
    return decoded;
  } catch (error) {
    console.error('解析分享链接失败:', error);
    return null;
  }
}

