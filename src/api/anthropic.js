// 自动检测环境：生产环境使用相对路径，开发环境使用 localhost
const API_URL = import.meta.env.PROD
  ? '/api/analyze-dream'
  : 'http://localhost:3001/api/analyze-dream';

export async function analyzeDream(dreamText, emotions = []) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      dreamText,
      emotions
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '调用 API 失败');
  }

  const result = await response.json();
  return result;
}

