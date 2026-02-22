export default {
  name: 'quant-fetcher',
  description: '獲取指定美國股票的即時量化報價數據，包含最新股價及前日收盤價。必須提供股票代號 (symbol)。',
  parameters: {
    type: 'object',
    properties: {
      symbol: { type: 'string', description: '股票代號，例如 TSLA' },
    },
    required: ['symbol'],
  },
  execute: async ({ symbol }) => {
    const API_KEY = 'd6cksvpr01qsiik2jrdg';
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) return { error: `API 錯誤: ${data.error}` };
      return { 
        symbol: symbol, 
        current_price: data.c, 
        high_price_today: data.h, 
        low_price_today: data.l, 
        previous_close: data.pc, 
        data_source: 'Finnhub API' 
      };
    } catch (error) {
      return { error: `獲取數據失敗: ${error.message}` };
    }
  },
};
