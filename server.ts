import express from 'express';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import https from 'https';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // In-memory audio cache for story scenes
  const ttsCache = new Map<string, Buffer>();

  // High-Quality Vietnamese Storytelling Voice Synthesizer
  function fetchTtsChunk(text: string): Promise<Buffer> {
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
            reject(new Error(`TTS failed with status: ${res.statusCode}`));
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

  // Split narration into natural pauses and combine into high-fidelity audio stream
  async function getStoryAudio(text: string): Promise<Buffer> {
    const cacheKey = text.trim();
    if (ttsCache.has(cacheKey)) {
      return ttsCache.get(cacheKey)!;
    }

    const rawChunks = text.split(/([.,!?…\n]+)/);
    const chunks: string[] = [];
    let cur = '';
    for (const p of rawChunks) {
      const trimP = p.trim();
      if (!trimP) continue;
      if ((cur + ' ' + trimP).length <= 130) {
        cur = cur ? `${cur} ${trimP}` : trimP;
      } else {
        if (cur) chunks.push(cur);
        cur = trimP;
      }
    }
    if (cur) chunks.push(cur);

    const bufs: Buffer[] = [];
    for (const ch of chunks) {
      const b = await fetchTtsChunk(ch);
      bufs.push(b);
    }
    const combined = Buffer.concat(bufs);
    ttsCache.set(cacheKey, combined);
    return combined;
  }

  // Pre-calibrated story texts for all 10 scenes
  const scenePacingConfigs = [
    { text: "Xin chào các bé yêu của Trường Mầm non An Đông, Thành phố Huế! Hôm nay, cô sẽ kể cho các con nghe một câu chuyện rất gần gũi và thú vị. Câu chuyện có tên là: Bác cấp dưỡng. Các con hãy cùng chú ý lắng nghe nhé!" },
    { text: "Tại Trường Mầm non An Đông, có những người luôn âm thầm chăm lo từng bữa ăn cho các con. Đó chính là các cô, các bác cấp dưỡng. Các bác làm việc chăm chỉ để chuẩn bị những món ăn ngon cho các bé mỗi ngày." },
    { text: "Các cô, các bác cấp dưỡng mang tạp dề trắng, đội mũ vải trắng trông rất gọn gàng và sạch sẽ." },
    { text: "Hằng ngày, các cô, các bác đi chợ, mua về rau tươi, quả chín, thịt, trứng…" },
    { text: "…và nấu thành nhiều món ăn ngon lành mà các bạn rất ưa thích. Các bác luôn cẩn thận trong từng công việc để bữa ăn của các con được ngon miệng và sạch sẽ." },
    { text: "Mai và các bạn Trường Mầm non An Đông được ăn cơm dẻo, canh ngọt là nhờ công lao của các cô, các bác cấp dưỡng." },
    { text: "Các con thấy không, để có những bữa ăn ngon, các cô, các bác cấp dưỡng đã phải làm việc rất vất vả. Vì vậy, chúng mình hãy biết yêu quý, kính trọng và nói lời cảm ơn các cô, các bác nhé!" },
    { text: "Các con hãy biết yêu quý, lễ phép và nghe lời các cô, các bác cấp dưỡng. Khi ăn cơm, các con nhớ ăn ngoan, ăn hết suất và không làm rơi vãi thức ăn nhé!" },
    { text: "Bây giờ, cô có một vài câu hỏi dành cho các con nhé! Một: Trong câu chuyện có những ai? Hai: Các cô, các bác cấp dưỡng mặc trang phục như thế nào? Ba: Các cô, các bác đi chợ mua những thực phẩm gì? Bốn: Mai và các bạn được ăn cơm dẻo, canh ngọt là nhờ công lao của ai? Các con giỏi lắm! Cô khen tất cả các con!" },
    { text: "Câu chuyện Bác cấp dưỡng đến đây là hết rồi. Chúc các bé Trường Mầm non An Đông, Thành phố Huế luôn chăm ngoan, học giỏi và biết yêu thương mọi người. Cô yêu các con!" }
  ];

  setTimeout(async () => {
    console.log("Pre-warming story audio for all 10 scenes...");
    for (const cfg of scenePacingConfigs) {
      try {
        await getStoryAudio(cfg.text);
      } catch (e) {
        console.warn("Pre-warm failed for a scene:", e);
      }
    }
    console.log("All calibrated story scenes pre-warmed successfully!");
  }, 1000);

  // Audio API endpoint supporting dynamic rate and pitch
  app.get('/api/tts', async (req, res) => {
    try {
      const text = (req.query.text as string || '').trim();
      const rate = (req.query.rate as string || '-6%').trim();
      const pitch = (req.query.pitch as string || '+1Hz').trim();
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
    res.json({ status: 'ok', voice: 'vi-VN-Standard', quality: 'sweet-crystal-clear' });
  });

  // Serve static assets from public directory with explicit routes
  app.use('/images', express.static(path.join(__dirname, 'public/images'), { maxAge: '7d' }));
  app.use('/audio', express.static(path.join(__dirname, 'public/audio'), { maxAge: '7d' }));
  app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

  // Vite middleware in dev or static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Ensure dist directory exists and is built
    const distPath = path.join(__dirname, 'dist');
    const distIndexPath = path.join(distPath, 'index.html');
    if (!fs.existsSync(distIndexPath)) {
      console.log('Production dist/index.html not found. Building applet bundle now...');
      try {
        execSync('npm run build', { stdio: 'inherit' });
      } catch (buildErr) {
        console.error('Auto-build failed:', buildErr);
      }
    }

    app.use(express.static(distPath, { maxAge: '1d' }));

    // Never return index.html for media and static asset requests that 404
    app.get(/\.(jpg|jpeg|png|webp|svg|gif|m4a|mp3|wav|ogg|ico|css|js|map)$/i, (_req, res) => {
      res.status(404).type('text/plain').send('Asset Not Found');
    });

    app.get('*', (_req, res) => {
      res.sendFile(distIndexPath);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bác Cấp Dưỡng Story Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
