// 模拟 AI 解析梦境（无需真实 API）
export async function analyzeDream(dreamText, emotions = []) {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 根据梦境内容和情绪生成模拟结果
  const dreamKeywords = dreamText.toLowerCase();

  // 智能识别梦境关键词
  const symbols = [];
  if (dreamKeywords.includes('飞') || dreamKeywords.includes('天空')) symbols.push('飞翔', '自由');
  if (dreamKeywords.includes('水') || dreamKeywords.includes('海') || dreamKeywords.includes('河')) symbols.push('水', '情感流动');
  if (dreamKeywords.includes('动物') || dreamKeywords.includes('猫') || dreamKeywords.includes('狗')) symbols.push('本能', '陪伴');
  if (dreamKeywords.includes('房子') || dreamKeywords.includes('家')) symbols.push('家', '安全感');
  if (dreamKeywords.includes('路') || dreamKeywords.includes('走')) symbols.push('人生道路', '选择');
  if (dreamKeywords.includes('光') || dreamKeywords.includes('星')) symbols.push('希望', '指引');

  // 如果没有识别到关键词，使用通用意象
  if (symbols.length === 0) {
    symbols.push('潜意识', '内心世界', '情感表达');
  }

  // 根据情绪标签调整评级
  let rating = '平';
  let ratingReason = '梦境平和，反映内心的平静状态';

  if (emotions.includes('焦虑') || emotions.includes('恐惧') || emotions.includes('愤怒')) {
    rating = '凶';
    ratingReason = '梦境反映内心的不安与压力';
  } else if (emotions.includes('喜悦') || emotions.includes('兴奋') || emotions.includes('温暖')) {
    rating = '吉';
    ratingReason = '梦境充满正能量，预示好运';
  } else if (emotions.includes('困惑') || dreamKeywords.includes('奇怪') || dreamKeywords.includes('神秘')) {
    rating = '奇';
    ratingReason = '梦境充满神秘色彩，暗示未知的可能';
  }

  // 生成预示内容
  const predictions = [
    '近期可能会遇到新的机遇，保持开放的心态去迎接变化。内心的直觉会为你指引方向。',
    '人际关系方面会有新的进展，可能是旧友重逢或结识新朋友。珍惜身边的每一份缘分。',
    '工作或学习上会有突破，之前困扰你的问题可能找到解决方案。坚持下去就能看到成果。',
    '情感生活将迎来温暖时刻，与重要的人之间的联系会更加紧密。用心感受这份美好。'
  ];

  const warnings = [
    '注意不要过度劳累，适当休息才能保持最佳状态。',
    '在做重要决定时，多听取他人的建议，避免冲动行事。',
    '留意身边的细节变化，有些信号需要你及时察觉。',
    '保持内心的平衡，不要让外界的纷扰影响你的判断。'
  ];

  const guidance = [
    '今天适合整理思绪，可以通过写日记或冥想来梳理内心。保持积极乐观的心态。',
    '今天是沟通的好日子，主动与他人交流会带来意想不到的收获。真诚待人，收获真心。',
    '今天适合学习新知识或尝试新事物，保持好奇心会让你发现更多可能性。',
    '今天宜静不宜动，给自己一些独处的时间，倾听内心的声音。'
  ];

  return {
    coreSymbols: symbols.slice(0, 3),
    recentPrediction: predictions[Math.floor(Math.random() * predictions.length)],
    potentialWarning: warnings[Math.floor(Math.random() * warnings.length)],
    todayGuidance: guidance[Math.floor(Math.random() * guidance.length)],
    rating: rating,
    ratingReason: ratingReason
  };
}

