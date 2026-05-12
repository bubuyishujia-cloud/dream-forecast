export default async function handler(req, res) {
  // 设置 CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: '仅支持 POST 请求' });
  }

  try {
    const { dreamText, emotions } = req.body;

    if (!dreamText) {
      return res.status(400).json({ error: '梦境内容不能为空' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: '服务器未配置 API Key' });
    }

    const emotionText = emotions && emotions.length > 0 ? `\n情绪标签：${emotions.join('、')}` : '';

    const prompt = `你是一位专业的梦境解析师。请分析以下梦境，并以 JSON 格式返回结构化的解析结果。

梦境内容：
${dreamText}${emotionText}

请返回以下格式的 JSON（不要包含任何其他文字，只返回纯 JSON）：
{
  "coreSymbols": ["意象1", "意象2", "意象3"],
  "recentPrediction": "对近期的预示内容，2-3句话",
  "potentialWarning": "潜在的警示内容，1-2句话",
  "todayGuidance": "今日行动指引，2-3句话",
  "rating": "吉/凶/平/奇",
  "ratingReason": "评级理由，1句话"
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: error.error?.message || '调用 API 失败' });
    }

    const data = await response.json();
    const content = data.content[0].text;

    // 提取 JSON 内容
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: '无法解析 API 返回的内容' });
    }

    const result = JSON.parse(jsonMatch[0]);
    res.status(200).json(result);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || '服务器错误' });
  }
}
