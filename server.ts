import express from 'express';
import path from 'path';
import https from 'https';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // In-memory audio cache for story scenes
  const ttsCache = new Map<string, Buffer>();

  // Primary Neural Voice: Hoài My - crystal clear, gentle, sweet storytelling voice like a TV MC
  async function generateNeuralHoaiMyVoice(text: string, rate = "-6%", pitch = "+1Hz"): Promise<Buffer> {
    const tts = new MsEdgeTTS();
    await tts.setMetadata("vi-VN-HoaiMyNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const stream = tts.toStream(text, {
      rate: rate,
      pitch: pitch,
    });

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.audioStream.on('data', (c: Buffer) => chunks.push(c));
      stream.audioStream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.audioStream.on('error', reject);
    });
  }

  // Secondary Fallback TTS
  function fetchFallbackChunk(text: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=vi&client=tw-ob`;
      https.get(
        url,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        },
        (res) => {
          if (res.statusCode !== 200) {
            reject(new Error(`Fallback TTS failed status: ${res.statusCode}`));
            return;
          }
          const chunks: Buffer[] = [];
          res.on('data', (d) => chunks.push(d));
          res.on('end', () => resolve(Buffer.concat(chunks)));
          res.on('error', reject);
        }
      ).on('error', reject);
    });
  }

  // Main High-Quality Story Voice Generator
  async function getStoryAudio(text: string): Promise<Buffer> {
    if (ttsCache.has(text)) {
      return ttsCache.get(text)!;
    }

    try {
      // 1. Try Hoài My Neural (Crystal-clear, sweet, warm TV MC storytelling voice)
      const buffer = await generateNeuralHoaiMyVoice(text, "-6%", "+1Hz");
      if (buffer && buffer.length > 500) {
        ttsCache.set(text, buffer);
        return buffer;
      }
    } catch (neuralErr) {
      console.warn("Neural voice failed, using fallback:", neuralErr);
    }

    // 2. Fallback to Google Vietnamese TTS chunks
    const rawChunks = text.split(/([.,!?…\n]+)/);
    const chunks: string[] = [];
    let cur = '';
    for (const p of rawChunks) {
      const trimP = p.trim();
      if (!trimP) continue;
      if ((cur + ' ' + trimP).length <= 140) {
        cur = cur ? `${cur} ${trimP}` : trimP;
      } else {
        if (cur) chunks.push(cur);
        cur = trimP;
      }
    }
    if (cur) chunks.push(cur);

    const bufs: Buffer[] = [];
    for (const ch of chunks) {
      const b = await fetchFallbackChunk(ch);
      bufs.push(b);
    }
    const combined = Buffer.concat(bufs);
    ttsCache.set(text, combined);
    return combined;
  }

  // Pre-warm the cache for all 10 story scenes in background with An Dong Hue context
  const initialStoryTexts = [
    "Xin chào các bé yêu của Trường Mầm non An Đông, Thành phố Huế! Hôm nay, cô sẽ kể cho các con nghe một câu chuyện rất gần gũi và thú vị. Câu chuyện có tên là: Bác cấp dưỡng. Các con hãy cùng chú ý lắng nghe nhé!",
    "Tại Trường Mầm non An Đông, có những người luôn âm thầm chăm lo từng bữa ăn cho các con. Đó chính là các cô, các bác cấp dưỡng. Các bác làm việc chăm chỉ để chuẩn bị những món ăn ngon cho các bé mỗi ngày.",
    "Các cô, các bác cấp dưỡng mang tạp dề trắng, đội mũ vải trắng trông rất gọn gàng và sạch sẽ.",
    "Hằng ngày, các cô, các bác đi chợ, mua về rau tươi, quả chín, thịt, trứng…",
    "…và nấu thành nhiều món ăn ngon lành mà các bạn rất ưa thích. Các bác luôn cẩn thận trong từng công việc để bữa ăn của các con được ngon miệng và sạch sẽ.",
    "Mai và các bạn Trường Mầm non An Đông được ăn cơm dẻo, canh ngọt là nhờ công lao của các cô, các bác cấp dưỡng.",
    "Các con thấy không, để có những bữa ăn ngon, các cô, các bác cấp dưỡng đã phải làm việc rất vất vả. Vì vậy, chúng mình hãy biết yêu quý, kính trọng và nói lời cảm ơn các cô, các bác nhé!",
    "Các con hãy biết yêu quý, lễ phép và nghe lời các cô, các bác cấp dưỡng. Khi ăn cơm, các con nhớ ăn ngoan, ăn hết suất và không làm rơi vãi thức ăn nhé!",
    "Bây giờ, cô có một vài câu hỏi dành cho các con nhé! Một: Trong câu chuyện có những ai? Hai: Các cô, các bác cấp dưỡng mặc trang phục như thế nào? Ba: Các cô, các bác đi chợ mua những thực phẩm gì? Bốn: Mai và các bạn được ăn cơm dẻo, canh ngọt là nhờ công lao của ai? Các con giỏi lắm! Cô khen tất cả các con!",
    "Câu chuyện Bác cấp dưỡng đến đây là hết rồi. Chúc các bé Trường Mầm non An Đông, Thành phố Huế luôn chăm ngoan, học giỏi và biết yêu thương mọi người. Cô yêu các con!"
  ];

  setTimeout(async () => {
    console.log("Pre-warming story audio with sweet crystal-clear Hoài My voice...");
    for (const t of initialStoryTexts) {
      try {
        await getStoryAudio(t);
      } catch (e) {
        console.warn("Pre-warm failed for a scene:", e);
      }
    }
    console.log("All story scenes pre-warmed successfully!");
  }, 1000);

  // Audio API endpoint
  app.get('/api/tts', async (req, res) => {
    try {
      const text = (req.query.text as string || '').trim();
      if (!text) {
        return res.status(400).json({ error: 'Text parameter is required' });
      }

      const audioBuffer = await getStoryAudio(text);

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(audioBuffer);
    } catch (err: any) {
      console.error('TTS error:', err);
      res.status(500).json({ error: 'Failed to generate Vietnamese speech', details: err.message });
    }
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', voice: 'vi-VN-HoaiMyNeural', quality: 'sweet-crystal-clear' });
  });

  // Vite middleware in dev or static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bác Cấp Dưỡng Story Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
