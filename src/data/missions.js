// ──────────────────────────────────────────────────────
//  MISSION DECISION – Game Configuration & Mission Data
//  Course: Kinh tế Chính trị Mác-Lênin (MLN122)
//  Theme:  Hiện tượng Moderna – case study về ĐQNN/CNTB
// ──────────────────────────────────────────────────────

export const GAME_CONFIG = {
  missionTitle: 'Hiện tượng Moderna',
  missionSubtitle: 'Biểu hiện mới của độc quyền nhà nước trong CNTB',
  subject: 'Kinh tế Chính trị Mác-Lênin · MLN122',
  roomCode: '847291',
  timeLimit: 20,          // seconds per decision
  storyDuration: 8,       // seconds to show story before question
  totalChapters: 10,
};

export const ACHIEVEMENTS = [
  { id: 'vaccine_hero',     label: 'Vaccine Hero',       desc: 'Hoàn thành toàn bộ nhiệm vụ' },
  { id: 'policy_expert',    label: 'Policy Expert',      desc: 'Trả lời đúng 5+ câu liên tiếp' },
  { id: 'research_master',  label: 'Research Master',    desc: 'Điểm Research cao nhất' },
  { id: 'economic_strat',   label: 'Economic Strategist',desc: 'Điểm Economy cao nhất' },
  { id: 'fast_thinker',     label: 'Fast Thinker',       desc: 'Trả lời dưới 5 giây' },
  { id: 'perfect_combo',    label: 'Perfect Combo',      desc: 'Combo x3 trở lên' },
  { id: 'warp_speed',       label: 'Warp Speed',         desc: 'Đạt điểm tốc độ tối đa' },
  { id: 'strategist',       label: 'Strategic Advisor',  desc: 'Điểm cao nhất trong trò chơi' },
];

export const MISSIONS = [
  {
    id: 1,
    chapter: 1,
    chapterName: 'Nghiên cứu',
    stage: 'Hồ sơ 1',
    title: 'Lý luận của Lênin',
    shortTitle: 'Hồ sơ 1',
    color: '#2563EB',
    storyText:
      'Năm 2020. COVID-19 bùng phát dữ dội — bệnh viện quá tải, hàng triệu người tử vong trên toàn thế giới. ' +
      'Moderna, một công ty công nghệ sinh học nhỏ tại Massachusetts, có công nghệ mRNA đầy hứa hẹn nhưng chưa được kiểm chứng trên người. ' +
      'Câu hỏi đặt ra: Thị trường tự do liệu có đủ để giải quyết cuộc khủng hoảng này?\n\n' +
      'Bạn đang là cố vấn chiến lược của Chính phủ. Hãy vận dụng lý luận của V.I. Lênin để phân tích.',
    description: 'Theo V.I. Lênin, tự do cạnh tranh tất yếu dẫn đến một hệ quả kinh tế quan trọng — nền tảng lý luận giải thích sự ra đời của độc quyền.',
    question: 'Theo V.I. Lênin, tự do cạnh tranh đẻ ra ________ và sự tập trung sản xuất này khi phát triển tới một mức độ nhất định lại dẫn tới độc quyền.',
    choices: [
      { id: 'A', text: 'Tích lũy tư bản',         indicators: { innovation: -5, strategy: 10, publicHealth: -5,  collaboration: 0,  economy: 5, risk: 10 } },
      { id: 'B', text: 'Chuyên môn hóa lao động', indicators: { innovation: 5,  strategy: 0,  publicHealth: 5,   collaboration: 10, economy: 0, risk: 10 } },
      { id: 'C', text: 'Tập trung sản xuất',       indicators: { innovation: 20, strategy: -5, publicHealth: 15,  collaboration: 20, economy: 15, risk: 10 } },
      { id: 'D', text: 'Toàn cầu hóa',             indicators: { innovation: 0,  strategy: -10,publicHealth: 0,   collaboration: -5, economy: 20, risk: 10 } },
    ],
    correct: 'C',
    explanation:
      'Tự do cạnh tranh → tập trung sản xuất → tập trung đến mức độ nhất định → độc quyền. ' +
      'Đây là quy luật cơ bản Lênin chỉ ra trong tác phẩm "Chủ nghĩa đế quốc, giai đoạn tột cùng của CNTB" (1917). ' +
      'Trong thực tế case Moderna: sự cạnh tranh dữ dội trong ngành dược phẩm đã dẫn đến chỉ một số ít tập đoàn lớn (Pfizer, Moderna, J&J) ' +
      'kiểm soát thị trường vaccine toàn cầu — đây là biểu hiện sống động nhất của quy luật Lênin trong thế kỷ 21.',
    references: [
      'V.I. Lênin, "Chủ nghĩa đế quốc, giai đoạn tột cùng của CNTB" (1917)',
      'Giáo trình Kinh tế Chính trị Mác-Lênin, Bộ GD&ĐT (2021)',
    ],
    timeLimit: 20,
  },
  {
    id: 2,
    chapter: 2,
    chapterName: 'Tài trợ',
    stage: 'Hồ sơ 2',
    title: 'Case Moderna',
    shortTitle: 'Hồ sơ 2',
    color: '#14B8A6',
    storyText:
      'Moderna cần hàng tỷ đô la để phát triển vaccine. Nhà đầu tư tư nhân e dè — không ai biết vaccine có thành công không. ' +
      'Nếu thất bại, hàng trăm triệu USD sẽ biến mất. Thị trường không muốn gánh rủi ro này.\n\n' +
      'Chính phủ Mỹ đứng trước lựa chọn lịch sử: Có nên dùng ngân sách công hỗ trợ một doanh nghiệp tư nhân? ' +
      'Nếu có, họ hỗ trợ bằng những cách nào?',
    description: 'Nhà nước Mỹ không chỉ đứng ngoài mà trực tiếp tham gia hỗ trợ Moderna trên nhiều phương diện.',
    question: 'Nhà nước Mỹ hỗ trợ Moderna không chỉ bằng tiền, mà còn thông qua nghiên cứu công, cấp phép, sản xuất, logistics và...',
    choices: [
      { id: 'A', text: 'Quảng cáo', indicators: { innovation: 0,  strategy: -15, publicHealth: 5,  collaboration: 0,  economy: 0, risk: 10 } },
      { id: 'B', text: 'Tiếp thị',  indicators: { innovation: 0,  strategy: -10, publicHealth: 10, collaboration: 0,  economy: 5, risk: 10 } },
      { id: 'C', text: 'Xuất khẩu', indicators: { innovation: 0,  strategy: -5,  publicHealth: 5,  collaboration: 10, economy: 20, risk: 10 } },
      { id: 'D', text: 'Phân phối', indicators: { innovation: 15, strategy: -20, publicHealth: 25, collaboration: 20, economy: 20, risk: 10 } },
    ],
    correct: 'D',
    explanation:
      'Nhà nước Mỹ hỗ trợ toàn diện: NIH đóng góp bằng sáng chế mRNA nền tảng; BARDA rót 955 triệu USD tài trợ nghiên cứu; ' +
      'FDA cấp EUA (Emergency Use Authorization) rút ngắn quy trình từ 10 năm xuống 11 tháng; ' +
      'Operation Warp Speed điều phối sản xuất & logistics; và mạng lưới y tế công phân phối vaccine đến toàn dân. ' +
      'Đây là sự can thiệp nhà nước toàn diện vào chuỗi giá trị — từ phòng nghiên cứu đến cánh tay người dân.',
    references: [
      'NIH News Release: "NIH and Moderna Develop New Vaccine Platform" (2020)',
      'BARDA Annual Report 2020 – COVID-19 Medical Countermeasures',
      'Operation Warp Speed – HHS Official Report (2021)',
    ],
    timeLimit: 20,
  },
  {
    id: 3,
    chapter: 3,
    chapterName: 'Chia sẻ rủi ro',
    stage: 'Hồ sơ 3',
    title: 'BARDA',
    shortTitle: 'Hồ sơ 3',
    color: '#8B5CF6',
    storyText:
      'BARDA — Cơ quan Nghiên cứu và Phát triển Y sinh Nâng cao — quyết định rót 955 triệu USD cho Moderna ' +
      'khi vaccine chưa được chứng minh hiệu quả trên người. Đây là một canh bạc khổng lồ với tiền thuế của người dân.\n\n' +
      'Vì sao Nhà nước lại chấp nhận rủi ro mà thị trường từ chối? ' +
      'Đây chính là bản chất sâu xa của can thiệp nhà nước vào nền kinh tế tư bản.',
    description: 'BARDA là công cụ tài chính then chốt của Nhà nước Mỹ trong case Moderna.',
    question: 'Trong case Moderna, Nhà nước Mỹ dùng ngân sách công để chia sẻ ________ nghiên cứu cho doanh nghiệp.',
    choices: [
      { id: 'A', text: 'Lợi nhuận', indicators: { innovation: -10, strategy: 15,  publicHealth: -15, collaboration: -5, economy: 10, risk: 10 } },
      { id: 'B', text: 'Chi phí',   indicators: { innovation: 10,  strategy: -25, publicHealth: 5,   collaboration: 10, economy: 5, risk: 10 } },
      { id: 'C', text: 'Rủi ro',    indicators: { innovation: 25,  strategy: -20, publicHealth: 20,  collaboration: 15, economy: 20, risk: 10 } },
      { id: 'D', text: 'Thuế',      indicators: { innovation: -5,  strategy: 10,  publicHealth: -10, collaboration: -5, economy: -5, risk: 10 } },
    ],
    correct: 'C',
    explanation:
      'BARDA tài trợ để chia sẻ rủi ro nghiên cứu — nếu vaccine thất bại, Moderna không chịu toàn bộ thiệt hại. ' +
      'Đây là hình thức "xã hội hóa rủi ro, tư nhân hóa lợi nhuận": Nhà nước gánh rủi ro thất bại, ' +
      'còn Moderna thu lợi nhuận khổng lồ khi vaccine thành công (vốn hóa Moderna tăng từ 7 tỷ lên 180 tỷ USD). ' +
      'Mô hình này phản ánh bản chất của độc quyền nhà nước trong CNTB hiện đại.',
    references: [
      'Mariana Mazzucato, "The Entrepreneurial State" (2013)',
      'BARDA CBRN Portfolio – COVID-19 Emergency Response (2020)',
      'MIT Technology Review: "The Race for a COVID-19 Vaccine" (2021)',
    ],
    timeLimit: 20,
  },
  {
    id: 4,
    chapter: 4,
    chapterName: 'Cấp phép',
    stage: 'Hồ sơ 4',
    title: 'FDA',
    shortTitle: 'Hồ sơ 4',
    color: '#F59E0B',
    storyText:
      'Vaccine đã được phát triển — nhưng cần phê duyệt trước khi đưa ra thị trường. ' +
      'FDA thường mất 10–15 năm để phê duyệt một loại thuốc mới. Đại dịch không thể chờ đợi.\n\n' +
      'Vaccine COVID-19 không chỉ là một sản phẩm y tế thông thường. ' +
      'Hiểu đúng bản chất của nó sẽ giúp giải thích tại sao Nhà nước can thiệp sâu đến vậy.',
    description: 'Vaccine COVID-19 không chỉ là hàng hóa y tế thông thường — bản chất chiến lược quy định cách Nhà nước can thiệp.',
    question: 'Trong đại dịch, vaccine COVID-19 không chỉ là hàng hóa y tế mà còn là sản phẩm thuộc lĩnh vực ________.',
    choices: [
      { id: 'A', text: 'Chiến lược',  indicators: { innovation: 20, strategy: -15, publicHealth: 25, collaboration: 20, economy: 25, risk: 10 } },
      { id: 'B', text: 'Tiêu dùng',   indicators: { innovation: 0,  strategy: 5,   publicHealth: -5, collaboration: 5,  economy: 5, risk: 10 } },
      { id: 'C', text: 'Dịch vụ',     indicators: { innovation: 5,  strategy: 0,   publicHealth: 10, collaboration: -5, economy: 5, risk: 10 } },
      { id: 'D', text: 'Thương mại',  indicators: { innovation: -5, strategy: 10,  publicHealth: -10,collaboration: 5,  economy: 15, risk: 10 } },
    ],
    correct: 'A',
    explanation:
      'Vaccine là sản phẩm chiến lược — ảnh hưởng trực tiếp đến an ninh quốc gia, kinh tế, chính trị và quan hệ quốc tế. ' +
      'Chính vì vậy, FDA áp dụng cơ chế EUA (Emergency Use Authorization) — rút ngắn quy trình phê duyệt từ 10 năm xuống 11 tháng. ' +
      'Nhà nước can thiệp vào toàn bộ chuỗi giá trị vì vaccine không thể bị điều tiết hoàn toàn bởi thị trường — ' +
      'đây là bằng chứng rõ ràng nhất về giới hạn của CNTB tự do.',
    references: [
      'FDA Emergency Use Authorization (EUA) – COVID-19 Vaccines (2020)',
      'National Security Strategy of the United States (2021)',
      'Giáo trình Kinh tế Chính trị Mác-Lênin, Bộ GD&ĐT (2021), Chương 5',
    ],
    timeLimit: 20,
  },
  {
    id: 5,
    chapter: 5,
    chapterName: 'Sản xuất',
    stage: 'Hồ sơ 5',
    title: 'Operation Warp Speed',
    shortTitle: 'Hồ sơ 5',
    color: '#EF4444',
    storyText:
      'Vaccine đã được phê duyệt — nhưng sản xuất hàng trăm triệu liều trong thời gian ngắn nhất là thách thức chưa từng thấy. ' +
      'Operation Warp Speed được thành lập — một dự án liên bộ với 18 tỷ USD ngân sách — ' +
      'kết hợp sức mạnh của bộ máy nhà nước và các tập đoàn dược phẩm lớn.\n\n' +
      'Đây chính là minh chứng điển hình cho lý luận Lênin về độc quyền nhà nước.',
    description: 'Độc quyền nhà nước trong CNTB là sự kết hợp đặc biệt giữa hai sức mạnh.',
    question: 'Độc quyền nhà nước trong chủ nghĩa tư bản là sự kết hợp giữa sức mạnh của nhà nước tư sản và sức mạnh của tư bản ________.',
    choices: [
      { id: 'A', text: 'Công nghiệp', indicators: { innovation: 10, strategy: -10, publicHealth: 5,  collaboration: 20, economy: 10, risk: 10 } },
      { id: 'B', text: 'Độc quyền',   indicators: { innovation: 20, strategy: -20, publicHealth: 15, collaboration: 25, economy: 25, risk: 10 } },
      { id: 'C', text: 'Tài chính',   indicators: { innovation: 5,  strategy: 5,   publicHealth: 0,  collaboration: 10, economy: 15, risk: 10 } },
      { id: 'D', text: 'Quốc tế',     indicators: { innovation: 0,  strategy: -5,  publicHealth: 10, collaboration: 5,  economy: 20, risk: 10 } },
    ],
    correct: 'B',
    explanation:
      'Độc quyền nhà nước trong CNTB = sức mạnh nhà nước tư sản + sức mạnh tư bản độc quyền. ' +
      'Operation Warp Speed là minh chứng điển hình: Bộ Quốc phòng Mỹ + HHS (nhà nước) ' +
      'kết hợp với Moderna & Pfizer (tư bản độc quyền) → sản xuất 400 triệu liều vaccine chỉ trong 6 tháng. ' +
      'Vốn hóa Moderna tăng 25 lần — đây là "tư nhân hóa lợi nhuận" điển hình trong CNTB.',
    references: [
      'Operation Warp Speed: Accelerating COVID-19 Medical Countermeasures – HHS (2021)',
      'V.I. Lênin, "Chủ nghĩa đế quốc, giai đoạn tột cùng của CNTB" (1917)',
      'Nature: "Operation Warp Speed: An Unprecedented Challenge" (2021)',
    ],
    timeLimit: 20,
  },
  {
    id: 6,
    chapter: 6,
    chapterName: 'Phân phối',
    stage: 'Hồ sơ 6',
    title: 'Biểu hiện mới',
    shortTitle: 'Hồ sơ 6',
    color: '#22C55E',
    storyText:
      'Vaccine đã sản xuất xong — nhưng đưa đến tay hàng trăm triệu người là bài toán logistics khổng lồ. ' +
      'Nhà nước Mỹ sử dụng toàn bộ công cụ điều tiết kinh tế để đảm bảo vaccine đến tay từng người dân.\n\n' +
      'Hãy xác định công cụ cuối cùng mà Nhà nước sử dụng để hoàn thiện bức tranh can thiệp toàn diện này.',
    description: 'Nhà nước tư sản sử dụng nhiều công cụ điều tiết kinh tế đa dạng — case Moderna thể hiện đầy đủ các công cụ này.',
    question: 'Các công cụ điều tiết kinh tế của nhà nước tư sản gồm ngân sách, thuế, tiền tệ, tín dụng, doanh nghiệp nhà nước, kế hoạch hóa và công cụ hành chính - ________.',
    choices: [
      { id: 'A', text: 'Chính trị', indicators: { innovation: 0,  strategy: 5,   publicHealth: 10,  collaboration: 0,  economy: 5, risk: 10 } },
      { id: 'B', text: 'Quân sự',   indicators: { innovation: 0,  strategy: -15, publicHealth: -10, collaboration: 10, economy: -10, risk: 10 } },
      { id: 'C', text: 'Ngoại giao',indicators: { innovation: 5,  strategy: -5,  publicHealth: 15,  collaboration: 5,  economy: 15, risk: 10 } },
      { id: 'D', text: 'Pháp lý',   indicators: { innovation: 10, strategy: -10, publicHealth: 20,  collaboration: 15, economy: 20, risk: 10 } },
    ],
    correct: 'D',
    explanation:
      'Công cụ hành chính - pháp lý là công cụ quan trọng: luật, quy định, tiêu chuẩn, lệnh hành pháp. ' +
      'Trong case Moderna: FDA cấp phép EUA (công cụ pháp lý), Bộ Y tế ban hành phác đồ tiêm chủng (hành chính), ' +
      'và hợp đồng giữa Chính phủ với Moderna là công cụ pháp lý điều phối toàn bộ quá trình phân phối — ' +
      'đảm bảo vaccine không chỉ là hàng hóa mà còn là quyền lợi công cộng.',
    references: [
      'FDA Emergency Use Authorization Framework (2020)',
      'CDC – COVID-19 Vaccine Distribution Strategy (2021)',
      'Giáo trình Kinh tế Chính trị Mác-Lênin, Bộ GD&ĐT (2021), Chương 5, Mục 5.3',
    ],
    timeLimit: 20,
  },
  {
    id: 7,
    chapter: 7,
    chapterName: 'Tổng kết',
    stage: 'Hồ sơ hoàn chỉnh',
    title: 'Tổng kết',
    shortTitle: 'Tổng kết',
    color: '#F59E0B',
    storyText:
      'Vaccine COVID-19 của Moderna đã cứu hàng triệu sinh mạng. Hành trình từ phòng nghiên cứu đến cánh tay người dân ' +
      'chứng minh một điều: trong CNTB hiện đại, Nhà nước và tư bản độc quyền không đối lập — mà phối hợp chặt chẽ.\n\n' +
      'Đây là câu hỏi cuối cùng để hoàn chỉnh Hồ sơ Moderna. Hãy thể hiện sự hiểu biết toàn diện của bạn!',
    description: 'Câu hỏi cuối — tổng kết toàn bộ lý luận và case Moderna. Trả lời đúng để hoàn chỉnh hồ sơ!',
    question: 'Độc quyền nhà nước trong chủ nghĩa tư bản là sự kết hợp giữa quyền lực của nhà nước và sức mạnh của ________ độc quyền.',
    choices: [
      { id: 'A', text: 'Tư bản',            indicators: { innovation: 20, strategy: -15, publicHealth: 20, collaboration: 20, economy: 25, risk: 10 } },
      { id: 'B', text: 'Thị trường',         indicators: { innovation: 0,  strategy: 10,  publicHealth: -5, collaboration: 5,  economy: 10, risk: 10 } },
      { id: 'C', text: 'Doanh nghiệp nhỏ',  indicators: { innovation: 5,  strategy: 5,   publicHealth: 5,  collaboration: -5, economy: 0, risk: 10 } },
      { id: 'D', text: 'Lao động',           indicators: { innovation: 0,  strategy: 0,   publicHealth: 10, collaboration: -10,economy: -5, risk: 10 } },
    ],
    correct: 'A',
    explanation:
      'Độc quyền nhà nước CNTB = nhà nước + tư bản độc quyền. ' +
      'Case Moderna tổng kết hoàn hảo: Nhà nước Mỹ (NIH + BARDA + FDA + Operation Warp Speed) ' +
      'kết hợp với Moderna (tư bản độc quyền dược phẩm) → 400 triệu liều vaccine trong 6 tháng → cứu hàng triệu sinh mạng.\n' +
      'Đây là biểu hiện mới nhất, sinh động nhất của độc quyền nhà nước trong CNTB thế kỷ 21.',
    references: [
      'V.I. Lênin, "Chủ nghĩa đế quốc, giai đoạn tột cùng của CNTB" (1917)',
      'Mariana Mazzucato, "Mission Economy: A Moonshot Guide to Changing Capitalism" (2021)',
      'Giáo trình Kinh tế Chính trị Mác-Lênin, Bộ GD&ĐT (2021), Chương 5',
      'Moderna Annual Report 2021 – COVID-19 Vaccine Impact Assessment',
    ],
    timeLimit: 20,
  },
  {
    id: 8,
    chapter: 8,
    chapterName: 'Khủng hoảng sản xuất',
    stage: 'Hồ sơ 8',
    title: 'Khủng hoảng sản xuất',
    shortTitle: 'Hồ sơ 8',
    color: '#0EA5E9',
    storyText:
      'Sau khi vaccine được phê duyệt, Moderna gặp khó khăn trong việc mở rộng quy mô sản xuất. Người dân đang rất mong chờ được tiêm vaccine.\n\n' +
      'Bạn sẽ ưu tiên giải pháp nào?',
    description: 'Để giải quyết cuộc khủng hoảng quy mô sản xuất vaccine, bạn quyết định...',
    question: 'Để giải quyết cuộc khủng hoảng quy mô sản xuất vaccine, bạn quyết định...',
    choices: [
      { id: 'A', text: 'Đầu tư mở rộng nhà máy sản xuất.', indicators: { collaboration: 20, strategy: -15, publicHealth: 10, economy: 15, innovation: 0 } },
      { id: 'B', text: 'Hợp tác với các công ty dược khác để sản xuất.', indicators: { collaboration: 15, strategy: -5, publicHealth: 15, economy: 10, innovation: 5 } },
      { id: 'C', text: 'Giảm tốc độ triển khai để đảm bảo chất lượng.', indicators: { collaboration: -10, strategy: 5, publicHealth: 20, economy: -5, innovation: 5 } },
      { id: 'D', text: 'Xuất khẩu vaccine trước để tăng doanh thu.', indicators: { collaboration: 5, strategy: 15, publicHealth: -20, economy: 25, innovation: 0 } },
    ],
    correct: 'B',
    explanation: 'Trong thực tế, Mỹ không chỉ đầu tư vào nghiên cứu mà còn hỗ trợ năng lực sản xuất và chuỗi cung ứng (hợp tác với Lonza, Catalent) để vaccine được đưa đến người dân nhanh nhất. Sự hợp tác này là chìa khóa.',
    references: ['Operation Warp Speed Manufacturing Strategy (2020)'],
    timeLimit: 20,
  },
  {
    id: 9,
    chapter: 9,
    chapterName: 'Tin giả về vaccine',
    stage: 'Hồ sơ 9',
    title: 'Tin giả về vaccine',
    shortTitle: 'Hồ sơ 9',
    color: '#EC4899',
    storyText:
      'Trên mạng xã hội xuất hiện nhiều tin giả cho rằng vaccine Moderna không an toàn.\n\n' +
      'Nếu bạn là cố vấn truyền thông, bạn sẽ làm gì?',
    description: 'Để đối phó với tin giả gây hoang mang dư luận về tính an toàn của vaccine, biện pháp tốt nhất là...',
    question: 'Để đối phó với tin giả gây hoang mang dư luận về tính an toàn của vaccine, biện pháp tốt nhất là...',
    choices: [
      { id: 'A', text: 'Công khai toàn bộ dữ liệu nghiên cứu.', indicators: { publicHealth: 25, strategy: -5, innovation: 15, collaboration: 0, economy: 5, risk: 10 } },
      { id: 'B', text: 'Mời các chuyên gia độc lập giải thích.', indicators: { publicHealth: 20, strategy: -10, innovation: 10, collaboration: 0, economy: 10, risk: 10 } },
      { id: 'C', text: 'Bỏ qua vì sẽ tự lắng xuống.', indicators: { publicHealth: -15, strategy: 0, innovation: 0, collaboration: 0, economy: 5, risk: 10 } },
      { id: 'D', text: 'Chỉ tập trung quảng cáo vaccine.', indicators: { publicHealth: -5, strategy: -10, innovation: 0, collaboration: 5, economy: 10, risk: 10 } },
    ],
    correct: 'A',
    explanation: 'Niềm tin của công chúng là yếu tố quyết định trong các chiến dịch tiêm chủng. Minh bạch và truyền thông khoa học giúp tăng tỷ lệ chấp nhận vaccine.',
    references: ['CDC Vaccine Confidence Guidelines (2021)'],
    timeLimit: 20,
  },
  {
    id: 10,
    chapter: 10,
    chapterName: 'Quyết định cuối cùng',
    stage: 'Hồ sơ hoàn chỉnh',
    title: 'Bài học lớn nhất',
    shortTitle: 'Bài học',
    color: '#F59E0B',
    storyText:
      'Dịch bệnh đã được kiểm soát.\n\n' +
      'Bạn được yêu cầu đánh giá bài học lớn nhất từ Case Moderna. Theo bạn yếu tố nào quyết định thành công?',
    description: 'Theo bạn yếu tố nào quyết định thành công trong việc triển khai vaccine nhanh chưa từng có?',
    question: 'Theo bạn yếu tố nào quyết định thành công trong case Moderna?',
    choices: [
      { id: 'A', text: 'Sự kết hợp giữa Nhà nước và doanh nghiệp.', indicators: { publicHealth: 20, collaboration: 20, economy: 20, innovation: 20, strategy: -5 } },
      { id: 'B', text: 'Công nghệ mRNA vượt trội.', indicators: { publicHealth: 10, collaboration: 10, economy: 15, innovation: 25, strategy: -10 } },
      { id: 'C', text: 'Nguồn vốn đầu tư lớn.', indicators: { publicHealth: 5, collaboration: 15, economy: 20, innovation: 10, strategy: -20 } },
      { id: 'D', text: 'Chuỗi logistics và phân phối hiệu quả.', indicators: { publicHealth: 15, collaboration: 25, economy: 15, innovation: 5, strategy: -5 } },
    ],
    correct: 'A',
    explanation: 'Case Moderna thành công nhờ nhiều yếu tố kết hợp: nghiên cứu công, doanh nghiệp tư nhân, hỗ trợ của chính phủ, logistics và hệ thống cấp phép. Độc quyền nhà nước trong CNTB là sự phối hợp chặt chẽ này.',
    references: ['Moderna Case Study Analysis'],
    timeLimit: 20,
  },
];

// Helper: get vote totals as percentages
export function getVotePercentages(votes) {
  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  if (total === 0) return { A: 0, B: 0, C: 0, D: 0 };
  return {
    A: Math.round(((votes.A || 0) / total) * 100),
    B: Math.round(((votes.B || 0) / total) * 100),
    C: Math.round(((votes.C || 0) / total) * 100),
    D: Math.round(((votes.D || 0) / total) * 100),
  };
}

// Helper: calculate round score
export function calculateScore({ isCorrect, timeRemaining, timeLimit, comboCount }) {
  if (!isCorrect) return 0;
  const base = 100;
  const speed = Math.round(30 * (timeRemaining / timeLimit));
  const comboMult = comboCount >= 3 ? 1.5 : comboCount >= 2 ? 1.25 : 1;
  return Math.round((base + speed) * comboMult);
}

// Helper: compute player achievements
export function computeAchievements(player, missions) {
  const earned = [];
  const allAnswers = player.answers || [];
  const correctCount = allAnswers.filter(a => a.isCorrect).length;

  if (correctCount === missions.length) earned.push('vaccine_hero');
  if (player.combo >= 3) earned.push('perfect_combo');
  const fastAnswers = allAnswers.filter(a => a.timeUsed <= 5);
  if (fastAnswers.length > 0) earned.push('fast_thinker');
  if (player.score >= 600) earned.push('policy_expert');
  return earned;
}

// Helper: dynamically assign Hall of Fame titles
export function assignTitles(players) {
  if (!players || players.length === 0) return [];
  
  const titles = [];
  const assignedPlayerIds = [];

  const getMaxPlayer = (statPath, excludeIds = []) => {
    let maxVal = -9999;
    let bestPlayer = null;
    players.forEach(p => {
      if (excludeIds.includes(p.id)) return;
      const val = p.stats?.[statPath] || 0;
      if (val > maxVal) {
        maxVal = val;
        bestPlayer = p;
      }
    });
    return bestPlayer;
  };

  // 👑 Chief Policy Advisor (highest score)
  const chief = [...players].sort((a, b) => b.score - a.score)[0];
  if (chief) {
    titles.push({ id: 'chief_advisor', label: 'Chief Policy Advisor', desc: 'Điểm tổng số cao nhất', player: chief });
    assignedPlayerIds.push(chief.id);
  }

  // 🏆 Moderna Master (10/10 correct answers)
  const master = players.find(p => (p.stats?.correctCount || 0) === 10 && !assignedPlayerIds.includes(p.id));
  if (master) {
    titles.push({ id: 'moderna_master', label: 'Moderna Master', desc: 'Đạt điểm tuyệt đối 10/10', player: master });
    assignedPlayerIds.push(master.id);
  }

  // 🧪 Research Pioneer (highest research)
  const resPioneer = getMaxPlayer('innovation', assignedPlayerIds) || getMaxPlayer('innovation', []);
  if (resPioneer && !assignedPlayerIds.includes(resPioneer.id)) {
    titles.push({ id: 'research_pioneer', label: 'Research Pioneer', desc: 'Chỉ số Đổi mới & Nghiên cứu cao nhất', player: resPioneer });
    assignedPlayerIds.push(resPioneer.id);
  }

  // 🛡 Public Health Guardian (highest trust)
  const guardian = getMaxPlayer('publicHealth', assignedPlayerIds) || getMaxPlayer('publicHealth', []);
  if (guardian && !assignedPlayerIds.includes(guardian.id)) {
    titles.push({ id: 'health_guardian', label: 'Public Health Guardian', desc: 'Chỉ số Niềm tin Công chúng cao nhất', player: guardian });
    assignedPlayerIds.push(guardian.id);
  }

  // 💰 Economic Strategist (highest economy)
  const econ = getMaxPlayer('economy', assignedPlayerIds) || getMaxPlayer('economy', []);
  if (econ && !assignedPlayerIds.includes(econ.id)) {
    titles.push({ id: 'econ_strategist', label: 'Economic Strategist', desc: 'Chỉ số Tối ưu Kinh tế cao nhất', player: econ });
    assignedPlayerIds.push(econ.id);
  }

  // 🚀 Crisis Commander (highest production)
  const cmd = getMaxPlayer('collaboration', assignedPlayerIds) || getMaxPlayer('collaboration', []);
  if (cmd && !assignedPlayerIds.includes(cmd.id)) {
    titles.push({ id: 'crisis_commander', label: 'Crisis Commander', desc: 'Chỉ số Khủng hoảng & Sản xuất cao nhất', player: cmd });
    assignedPlayerIds.push(cmd.id);
  }

  // 🤝 Collaboration Master (chọn nhiều phương án hợp tác - e.g. Q8 choice B)
  const collabPlayer = players.find(p => p.stats?.choices?.[7] === 'B' && !assignedPlayerIds.includes(p.id));
  if (collabPlayer) {
    titles.push({ id: 'collab_master', label: 'Collaboration Master', desc: 'Liên kết hợp tác sản xuất vaccine', player: collabPlayer });
    assignedPlayerIds.push(collabPlayer.id);
  }

  // ⚖ Balanced Decision Maker (lowest variance in stats)
  let minVar = 999999;
  let balancedPlayer = null;
  players.forEach(p => {
    if (assignedPlayerIds.includes(p.id)) return;
    const s = p.stats || {};
    const vals = [s.innovation || 0, s.strategy || 0, s.collaboration || 0, s.risk || 0, s.publicHealth || 0, s.economy || 0];
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    const variance = vals.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / vals.length;
    if (variance < minVar) {
      minVar = variance;
      balancedPlayer = p;
    }
  });
  if (balancedPlayer) {
    titles.push({ id: 'balanced_maker', label: 'Balanced Decision Maker', desc: 'Các chỉ số phát triển cân bằng nhất', player: balancedPlayer });
    assignedPlayerIds.push(balancedPlayer.id);
  }

  // ⚡ Fast Thinker (most fast answers)
  const fast = getMaxPlayer('speedCount', assignedPlayerIds) || getMaxPlayer('speedCount', []);
  if (fast && (fast.stats?.speedCount || 0) > 0 && !assignedPlayerIds.includes(fast.id)) {
    titles.push({ id: 'fast_thinker', label: 'Fast Thinker', desc: 'Đưa ra các quyết định nhanh chóng nhất', player: fast });
    assignedPlayerIds.push(fast.id);
  }

  // 🎯 Vaccine Expert (>= 9 correct answers)
  const expert = players.find(p => (p.stats?.correctCount || 0) >= 9 && !assignedPlayerIds.includes(p.id));
  if (expert) {
    titles.push({ id: 'vaccine_expert', label: 'Vaccine Expert', desc: 'Đạt độ chính xác chuyên gia (≥ 9/10)', player: expert });
    assignedPlayerIds.push(expert.id);
  }

  return titles;
}
