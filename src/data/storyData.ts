import { StoryScene, QuizQuestion } from '../types/story';

export const STORY_TITLE = "Bác Cấp Dưỡng";
export const STORY_SUBTITLE = "Trường Mầm Non An Đông, Thành Phố Huế";
export const SCHOOL_NAME = "Trường Mầm Non An Đông, Thành Phố Huế";
export const STORY_MESSAGE = "BÉ BIẾT YÊU THƯƠNG – BÉ BIẾT KÍNH TRỌNG – BÉ BIẾT ƠN";

export const SCENES: StoryScene[] = [
  {
    id: 1,
    title: "CẢNH 1. CHÀO CÁC BÉ TRƯỜNG MẦM NON AN ĐÔNG",
    durationSeconds: 15,
    narrationText: "Xin chào các bé yêu của Trường Mầm non An Đông, Thành phố Huế! Hôm nay, cô sẽ kể cho các con nghe một câu chuyện rất gần gũi và thú vị. Câu chuyện có tên là: Bác cấp dưỡng. Các con hãy cùng chú ý lắng nghe nhé!",
    imagePath: "/src/assets/images/story_bac_cap_duong_school_gate_1794154525965.jpg",
    cameraMotion: "gentle-push",
    visualDescription: "Cổng Trường Mầm non An Đông, Thành phố Huế vào buổi sáng, nắng vàng, cây xanh, hoa nhiều màu sắc. Các bé vui vẻ đến trường, cô giáo đứng chào đón.",
    motionDescription: "Nắng lung linh, hoa khẽ đung đưa, các bé bước đi nhẹ nhàng, camera tiến gần cổng trường.",
    characterFocus: "Cô giáo và các bé mầm non An Đông",
    interactiveTips: ["Chạm vào những bông hoa để thấy hoa nở xinh", "Chạm vào tia nắng vàng buổi sớm"]
  },
  {
    id: 2,
    title: "CẢNH 2. GIỚI THIỆU BÁC CẤP DƯỠNG",
    durationSeconds: 17,
    narrationText: "Tại Trường Mầm non An Đông, có những người luôn âm thầm chăm lo từng bữa ăn cho các con. Đó chính là các cô, các bác cấp dưỡng. Các bác làm việc chăm chỉ để chuẩn bị những món ăn ngon cho các bé mỗi ngày.",
    imagePath: "/src/assets/images/story_bac_cap_duong_portrait_1794154524489.jpg",
    cameraMotion: "zoom-in",
    visualDescription: "Bác cấp dưỡng xuất hiện trong căn bếp trường mầm non sạch sẽ, tươi sáng, thân thiện.",
    motionDescription: "Bác cấp dưỡng mỉm cười, hơi nước bay nhẹ, camera tiến gần nhân vật.",
    characterFocus: "Bác cấp dưỡng hiền từ",
    interactiveTips: ["Chạm vào bác cấp dưỡng để nghe bác chào", "Chạm vào nồi súp để thấy hơi nước bốc lên"]
  },
  {
    id: 3,
    title: "CẢNH 3. TRANG PHỤC SẠCH SẼ",
    durationSeconds: 18,
    narrationText: "Các cô, các bác cấp dưỡng mang tạp dề trắng, đội mũ vải trắng trông rất gọn gàng và sạch sẽ.",
    imagePath: "/src/assets/images/story_bac_cap_duong_portrait_1794154524489.jpg",
    cameraMotion: "focus-detail",
    visualDescription: "Cận cảnh bác cấp dưỡng đội mũ vải trắng, mặc tạp dề trắng, gương mặt hiền hậu.",
    motionDescription: "Camera từ từ tiến gần trang phục, bác cấp dưỡng mỉm cười và gật đầu nhẹ.",
    characterFocus: "Mũ vải trắng và tạp dề trắng sạch sẽ",
    interactiveTips: ["Mũ vải trắng giúp giữ tóc luôn gọn gàng", "Tạp dề trắng giúp bảo đảm vệ sinh an toàn thực phẩm"]
  },
  {
    id: 4,
    title: "CẢNH 4. ĐI CHỢ MUA THỰC PHẨM",
    durationSeconds: 20,
    narrationText: "Hằng ngày, các cô, các bác đi chợ, mua về rau tươi, quả chín, thịt, trứng…",
    imagePath: "/src/assets/images/story_bac_cap_duong_cooking_1794154527342.jpg",
    cameraMotion: "pan-horizontal",
    visualDescription: "Bác cấp dưỡng đi chợ, lựa chọn rau xanh, quả chín, thịt và trứng. Khu chợ sạch sẽ, nhiều màu sắc.",
    motionDescription: "Bác lựa rau, các loại trái cây hiện lên sinh động, camera chuyển động ngang qua các quầy hàng.",
    characterFocus: "Rau xanh, cà rốt, cà chua, súp lơ và thực phẩm tươi sống",
    interactiveTips: ["Chạm vào giỏ rau củ để bé nhận biết màu sắc rau củ", "Rau xanh và củ quả cung cấp nhiều vitamin"]
  },
  {
    id: 5,
    title: "CẢNH 5. CHUẨN BỊ VÀ NẤU ĂN",
    durationSeconds: 20,
    narrationText: "…và nấu thành nhiều món ăn ngon lành mà các bạn rất ưa thích. Các bác luôn cẩn thận trong từng công việc để bữa ăn của các con được ngon miệng và sạch sẽ.",
    imagePath: "/src/assets/images/story_bac_cap_duong_cooking_1794154527342.jpg",
    cameraMotion: "steady-glow",
    visualDescription: "Bác cấp dưỡng rửa rau, sơ chế thực phẩm, nấu một nồi canh thơm ngon trong căn bếp sạch sẽ.",
    motionDescription: "Nước chảy nhẹ khi rửa rau, bác đảo nồi canh, hơi nước bốc lên, camera di chuyển chậm.",
    characterFocus: "Bác cấp dưỡng nấu canh thơm ngon",
    interactiveTips: ["Chạm vào ngọn lửa nhỏ để bác đảo canh", "Hơi canh thơm lừng bay lên ấm áp"]
  },
  {
    id: 6,
    title: "CẢNH 6. NHỮNG BỮA ĂN NGON",
    durationSeconds: 20,
    narrationText: "Mai và các bạn Trường Mầm non An Đông được ăn cơm dẻo, canh ngọt là nhờ công lao của các cô, các bác cấp dưỡng.",
    imagePath: "/src/assets/images/story_bac_cap_duong_eating_1794154527502.jpg",
    cameraMotion: "zoom-in",
    visualDescription: "Bé Mai và các bạn ngồi ăn tại bàn ăn trường mầm non. Trên bàn có cơm trắng, canh rau và thức ăn.",
    motionDescription: "Các bé vui vẻ ăn cơm, bé Mai mỉm cười, camera tiến gần bàn ăn.",
    characterFocus: "Bé Mai (váy vàng, tóc buộc 2 bên) và các bạn ăn cơm ngoan",
    interactiveTips: ["Bé Mai ăn hết suất cơm", "Cơm dẻo canh ngọt thơm ngon bổ dưỡng"]
  },
  {
    id: 7,
    title: "CẢNH 7. BÉ BIẾT ƠN BÁC CẤP DƯỠNG",
    durationSeconds: 20,
    narrationText: "Các con thấy không, để có những bữa ăn ngon, các cô, các bác cấp dưỡng đã phải làm việc rất vất vả. Vì vậy, chúng mình hãy biết yêu quý, kính trọng và nói lời cảm ơn các cô, các bác nhé!",
    imagePath: "/src/assets/images/story_bac_cap_duong_gratitude_1794154528190.jpg",
    cameraMotion: "gentle-push",
    visualDescription: "Bé Mai cầm bó hoa nhỏ tặng bác cấp dưỡng. Các bạn đứng bên cạnh vui vẻ.",
    motionDescription: "Bé Mai đưa bó hoa, bác cấp dưỡng cúi nhẹ mỉm cười, các bạn vỗ tay vui vẻ.",
    characterFocus: "Bé Mai tặng hoa, lòng biết ơn chân thành",
    interactiveTips: ["Bé tặng hoa tươi thắm tri ấn bác", "Cùng vỗ tay khen các bạn nhỏ ngoan"]
  },
  {
    id: 8,
    title: "CẢNH 8. BÉ LỄ PHÉP",
    durationSeconds: 15,
    narrationText: "Các con hãy biết yêu quý, lễ phép và nghe lời các cô, các bác cấp dưỡng. Khi ăn cơm, các con nhớ ăn ngoan, ăn hết suất và không làm rơi vãi thức ăn nhé!",
    imagePath: "/src/assets/images/story_bac_cap_duong_portrait_1794154524489.jpg",
    cameraMotion: "steady-glow",
    visualDescription: "Các bé khoanh tay lễ phép chào bác cấp dưỡng trong căn bếp trường mầm non.",
    motionDescription: "Các bé khoanh tay chào, bác cấp dưỡng mỉm cười, các nhân vật chuyển động nhẹ nhàng.",
    characterFocus: "Bé khoanh tay lễ phép, ăn ngoan không rơi vãi",
    interactiveTips: ["Khoanh tay chào bác lễ phép", "Nhớ ăn hết suất cơm để mau lớn khỏe mạnh"]
  },
  {
    id: 9,
    title: "CẢNH 9. ĐÀM THOẠI CÙNG CÁC BÉ",
    durationSeconds: 25,
    narrationText: "Bây giờ, cô có một vài câu hỏi dành cho các con nhé! Một: Trong câu chuyện có những ai? Hai: Các cô, các bác cấp dưỡng mặc trang phục như thế nào? Ba: Các cô, các bác đi chợ mua những thực phẩm gì? Bốn: Mai và các bạn được ăn cơm dẻo, canh ngọt là nhờ công lao của ai? Các con giỏi lắm! Cô khen tất cả các con!",
    imagePath: "/src/assets/images/story_bac_cap_duong_eating_1794154527502.jpg",
    cameraMotion: "steady-glow",
    visualDescription: "Cô giáo đứng trước lớp, các bé ngồi ngay ngắn, hào hứng giơ tay phát biểu.",
    motionDescription: "Từng câu hỏi hiện lên rõ ràng, có chế độ dừng để trẻ trả lời, nút Cô hỏi lại và Tiếp tục.",
    characterFocus: "Giờ đàm thoại tương tác sinh động của cô và trò",
    interactiveTips: ["Giáo viên bấm vào từng câu hỏi để cho trẻ trả lời", "Bé bấm chọn đáp án đúng để nhận ngôi sao khen ngợi"]
  },
  {
    id: 10,
    title: "CẢNH 10. KẾT THÚC CÂU CHUYỆN",
    durationSeconds: 10,
    narrationText: "Câu chuyện Bác cấp dưỡng đến đây là hết rồi. Chúc các bé Trường Mầm non An Đông, Thành phố Huế luôn chăm ngoan, học giỏi và biết yêu thương mọi người. Cô yêu các con!",
    imagePath: "/src/assets/images/story_bac_cap_duong_gratitude_1794154528190.jpg",
    cameraMotion: "celebrate",
    visualDescription: "Bác cấp dưỡng, bé Mai và các bạn đứng bên nhau, cùng vẫy tay vui vẻ. Nền là sân trường mầm non đầy hoa.",
    motionDescription: "Các nhân vật vẫy tay, hoa bay nhẹ, hiệu ứng kết thúc dịu dàng.",
    characterFocus: "Thông điệp: BÉ NGOAN – BIẾT YÊU THƯƠNG – BIẾT ƠN",
    interactiveTips: ["Các nhân vật vẫy tay chào tạm biệt các bé", "Bé luôn ghi nhớ công ơn các bác cấp dưỡng"]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    numberText: "Câu hỏi 1",
    question: "Trong câu chuyện có những nhân vật nào?",
    hint: "Các con hãy nhớ lại ai nấu cơm cho bé và ai đã tặng hoa nhé!",
    options: [
      { text: "Bác cấp dưỡng, Bé Mai và các bạn nhỏ", isCorrect: true, icon: "👩‍🍳👧👦" },
      { text: "Bác bảo vệ và các chú công an", isCorrect: false, icon: "👮‍♂️" },
      { text: "Chú phi công lái máy bay", isCorrect: false, icon: "✈️" }
    ],
    explanation: "Đúng rồi! Trong câu chuyện có Bác cấp dưỡng hiền hậu, bé Mai mặc váy vàng và các bạn nhỏ mầm non đáng yêu!"
  },
  {
    id: 2,
    numberText: "Câu hỏi 2",
    question: "Các cô, các bác cấp dưỡng mặc trang phục như thế nào?",
    hint: "Bác đội mũ gì và mặc chiếc tạp dề màu gì nhỉ?",
    options: [
      { text: "Đội mũ vải trắng, mang tạp dề trắng sạch sẽ", isCorrect: true, icon: "🧑‍🍳" },
      { text: "Mặc áo mưa và đội mũ bảo hiểm", isCorrect: false, icon: "🛵" },
      { text: "Mặc trang phục múa lộng lẫy", isCorrect: false, icon: "💃" }
    ],
    explanation: "Chính xác! Bác cấp dưỡng đội mũ vải trắng và mang tạp dề trắng rất gọn gàng, sạch sẽ để đảm bảo vệ sinh an toàn thực phẩm!"
  },
  {
    id: 3,
    numberText: "Câu hỏi 3",
    question: "Hằng ngày, các cô, các bác đi chợ mua những thực phẩm gì?",
    hint: "Có rau tươi, quả chín, thịt và gì nữa các con?",
    options: [
      { text: "Rau tươi, quả chín, thịt, trứng…", isCorrect: true, icon: "🥦🍎🥩🥚" },
      { text: "Chỉ mua kẹo ngọt và nước ngọt có gas", isCorrect: false, icon: "🍭" },
      { text: "Đồ chơi xếp hình và bút chì màu", isCorrect: false, icon: "🧩" }
    ],
    explanation: "Hoan hô các con! Bác cấp dưỡng chọn mua rau tươi, quả ngọt chín mọng, thịt tươi và trứng bổ dưỡng để nấu cho các bé ăn!"
  },
  {
    id: 4,
    numberText: "Câu hỏi 4",
    question: "Mai và các bạn được ăn cơm dẻo, canh ngọt là nhờ công lao của ai?",
    hint: "Ai đã vất vả trong căn bếp để nấu những bữa ăn ngon?",
    options: [
      { text: "Nhờ công lao của các cô, các bác cấp dưỡng", isCorrect: true, icon: "❤️🥣" },
      { text: "Tự nhiên cơm canh có sẵn trên bàn", isCorrect: false, icon: "❓" },
      { text: "Nhờ người lạ mang đến", isCorrect: false, icon: "🚶" }
    ],
    explanation: "Các con trả lời rất xuất sắc! Nhờ công lao vất vả, chu đáo của các cô bác cấp dưỡng mà chúng mình mới có những bữa cơm dẻo canh ngọt thơm ngon mỗi ngày!"
  }
];

export const CHARACTERS_INFO = [
  {
    name: "Bác cấp dưỡng",
    role: "Người chăm lo từng bữa ăn ngon cho các bé",
    appearance: "Phụ nữ Việt Nam trung niên, gương mặt tròn hiền hậu, nụ cười ấm áp, tóc đen búi gọn, đội mũ vải trắng, mặc áo sáng màu và tạp dề trắng sạch sẽ.",
    moral: "Âm thầm, tận tụy nấu từng bữa cơm dẻo canh ngọt bổ dưỡng."
  },
  {
    name: "Bé Mai",
    role: "Học sinh lớp mầm non 5 tuổi",
    appearance: "Bé gái đáng yêu, mắt sáng ngời, tóc đen buộc hai bên xinh xắn, mặc váy màu vàng tươi, đi giày màu hồng.",
    moral: "Ngoan ngoãn, ăn hết suất cơm, biết tặng hoa và cảm ơn bác cấp dưỡng."
  },
  {
    name: "Các bạn nhỏ",
    role: "Các bé học sinh mầm non 4-5 tuổi",
    appearance: "Nhóm trẻ em Việt Nam vui vẻ, hồn nhiên, trang phục nhiều màu sắc rực rỡ, bàn ăn gọn gàng.",
    moral: "Khoanh tay lễ phép chào bác, ăn ngoan không làm rơi vãi."
  }
];
