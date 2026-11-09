// 100% Original AI Studio 2D Story Illustrations
// Multi-Tier Deployment Architecture:
// Tier 1: Bundled Vite Asset (high-res original)
// Tier 2: Static Public WebP (/images/*.webp - lightweight & fast)
// Tier 3: Static Public JPEG (/images/*.jpg - standard universal)
// Tier 4: Relative Path (./images/*.jpg - subpath & CDN safe)
// Tier 5: Direct Base64 Data URI (100% fail-safe offline & hosting independent)

import schoolGateImg from './images/story_bac_cap_duong_school_gate_1794154525965.jpg';
import portraitImg from './images/story_bac_cap_duong_portrait_1794154524489.jpg';
import cookingImg from './images/story_bac_cap_duong_cooking_1794154527342.jpg';
import eatingImg from './images/story_bac_cap_duong_eating_1794154527502.jpg';
import gratitudeImg from './images/story_bac_cap_duong_gratitude_1794154528190.jpg';

import {
  school_gateBase64,
  portraitBase64,
  cookingBase64,
  eatingBase64,
  gratitudeBase64,
} from './embeddedImages';

export {
  schoolGateImg,
  portraitImg,
  cookingImg,
  eatingImg,
  gratitudeImg,
  school_gateBase64,
  portraitBase64,
  cookingBase64,
  eatingBase64,
  gratitudeBase64,
};

export interface SceneImageConfig {
  primary: string;
  fallbacks: string[];
  base64: string;
  alt: string;
}

export const SCENE_IMAGE_CONFIGS: Record<number, SceneImageConfig> = {
  1: {
    primary: schoolGateImg,
    fallbacks: [
      '/images/school_gate.webp',
      '/images/school_gate.jpg',
      'images/school_gate.jpg',
      school_gateBase64,
    ],
    base64: school_gateBase64,
    alt: 'Cảnh 1: Cổng Trường Mầm Non An Đông buổi sáng rực rỡ nắng vàng',
  },
  2: {
    primary: portraitImg,
    fallbacks: [
      '/images/portrait.webp',
      '/images/portrait.jpg',
      'images/portrait.jpg',
      portraitBase64,
    ],
    base64: portraitBase64,
    alt: 'Cảnh 2: Bác cấp dưỡng hiền hậu trong căn bếp trường mầm non',
  },
  3: {
    primary: portraitImg,
    fallbacks: [
      '/images/portrait.webp',
      '/images/portrait.jpg',
      'images/portrait.jpg',
      portraitBase64,
    ],
    base64: portraitBase64,
    alt: 'Cảnh 3: Trang phục bác cấp dưỡng đội mũ vải trắng, mang tạp dề trắng sạch sẽ',
  },
  4: {
    primary: cookingImg,
    fallbacks: [
      '/images/cooking.webp',
      '/images/cooking.jpg',
      'images/cooking.jpg',
      cookingBase64,
    ],
    base64: cookingBase64,
    alt: 'Cảnh 4: Lựa chọn rau củ tươi sạch, cà rốt, súp lơ và thực phẩm bổ dưỡng',
  },
  5: {
    primary: cookingImg,
    fallbacks: [
      '/images/cooking.webp',
      '/images/cooking.jpg',
      'images/cooking.jpg',
      cookingBase64,
    ],
    base64: cookingBase64,
    alt: 'Cảnh 5: Bác cấp dưỡng nấu nồi canh thơm ngon cho các bé',
  },
  6: {
    primary: eatingImg,
    fallbacks: [
      '/images/eating.webp',
      '/images/eating.jpg',
      'images/eating.jpg',
      eatingBase64,
    ],
    base64: eatingBase64,
    alt: 'Cảnh 6: Bé Mai và các bạn nhỏ vui vẻ ăn cơm dẻo canh ngọt',
  },
  7: {
    primary: gratitudeImg,
    fallbacks: [
      '/images/gratitude.webp',
      '/images/gratitude.jpg',
      'images/gratitude.jpg',
      gratitudeBase64,
    ],
    base64: gratitudeBase64,
    alt: 'Cảnh 7: Bé Mai tặng hoa tươi thắm tri ân bác cấp dưỡng',
  },
  8: {
    primary: portraitImg,
    fallbacks: [
      '/images/portrait.webp',
      '/images/portrait.jpg',
      'images/portrait.jpg',
      portraitBase64,
    ],
    base64: portraitBase64,
    alt: 'Cảnh 8: Các bé khoanh tay lễ phép chào bác, ăn ngoan không làm rơi vãi',
  },
  9: {
    primary: eatingImg,
    fallbacks: [
      '/images/eating.webp',
      '/images/eating.jpg',
      'images/eating.jpg',
      eatingBase64,
    ],
    base64: eatingBase64,
    alt: 'Cảnh 9: Giờ đàm thoại tương tác cùng các bé',
  },
  10: {
    primary: gratitudeImg,
    fallbacks: [
      '/images/gratitude.webp',
      '/images/gratitude.jpg',
      'images/gratitude.jpg',
      gratitudeBase64,
    ],
    base64: gratitudeBase64,
    alt: 'Cảnh 10: Bé ngoan - Bé biết yêu thương, kính trọng và biết ơn',
  },
};
