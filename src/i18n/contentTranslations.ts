import { LangCode } from "./dictionaries";
import { placeDetailContent } from "./placeDetailTranslations";

type ContentMap = Partial<Record<LangCode, string>>;

const content: Record<string, ContentMap> = {
  ...placeDetailContent,
  "Simulate QR scan · Point 042": {
    zh: "模拟扫码 · 点位 042",
    ja: "QRスキャンを体験 · ポイント042",
    lo: "ຈຳລອງການສະແກນ QR · ຈຸດ 042",
    id: "Simulasi pindai QR · Titik 042",
    vi: "Mô phỏng quét QR · Điểm 042",
    my: "QR စကင်ဖတ်ခြင်း နမူနာ · နေရာ 042",
  },
  "Sample scan point": {
    zh: "示例扫码点",
    ja: "サンプルスキャン地点",
    lo: "ຈຸດສະແກນຕົວຢ່າງ",
    id: "Titik pindai contoh",
    vi: "Điểm quét mẫu",
    my: "နမူနာ စကင်ဖတ်နေရာ",
  },
  districts: {
    zh: "县区",
    ja: "郡",
    lo: "ເມືອງ",
    id: "distrik",
    vi: "huyện",
    my: "ခရိုင်",
  },
  featured: {
    zh: "推荐点",
    ja: "おすすめ",
    lo: "ຈຸດແນະນຳ",
    id: "unggulan",
    vi: "điểm nổi bật",
    my: "အကြံပြုနေရာ",
  },
  "AI journey preview": {
    zh: "AI 行程预览",
    ja: "AI旅程プレビュー",
    lo: "ຕົວຢ່າງເສັ້ນທາງ AI",
    id: "Pratinjau perjalanan AI",
    vi: "Xem trước hành trình AI",
    my: "AI ခရီးစဉ် နမူနာ",
  },
  "8 languages": {
    zh: "8 种语言",
    ja: "8言語",
    lo: "8 ພາສາ",
    id: "8 bahasa",
    vi: "8 ngôn ngữ",
    my: "ဘာသာစကား 8 မျိုး",
  },
  "Scan QR": {
    zh: "扫码",
    ja: "QR読取",
    lo: "ສະແກນ QR",
    id: "Pindai QR",
    vi: "Quét QR",
    my: "QR စကင်",
  },
  "Open route": {
    zh: "打开路线",
    ja: "ルート表示",
    lo: "ເປີດເສັ້ນທາງ",
    id: "Buka rute",
    vi: "Mở lộ trình",
    my: "လမ်းကြောင်းဖွင့်",
  },
  Personalized: {
    zh: "为您推荐",
    ja: "あなた向け",
    lo: "ເໝາະກັບທ່ານ",
    id: "Personal",
    vi: "Cá nhân hóa",
    my: "သင့်အတွက်",
  },
  "Instant guide": {
    zh: "即时导览",
    ja: "すぐ案内",
    lo: "ແນະນຳທັນທີ",
    id: "Panduan instan",
    vi: "Hướng dẫn tức thì",
    my: "ချက်ချင်းလမ်းညွှန်",
  },
  "Dashboard signal": {
    zh: "进入数据面板",
    ja: "ダッシュボード連携",
    lo: "ສົ່ງເຂົ້າແດຊບອດ",
    id: "Sinyal dashboard",
    vi: "Tín hiệu dashboard",
    my: "ဒက်ရှ်ဘုတ်အချက်ပြ",
  },

  Attractions: { zh: "景点", ja: "観光地", lo: "ສະຖານທີ່ທ່ຽວ", id: "Atraksi", vi: "Điểm tham quan", my: "လည်ပတ်စရာ" },
  Stay: { zh: "住宿", ja: "宿泊", lo: "ທີ່ພັກ", id: "Menginap", vi: "Lưu trú", my: "တည်းခိုရန်" },
  Eat: { zh: "美食", ja: "食事", lo: "ອາຫານ", id: "Makan", vi: "Ăn uống", my: "စားသောက်ရန်" },
  Souvenirs: { zh: "伴手礼", ja: "お土産", lo: "ຂອງຝາກ", id: "Oleh-oleh", vi: "Quà lưu niệm", my: "အမှတ်တရပစ္စည်း" },
  "Spa & wellness": { zh: "水疗与健康", ja: "スパ・健康", lo: "ສະປາ ແລະ ສຸຂະພາບ", id: "Spa & kebugaran", vi: "Spa & sức khỏe", my: "စပာနှင့် ကျန်းမာရေး" },
  Transport: { zh: "交通", ja: "交通", lo: "ການເດີນທາງ", id: "Transportasi", vi: "Di chuyển", my: "သယ်ယူပို့ဆောင်ရေး" },
  Tours: { zh: "旅行社", ja: "ツアー", lo: "ທົວ", id: "Tur", vi: "Tour", my: "ခရီးစဉ်" },

  Wickerwork: { zh: "编织工艺", ja: "かご細工", lo: "ເຄື່ອງຈັກສານ", id: "Anyaman", vi: "Đan lát", my: "ယက်လုပ်ပစ္စည်း" },
  "Hand weaving": { zh: "手工织布", ja: "手織り", lo: "ຜ້າທໍ", id: "Tenun tangan", vi: "Dệt thủ công", my: "လက်ယက်အထည်" },
  "Bamboo craft": { zh: "竹工艺", ja: "竹工芸", lo: "ຫັດຖະກຳໄມ້ໄຜ່", id: "Kerajinan bambu", vi: "Thủ công tre", my: "ဝါးလက်မှုပညာ" },
  "Mural painting": { zh: "壁画", ja: "壁画", lo: "ຈິດຕະກຳຝາຜະໜັງ", id: "Lukisan mural", vi: "Tranh tường", my: "နံရံပန်းချီ" },
  "Pottery & stucco": { zh: "陶器与灰塑", ja: "陶器・漆喰", lo: "ເຄື່ອງປັ້ນ ແລະ ປູນປັ້ນ", id: "Tembikar & stuko", vi: "Gốm & phù điêu", my: "မြေအိုးနှင့် အင်္ဂတေ" },
  Silverware: { zh: "银器", ja: "銀細工", lo: "ເຄື່ອງເງິນ", id: "Perak", vi: "Đồ bạc", my: "ငွေထည်" },
  Nature: { zh: "自然", ja: "自然", lo: "ທຳມະຊາດ", id: "Alam", vi: "Thiên nhiên", my: "သဘာဝ" },
  "Culture & history": { zh: "文化与历史", ja: "文化・歴史", lo: "ວັດທະນະທຳ ແລະ ປະຫວັດສາດ", id: "Budaya & sejarah", vi: "Văn hóa & lịch sử", my: "ယဉ်ကျေးမှုနှင့် သမိုင်း" },
  "Food & drink": { zh: "餐饮", ja: "食べ物・飲み物", lo: "ອາຫານ ແລະ ເຄື່ອງດື່ມ", id: "Makanan & minuman", vi: "Ẩm thực & đồ uống", my: "အစားအစာနှင့် သောက်စရာ" },

  "Mueang Nan": { zh: "南府城", ja: "ムアンナーン", lo: "ເມືອງນ່ານ", id: "Mueang Nan", vi: "Mueang Nan", my: "မောင်းနန်း" },
  "Phu Phiang": { zh: "普屏", ja: "プーピアン", lo: "ພູພຽງ", id: "Phu Phiang", vi: "Phu Phiang", my: "ဖူဖျင်" },
  Pua: { zh: "普阿", ja: "プア", lo: "ປົວ", id: "Pua", vi: "Pua", my: "ပွါ" },
  "Tha Wang Pha": { zh: "塔旺帕", ja: "ター・ワン・パー", lo: "ທ່າວັງຜາ", id: "Tha Wang Pha", vi: "Tha Wang Pha", my: "သာဝန်ဖာ" },
  "Bo Kluea": { zh: "波克勒", ja: "ボークルア", lo: "ບໍ່ເກືອ", id: "Bo Kluea", vi: "Bo Kluea", my: "ဘိုကလွာ" },
  "Wiang Sa": { zh: "旺萨", ja: "ウィアンサー", lo: "ວຽງສາ", id: "Wiang Sa", vi: "Wiang Sa", my: "ဝီယန်ဆာ" },
  "Na Noi": { zh: "纳诺伊", ja: "ナーノーイ", lo: "ນານ້ອຍ", id: "Na Noi", vi: "Na Noi", my: "နာနွိုင်း" },
  "Na Muen": { zh: "纳门", ja: "ナームーン", lo: "ນາໝື່ນ", id: "Na Muen", vi: "Na Muen", my: "နာမွန်း" },
  "Mae Charim": { zh: "湄乍林", ja: "メーチャリム", lo: "ແມ່ຈະຣິມ", id: "Mae Charim", vi: "Mae Charim", my: "မဲချရင်" },
  "Ban Luang": { zh: "班銮", ja: "バーンルアン", lo: "ບ້ານຫຼວງ", id: "Ban Luang", vi: "Ban Luang", my: "ဘန်လွမ်" },
  "Thung Chang": { zh: "通昌", ja: "トゥンチャーン", lo: "ທຸ່ງຊ້າງ", id: "Thung Chang", vi: "Thung Chang", my: "ထုန်ချန်" },
  "Chiang Klang": { zh: "清康", ja: "チエンクラーン", lo: "ຊຽງກາງ", id: "Chiang Klang", vi: "Chiang Klang", my: "ချင်းကလန်" },
  "Santi Suk": { zh: "讪迪素", ja: "サンティスック", lo: "ສັນຕິສຸກ", id: "Santi Suk", vi: "Santi Suk", my: "ဆန်တီဆုခ်" },
  "Song Khwae": { zh: "双溪", ja: "ソーンケウェー", lo: "ສອງແຄວ", id: "Song Khwae", vi: "Song Khwae", my: "ဆောင်ခွဲ" },
  "Chaloem Phra Kiat": { zh: "查伦帕吉", ja: "チャルームプラキアット", lo: "ເຉີລິມພະກຽດ", id: "Chaloem Phra Kiat", vi: "Chaloem Phra Kiat", my: "ချလွမ်ဖရာကီယတ်" },

  "เมืองน่าน": { en: "Mueang Nan", zh: "南府城", ja: "ムアンナーン", lo: "ເມືອງນ່ານ", id: "Mueang Nan", vi: "Mueang Nan", my: "မောင်းနန်း" },
  "ภูเพียง": { en: "Phu Phiang", zh: "普屏", ja: "プーピアン", lo: "ພູພຽງ", id: "Phu Phiang", vi: "Phu Phiang", my: "ဖူဖျင်" },
  "ปัว": { en: "Pua", zh: "普阿", ja: "プア", lo: "ປົວ", id: "Pua", vi: "Pua", my: "ပွါ" },
  "ท่าวังผา": { en: "Tha Wang Pha", zh: "塔旺帕", ja: "ター・ワン・パー", lo: "ທ່າວັງຜາ", id: "Tha Wang Pha", vi: "Tha Wang Pha", my: "သာဝန်ဖာ" },
  "บ่อเกลือ": { en: "Bo Kluea", zh: "波克勒", ja: "ボークルア", lo: "ບໍ່ເກືອ", id: "Bo Kluea", vi: "Bo Kluea", my: "ဘိုကလွာ" },
  "นาน้อย": { en: "Na Noi", zh: "纳诺伊", ja: "ナーノーイ", lo: "ນານ້ອຍ", id: "Na Noi", vi: "Na Noi", my: "နာနွိုင်း" },

  "Wat Phumin": { zh: "普明寺", ja: "ワット・プーミン", lo: "ວັດພູມິນ", id: "Wat Phumin", vi: "Chùa Wat Phumin", my: "ဝတ်ဖူမင်" },
  "Wat Phra That Chae Haeng": { zh: "帕塔切亨寺", ja: "ワット・プラタート・チェーヘーン", lo: "ວັດພຣະທາດແຊ່ແຫ້ງ", id: "Wat Phra That Chae Haeng", vi: "Wat Phra That Chae Haeng", my: "ဝတ်ဖရာထတ်ချဲဟဲင်" },
  "Nan National Museum": { zh: "南府国家博物馆", ja: "ナーン国立博物館", lo: "ພິພິທະພັນແຫ່ງຊາດນ່ານ", id: "Museum Nasional Nan", vi: "Bảo tàng Quốc gia Nan", my: "နန်း အမျိုးသားပြတိုက်" },
  "Bo Kluea Mountain Salt Wells": { zh: "波克勒山盐井", ja: "ボークルア山塩井", lo: "ບໍ່ເກືອພູເຂົາ", id: "Sumur Garam Gunung Bo Kluea", vi: "Giếng muối núi Bo Kluea", my: "ဘိုကလွာ တောင်ဆားတွင်း" },
  "Bo Kluea Salt Wells": { zh: "波克勒盐井", ja: "ボークルア塩井", lo: "ບໍ່ເກືອ", id: "Sumur Garam Bo Kluea", vi: "Giếng muối Bo Kluea", my: "ဘိုကလွာ ဆားတွင်း" },
  "Doi Phu Kha National Park": { zh: "杜普卡国家公园", ja: "ドイ・プーカ国立公園", lo: "ອຸທິຍານແຫ່ງຊາດດອຍພູຄາ", id: "Taman Nasional Doi Phu Kha", vi: "Vườn quốc gia Doi Phu Kha", my: "ဒွိုင်ဖူခါ အမျိုးသားဥယျာဉ်" },
  "Sapan Village": { zh: "สะปัน村", ja: "サパン村", lo: "ບ້ານສະປັນ", id: "Desa Sapan", vi: "Làng Sapan", my: "ဆာပန်ရွာ" },
  "Doi Samer Dao – Pha Hua Sing": { zh: "เสมอดาว山 – 狮头崖", ja: "ドイ・サムー・ダーオ – パー・フア・シン", lo: "ດອຍເສມດາວ – ຜາຫົວສິງ", id: "Doi Samer Dao – Pha Hua Sing", vi: "Doi Samer Dao – Pha Hua Sing", my: "ဒွိုင်ဆမဲဒါဝ် – ဖာဟွာဆင်း" },
  "Doi Samer Dao": { zh: "เสมอดาว山", ja: "ドイ・サムー・ダーオ", lo: "ດອຍເສມດາວ", id: "Doi Samer Dao", vi: "Doi Samer Dao", my: "ဒွိုင်ဆမဲဒါဝ်" },
  "Sao Din Na Noi": { zh: "纳诺伊土柱", ja: "サオディン・ナーノーイ", lo: "ເສົາດິນນານ້ອຍ", id: "Sao Din Na Noi", vi: "Sao Din Na Noi", my: "ဆောဒင်နာနွိုင်း" },
  "Wat Phuket": { zh: "普吉寺", ja: "ワット・プーケット", lo: "ວັດພູເກັດ", id: "Wat Phuket", vi: "Wat Phuket", my: "ဝတ်ဖူကက်" },
  "Lamduan Tai Lue Weaving": { zh: "兰端傣泐织布", ja: "ラムドゥアン・タイリュー織物", lo: "ລຳດວນຜ້າທໍໄທລື້", id: "Tenun Tai Lue Lamduan", vi: "Dệt Tai Lue Lamduan", my: "လမ်ဒွမ် တိုင်လူး ယက်လုပ်ရေး" },
  "Lamduan Weaving": { zh: "兰端织布", ja: "ラムドゥアン織物", lo: "ລຳດວນຜ້າທໍ", id: "Tenun Lamduan", vi: "Dệt Lamduan", my: "လမ်ဒွမ် ယက်လုပ်ရေး" },
  "Wat Si Phan Ton": { zh: "四色潘通寺", ja: "ワット・シーパントン", lo: "ວັດສີພັນຕົ້ນ", id: "Wat Si Phan Ton", vi: "Wat Si Phan Ton", my: "ဝတ်စီဖန်တုံ" },
  "Nan Walking Street": { zh: "南府步行街", ja: "ナーン・ウォーキングストリート", lo: "ຖະໜົນຄົນຍ່າງນ່ານ", id: "Jalan Pejalan Kaki Nan", vi: "Phố đi bộ Nan", my: "နန်း လမ်းလျှောက်ဈေး" },
  "Viewpoint 1715": { zh: "1715观景点", ja: "ビューポイント1715", lo: "ຈຸດຊົມວິວ 1715", id: "Titik Pandang 1715", vi: "Điểm ngắm cảnh 1715", my: "ရှုခင်းကြည့်နေရာ 1715" },
  "Wat Nong Bua": { zh: "农布寺", ja: "ワット・ノーンブア", lo: "ວັດໜອງບົວ", id: "Wat Nong Bua", vi: "Wat Nong Bua", my: "ဝတ်နောင်ဘွာ" },

  "Thailand's unique cross-shaped temple, home of the famous whisper mural": {
    zh: "泰国独一无二的十字形寺庙，以著名的悄悄话壁画闻名",
    ja: "有名な「愛のささやき」壁画を有する、タイ唯一の十字形寺院",
    lo: "ວັດຮູບຊົງຈະຕຸລະມຸກທີ່ໂດດເດັ່ນ ມີຮູບວາດກະຊິບຮັກຊື່ດັງ",
    id: "Kuil unik berbentuk salib di Thailand, rumah mural bisikan cinta yang terkenal",
    vi: "Ngôi chùa hình chữ thập độc đáo của Thái Lan, nổi tiếng với bức tranh thì thầm",
    my: "ထိုင်းတွင်ထူးခြားသော ကြက်ခြေခတ်ပုံစံဘုရားကျောင်း၊ နာမည်ကြီး ချစ်စကားတိုးတိုးပြောသော နံရံပန်းချီရှိသည်",
  },
  "Nan's sacred golden stupa, guardian for those born in the Year of the Rabbit": {
    zh: "南府神圣金塔，也是兔年出生者的守护佛塔",
    ja: "ナーンの聖なる黄金仏塔。卯年生まれの守護仏塔",
    lo: "ພຣະທາດສີທອງສັກສິດຂອງນ່ານ ປະຈຳປີເຖາະ",
    id: "Stupa emas suci Nan, pelindung bagi yang lahir pada Tahun Kelinci",
    vi: "Bảo tháp vàng linh thiêng của Nan, bảo hộ người sinh năm Mão",
    my: "နန်း၏ သန့်ရှင်းမြတ်သော ရွှေစေတီ၊ ယုန်နှစ်ဖွားများအတွက် စောင့်ရှောက်ရာ",
  },
  "The former royal palace of Nan, home to the legendary Black Ivory tusk": {
    zh: "昔日南府王宫，收藏传说中的黑象牙",
    ja: "かつてのナーン王宮。伝説の黒象牙を所蔵",
    lo: "ຫໍຄຳເກົ່າຂອງນ່ານ ທີ່ເກັບງາຊ້າງດຳອັນສຳຄັນ",
    id: "Bekas istana kerajaan Nan, tempat gading hitam legendaris",
    vi: "Cung điện hoàng gia cũ của Nan, nơi lưu giữ ngà voi đen huyền thoại",
    my: "နန်း၏ ရှေးဟောင်းနန်းတော်၊ ဒဏ္ဍာရီလာ အနက်ရောင်ဆင်စွယ်ရှိရာ",
  },
  "Ancient mountain salt wells producing rock salt the traditional way": {
    zh: "古老山中盐井，以传统方式熬制岩盐",
    ja: "昔ながらの方法で岩塩を作る山間の古い塩井",
    lo: "ບໍ່ເກືອພູເຂົາເກົ່າແກ່ ຜະລິດເກືອດ້ວຍວິທີດັ້ງເດີມ",
    id: "Sumur garam pegunungan kuno yang menghasilkan garam batu secara tradisional",
    vi: "Giếng muối núi cổ sản xuất muối đá theo cách truyền thống",
    my: "ရိုးရာနည်းဖြင့် ကျောက်ဆားထုတ်သော ရှေးဟောင်းတောင်ဆားတွင်း",
  },
  "The roof of Nan, home to the world's only Bretschneidera ‘Chomphu Phu Kha’": {
    zh: "南府屋脊，世界唯一ชมพูภูคา花的家园",
    ja: "ナーンの屋根。世界でここだけのチョンプー・プーカーの地",
    lo: "ຫຼັງຄາແຫ່ງນ່ານ ບ້ານຂອງຕົ້ນຊົມພູພູຄາທີ່ຫາຍາກ",
    id: "Atap Nan, rumah satu-satunya pohon Chomphu Phu Kha di dunia",
    vi: "Mái nhà của Nan, nơi có loài Chomphu Phu Kha duy nhất trên thế giới",
    my: "နန်း၏ ခေါင်မိုး၊ ကမ္ဘာတွင်တစ်ခုတည်းသော Chomphu Phu Kha ပန်းပင်ရှိရာ",
  },
  "A tiny valley village of rice terraces, clear streams, and slow living": {
    zh: "山谷小村，有梯田、清溪和慢生活",
    ja: "棚田と清流、スローライフが魅力の小さな谷の村",
    lo: "ບ້ານນ້ອຍກາງຫຸບເຂົາ ມີນາຂັ້ນບັນໄດ ລຳທານໃສ ແລະ ວິຖີຊ້າໆ",
    id: "Desa kecil di lembah dengan sawah terasering, sungai jernih, dan hidup santai",
    vi: "Ngôi làng nhỏ trong thung lũng với ruộng bậc thang, suối trong và nhịp sống chậm",
    my: "လှေကားထစ်စပါးခင်း၊ ကြည်လင်သောချောင်းနှင့် နှေးကွေးအေးချမ်းသော ဘဝရှိသည့် ချိုင့်ဝှမ်းရွာငယ်",
  },
  "A famed mist-and-stargazing ridge in Sri Nan National Park": {
    zh: "诗丽南国家公园内著名的云海与观星山脊",
    ja: "シーナーン国立公園で有名な雲海と星空観賞の尾根",
    lo: "ສັນດອຍຊື່ດັງສຳລັບຊົມທະເລໝອກ ແລະ ດາວ ໃນອຸທິຍານສີນ່ານ",
    id: "Punggung bukit terkenal untuk kabut dan bintang di Taman Nasional Sri Nan",
    vi: "Sống núi nổi tiếng ngắm biển mây và sao trong Vườn quốc gia Sri Nan",
    my: "စရီနန်းအမျိုးသားဥယျာဉ်အတွင်း တိမ်ပင်လယ်နှင့် ကြယ်ကြည့်ရန် နာမည်ကြီးတောင်ရိုး",
  },
  "Surreal earth pillars carved by erosion over millennia": {
    zh: "经千百年侵蚀形成的奇幻土柱",
    ja: "長い年月の浸食が作った幻想的な土柱",
    lo: "ເສົາດິນຮູບຮ່າງແປກຕາ ເກີດຈາກການກັດເຊາະຍາວນານ",
    id: "Pilar tanah unik yang terbentuk oleh erosi selama ribuan tahun",
    vi: "Những cột đất kỳ ảo được bào mòn qua hàng nghìn năm",
    my: "နှစ်ထောင်ချီ တိုက်စားမှုကြောင့် ဖြစ်လာသော ထူးဆန်းသည့် မြေတိုင်များ",
  },
  "A hilltop temple overlooking rice fields and the Doi Phu Kha range": {
    zh: "山丘上的寺庙，可俯瞰稻田与杜普卡山脉",
    ja: "田園とドイ・プーカ山並みを望む丘の上の寺院",
    lo: "ວັດເທິງເນີນ ມອງເຫັນທົ່ງນາ ແລະ ທິວເຂົາດອຍພູຄາ",
    id: "Kuil di puncak bukit dengan pemandangan sawah dan pegunungan Doi Phu Kha",
    vi: "Ngôi chùa trên đồi nhìn ra ruộng lúa và dãy Doi Phu Kha",
    my: "စပါးခင်းများနှင့် ဒွိုင်ဖူခါတောင်တန်းကို မြင်ရသော တောင်ကုန်းပေါ်ဘုရားကျောင်း",
  },
  "Home of the Tai Lue ‘flowing-water’ weaving of Ban Nong Bua, Pua": {
    zh: "普阿班农布傣泐“流水纹”织布的故乡",
    ja: "プア・バーンノーンブアのタイリュー「流水文様」織物の里",
    lo: "ແຫຼ່ງຜ້າທໍລາຍນ້ຳໄຫຼຂອງຊາວໄທລື້ບ້ານໜອງບົວ ປົວ",
    id: "Rumah tenun Tai Lue motif air mengalir di Ban Nong Bua, Pua",
    vi: "Nơi dệt hoa văn nước chảy của người Tai Lue ở Ban Nong Bua, Pua",
    my: "ပွါ ဘန်နောင်ဘွာရှိ တိုင်လူး ‘ရေစီးကြောင်း’ ပုံစံယက်ထည်၏ အိမ်",
  },
  "A gilded golden viharn guarded by a magnificent seven-headed Naga": {
    zh: "金碧辉煌的佛殿，由壮观七首那伽守护",
    ja: "荘厳な七頭ナーガに守られた黄金の本堂",
    lo: "ວິຫານສີທອງອ່າມ ມີພະຍານາກເຈັດຫົວສວຍງາມຄຸ້ມຄອງ",
    id: "Viharn emas berkilau dijaga Naga tujuh kepala yang megah",
    vi: "Chánh điện vàng rực được rắn Naga bảy đầu uy nghi bảo hộ",
    my: "လှပသော ခေါင်းခုနစ်လုံး နဂါးက စောင့်ရှောက်သည့် ရွှေရောင်ဝိဟာရ",
  },
  "An evening market by the old square — local food and crafts": {
    zh: "古城广场旁的夜市，有本地美食与手工艺",
    ja: "旧広場そばの夕市。地元料理と工芸品が並ぶ",
    lo: "ຕະຫຼາດແລງຂ້າງຂ່ວງເມືອງ ມີອາຫານພື້ນເມືອງ ແລະ ຫັດຖະກຳ",
    id: "Pasar malam di alun-alun lama dengan makanan lokal dan kerajinan",
    vi: "Chợ tối bên quảng trường cổ với món địa phương và hàng thủ công",
    my: "မြို့ဟောင်းရင်ပြင်ဘေး ညနေဈေး၊ ဒေသအစားအစာနှင့် လက်မှုပစ္စည်းများ",
  },
  "A roadside stop over rolling mountains on the Pua–Bo Kluea route": {
    zh: "普阿至波克勒路线上俯瞰层叠山峦的观景点",
    ja: "プア–ボークルア道中、連なる山並みを望む休憩スポット",
    lo: "ຈຸດແວະຂ້າງທາງຊົມວິວພູເຂົາຊ້ອນກັນ ເສັ້ນທາງປົວ–ບໍ່ເກືອ",
    id: "Tempat singgah di jalur Pua–Bo Kluea dengan panorama pegunungan berlapis",
    vi: "Điểm dừng ven đường ngắm núi trùng điệp trên tuyến Pua–Bo Kluea",
    my: "ပွါ–ဘိုကလွာ လမ်းပေါ်ရှိ တောင်တန်းအလွှာများကိုကြည့်နိုင်သော လမ်းဘေးနေရာ",
  },
  "An ancient Tai Lue viharn with priceless wall paintings": {
    zh: "古老傣泐佛殿，拥有珍贵壁画",
    ja: "貴重な壁画を持つ古いタイリュー様式の本堂",
    lo: "ວິຫານໄທລື້ເກົ່າແກ່ ມີຈິດຕະກຳຝາຜະໜັງລ້ຳຄ່າ",
    id: "Viharn Tai Lue kuno dengan lukisan dinding yang tak ternilai",
    vi: "Chánh điện Tai Lue cổ với tranh tường vô giá",
    my: "တန်ဖိုးမဖြတ်နိုင်သော နံရံပန်းချီများရှိသည့် ရှေးဟောင်းတိုင်လူးဝိဟာရ",
  },

  Culture: { zh: "文化", ja: "文化", lo: "ວັດທະນະທຳ", id: "Budaya", vi: "Văn hóa", my: "ယဉ်ကျေးမှု" },
  Craft: { zh: "手工艺", ja: "工芸", lo: "ຫັດຖະກຳ", id: "Kerajinan", vi: "Thủ công", my: "လက်မှုပညာ" },
  "Must-see": { zh: "必看", ja: "必見", lo: "ຫ້າມພາດ", id: "Wajib lihat", vi: "Không thể bỏ lỡ", my: "မဖြစ်မနေကြည့်ရန်" },
  Stupa: { zh: "佛塔", ja: "仏塔", lo: "ພຣະທາດ", id: "Stupa", vi: "Bảo tháp", my: "စေတီ" },
  Museum: { zh: "博物馆", ja: "博物館", lo: "ພິພິທະພັນ", id: "Museum", vi: "Bảo tàng", my: "ပြတိုက်" },
  Heritage: { zh: "遗产", ja: "遺産", lo: "ມໍຣະດົກ", id: "Warisan", vi: "Di sản", my: "အမွေအနှစ်" },
  Salt: { zh: "盐", ja: "塩", lo: "ເກືອ", id: "Garam", vi: "Muối", my: "ဆား" },
  Wellness: { zh: "养生", ja: "ウェルネス", lo: "ສຸຂະພາບ", id: "Kebugaran", vi: "Sức khỏe", my: "ကျန်းမာရေး" },
  Mountain: { zh: "山", ja: "山", lo: "ພູເຂົາ", id: "Gunung", vi: "Núi", my: "တောင်" },
  "Slow life": { zh: "慢生活", ja: "スローライフ", lo: "ຊີວິດຊ້າໆ", id: "Hidup santai", vi: "Sống chậm", my: "အေးချမ်းသောဘဝ" },
  Mist: { zh: "云海", ja: "霧", lo: "ທະເລໝອກ", id: "Kabut", vi: "Sương mù", my: "မြူ" },
  Camping: { zh: "露营", ja: "キャンプ", lo: "ການຕັ້ງແຄມป์", id: "Berkemah", vi: "Cắm trại", my: "စခန်းချ" },
  Geology: { zh: "地质", ja: "地質", lo: "ທໍລະນີວິທະຍາ", id: "Geologi", vi: "Địa chất", my: "ဘူမိဗေဒ" },
  Viewpoint: { zh: "观景点", ja: "展望台", lo: "ຈຸດຊົມວິວ", id: "Titik pandang", vi: "Điểm ngắm cảnh", my: "ရှုခင်းကြည့်နေရာ" },
  Weaving: { zh: "织布", ja: "織物", lo: "ຜ້າທໍ", id: "Tenun", vi: "Dệt", my: "ယက်လုပ်ခြင်း" },
  Food: { zh: "美食", ja: "食事", lo: "ອາຫານ", id: "Makanan", vi: "Ẩm thực", my: "အစားအစာ" },
  "Night market": { zh: "夜市", ja: "夜市", lo: "ຕະຫຼາດກາງຄືນ", id: "Pasar malam", vi: "Chợ đêm", my: "ညဈေး" },
  Café: { zh: "咖啡馆", ja: "カフェ", lo: "ຄາເຟ່", id: "Kafe", vi: "Cà phê", my: "ကဖေး" },

  "Crafts & culture": { zh: "手工艺 / 文化", ja: "工芸 / 文化", lo: "ຫັດຖະກຳ / ວັດທະນະທຳ", id: "Kerajinan / budaya", vi: "Thủ công / văn hóa", my: "လက်မှုပညာ / ယဉ်ကျေးမှု" },
  "Local events": { zh: "本地活动", ja: "地域イベント", lo: "ອີເວນທ້ອງຖິ່ນ", id: "Acara lokal", vi: "Sự kiện địa phương", my: "ဒေသခံပွဲများ" },
  Dining: { zh: "餐饮", ja: "食事", lo: "ຮ້ານອາຫານ", id: "Kuliner", vi: "Ẩm thực", my: "စားသောက်ခြင်း" },
  Other: { zh: "其他", ja: "その他", lo: "ອື່ນໆ", id: "Lainnya", vi: "Khác", my: "အခြား" },

  "Stunning murals, the AI guide told the story beautifully.": {
    zh: "壁画非常美，AI 向导讲得很生动。",
    ja: "壁画が素晴らしく、AIガイドの説明もとても分かりやすかったです。",
    lo: "ຈິດຕະກຳສວຍຫຼາຍ AI ເລົ່າເລື່ອງໄດ້ດີ.",
    id: "Muralnya indah, pemandu AI bercerita dengan sangat baik.",
    vi: "Tranh tường rất đẹp, hướng dẫn AI kể chuyện rất hay.",
    my: "နံရံပန်းချီတွေ လှပပြီး AI လမ်းညွှန်က ဇာတ်လမ်းကို ကောင်းကောင်းရှင်းပြသည်။",
  },
  "Loved seeing the traditional salt-boiling craft.": {
    zh: "看到传统熬盐技艺很令人难忘。",
    ja: "伝統的な塩づくりを見られて感動しました。",
    lo: "ປະທັບໃຈທີ່ໄດ້ເຫັນພູມປັນຍາການຕົ້ມເກືອ.",
    id: "Senang melihat kerajinan merebus garam tradisional.",
    vi: "Rất thích khi được xem nghề nấu muối truyền thống.",
    my: "ရိုးရာဆားချက်လုပ်ငန်းကို မြင်ရတာ အလွန်နှစ်သက်သည်။",
  },
  "Beautiful mist, though the road is winding.": {
    zh: "云海很美，不过山路比较弯。",
    ja: "雲海は美しいですが、道はかなり曲がりくねっています。",
    lo: "ທະເລໝອກສວຍ ແຕ່ເສັ້ນທາງຄົດເຄັ້ຽວ.",
    id: "Kabutnya indah, meski jalannya berkelok.",
    vi: "Biển mây rất đẹp, dù đường lên khá quanh co.",
    my: "မြူတိမ်ပင်လယ်လှသော်လည်း လမ်းကွေ့ကောက်များသည်။",
  },
  "Trying the weaving myself was so much fun.": {
    zh: "亲手体验织布非常有趣。",
    ja: "自分で織物を体験できてとても楽しかったです。",
    lo: "ການລອງທໍຜ້າດ້ວຍຕົນເອງມ່ວນຫຼາຍ.",
    id: "Mencoba menenun sendiri sangat menyenangkan.",
    vi: "Tự thử dệt vải rất vui.",
    my: "ကိုယ်တိုင်ယက်ကြည့်ရတာ အလွန်ပျော်စရာကောင်းသည်။",
  },

  "Nan has so much to offer! Start with Wat Phumin, Bo Kluea, and Doi Phu Kha — or ask me about food, stays, or routes.": {
    zh: "南府有很多值得探索的地方！可以从普明寺、波克勒和杜普卡开始，也可以问我美食、住宿或路线。",
    ja: "ナーンには魅力がたくさんあります。まずはワット・プーミン、ボークルア、ドイ・プーカから。食事、宿泊、ルートも聞いてください。",
    lo: "ນ່ານມີຂອງດີຫຼາຍ! ເລີ່ມຈາກວັດພູມິນ, ບໍ່ເກືອ ແລະ ດອຍພູຄາ ຫຼືຖາມຂ້ອຍເລື່ອງອາຫານ ທີ່ພັກ ຫຼືເສັ້ນທາງ.",
    id: "Nan punya banyak hal menarik! Mulai dari Wat Phumin, Bo Kluea, dan Doi Phu Kha, atau tanya saya tentang makanan, penginapan, dan rute.",
    vi: "Nan có rất nhiều điều thú vị! Hãy bắt đầu với Wat Phumin, Bo Kluea và Doi Phu Kha, hoặc hỏi tôi về món ăn, nơi ở hay lộ trình.",
    my: "နန်းမှာ စိတ်ဝင်စားစရာများစွာရှိသည်။ Wat Phumin၊ Bo Kluea နှင့် Doi Phu Kha မှ စတင်ပါ၊ သို့မဟုတ် အစားအစာ၊ တည်းခိုရန်နေရာ၊ ခရီးလမ်းကြောင်းများကို မေးနိုင်သည်။",
  },
  "Try the local northern food at Nan Walking Street — khan toke and plenty of street eats await.": {
    zh: "推荐去南府步行街品尝北部本地美食，有ขันโตก和很多街头小吃。",
    ja: "ナーン・ウォーキングストリートで北部料理をどうぞ。カントークや屋台料理が楽しめます。",
    lo: "ແນະນຳລອງອາຫານພື້ນເມືອງທີ່ຖະໜົນຄົນຍ່າງນ່ານ ມີຂັນໂຕກ ແລະ ອາຫານຫຼາກຫຼາຍ.",
    id: "Coba makanan lokal utara di Nan Walking Street, ada khan toke dan banyak jajanan jalanan.",
    vi: "Hãy thử món miền Bắc địa phương ở Phố đi bộ Nan, có khan toke và nhiều món đường phố.",
    my: "Nan Walking Street တွင် မြောက်ပိုင်းဒေသအစားအစာများကို စမ်းကြည့်ပါ၊ khan toke နှင့် လမ်းဘေးအစားအစာများစွာရှိသည်။",
  },
  "Nan's signature souvenirs are flowing-water textiles and mountain salt — visit Lamduan Weaving and Bo Kluea.": {
    zh: "南府代表伴手礼是流水纹织物和山盐，推荐去兰端织布与波克勒。",
    ja: "ナーン名物のお土産は流水文様の織物と山塩です。ラムドゥアン織物とボークルアへどうぞ。",
    lo: "ຂອງຝາກຂຶ້ນຊື່ຂອງນ່ານແມ່ນຜ້າທໍລາຍນ້ຳໄຫຼ ແລະ ເກືອພູເຂົາ ແນະນຳລຳດວນຜ້າທໍ ແລະ ບໍ່ເກືອ.",
    id: "Oleh-oleh khas Nan adalah kain motif air mengalir dan garam gunung, kunjungi Tenun Lamduan dan Bo Kluea.",
    vi: "Quà đặc trưng của Nan là vải hoa văn nước chảy và muối núi, hãy ghé Lamduan Weaving và Bo Kluea.",
    my: "နန်း၏ နာမည်ကြီးအမှတ်တရများမှာ ရေစီးကြောင်းပုံစံယက်ထည်နှင့် တောင်ဆားဖြစ်ပြီး Lamduan Weaving နှင့် Bo Kluea ကို သွားပါ။",
  },
  "For the city there are many hotels in Mueang Nan; for nature lovers, a homestay in Sapan Village is lovely.": {
    zh: "市区可选择南府城内多家酒店；喜欢自然的话，สะปัน村民宿很适合。",
    ja: "市内ならムアンナーンに多くのホテルがあります。自然派にはサパン村のホームステイがおすすめです。",
    lo: "ໃນເມືອງມີໂຮງແຮມຫຼາຍແຫ່ງ ຖ້າມັກທຳມະຊາດແນະນຳໂຮມສະເຕບ້ານສະປັນ.",
    id: "Di kota ada banyak hotel di Mueang Nan; untuk pecinta alam, homestay di Desa Sapan sangat menarik.",
    vi: "Trong thành phố có nhiều khách sạn ở Mueang Nan; nếu yêu thiên nhiên, homestay ở làng Sapan rất đáng thử.",
    my: "မြို့တွင်းတွင် Mueang Nan ဟိုတယ်များစွာရှိပြီး သဘာဝနှစ်သက်သူများအတွက် Sapan Village homestay ကောင်းသည်။",
  },
  "Coffee lovers should head to Viewpoint 1715 and the streamside cafés of Sapan Village — epic mountain views.": {
    zh: "咖啡爱好者推荐去1715观景点和สะปัน村溪边咖啡馆，山景很壮观。",
    ja: "カフェ好きにはビューポイント1715とサパン村の川沿いカフェがおすすめ。山の眺めが最高です。",
    lo: "ສາຍກາເຟແນະນຳຈຸດຊົມວິວ 1715 ແລະ ຄາເຟ່ຮິມທານທີ່ບ້ານສະປັນ ວິວພູງາມຫຼາຍ.",
    id: "Pecinta kopi bisa ke Viewpoint 1715 dan kafe tepi sungai di Desa Sapan, pemandangan gunungnya luar biasa.",
    vi: "Người thích cà phê nên đến Viewpoint 1715 và các quán ven suối ở làng Sapan, cảnh núi rất đẹp.",
    my: "ကော်ဖီနှစ်သက်သူများအတွက် Viewpoint 1715 နှင့် Sapan Village ချောင်းဘေးကဖေးများကို သွားပါ၊ တောင်ရှုခင်းလှသည်။",
  },
  "Nature highlights: Doi Phu Kha, the sea of mist at Doi Samer Dao, and Sapan Village.": {
    zh: "自然亮点包括杜普卡、เสมอดาว山云海和สะปัน村。",
    ja: "自然の見どころはドイ・プーカ、ドイ・サムー・ダーオの雲海、サパン村です。",
    lo: "ຈຸດເດັ່ນທຳມະຊາດ: ດອຍພູຄາ, ທະເລໝອກດອຍເສມດາວ ແລະ ບ້ານສະປັນ.",
    id: "Sorotan alam: Doi Phu Kha, lautan kabut Doi Samer Dao, dan Desa Sapan.",
    vi: "Điểm nổi bật thiên nhiên: Doi Phu Kha, biển mây ở Doi Samer Dao và làng Sapan.",
    my: "သဘာဝအထူးနေရာများမှာ Doi Phu Kha၊ Doi Samer Dao တိမ်ပင်လယ်နှင့် Sapan Village ဖြစ်သည်။",
  },
  "Don't miss Wat Phumin (the whisper mural), Wat Phra That Chae Haeng, and Wat Si Phan Ton.": {
    zh: "不要错过普明寺（悄悄话壁画）、帕塔切亨寺和四色潘通寺。",
    ja: "ワット・プーミン（愛のささやき壁画）、ワット・プラタート・チェーヘーン、ワット・シーパントンは必見です。",
    lo: "ຫ້າມພາດວັດພູມິນ (ຮູບວາດກະຊິບຮັກ), ວັດພຣະທາດແຊ່ແຫ້ງ ແລະ ວັດສີພັນຕົ້ນ.",
    id: "Jangan lewatkan Wat Phumin (mural bisikan), Wat Phra That Chae Haeng, dan Wat Si Phan Ton.",
    vi: "Đừng bỏ lỡ Wat Phumin (tranh thì thầm), Wat Phra That Chae Haeng và Wat Si Phan Ton.",
    my: "Wat Phumin (ချစ်စကားတိုးတိုးပြောသော ပန်းချီ)၊ Wat Phra That Chae Haeng နှင့် Wat Si Phan Ton ကို မလွတ်စေနှင့်။",
  },
  "I've put together a one-day Nan city route for you — tap the itinerary below.": {
    zh: "我已为您整理南府城一日路线，请点下面的行程查看。",
    ja: "ナーン市内の1日ルートを作成しました。下の旅程をタップしてください。",
    lo: "ຂ້ອຍຈັດເສັ້ນທາງ 1 ມື້ໃນເມືອງນ່ານໃຫ້ແລ້ວ ກົດເບິ່ງແຜນດ້ານລຸ່ມ.",
    id: "Saya sudah menyiapkan rute satu hari di Kota Nan, ketuk itinerary di bawah.",
    vi: "Tôi đã tạo lộ trình một ngày trong thành phố Nan cho bạn, hãy chạm vào lịch trình bên dưới.",
    my: "နန်းမြို့အတွင်း တစ်ရက်ခရီးစဉ်ကို စီစဉ်ပေးပြီးပါပြီ၊ အောက်ပါ itinerary ကို နှိပ်ပါ။",
  },
  "Nan's signature crafts are Tai Lue weaving and temple murals — try Lamduan Weaving and Wat Nong Bua.": {
    zh: "南府代表工艺是傣泐织布和寺庙壁画，推荐兰端织布与农布寺。",
    ja: "ナーンを代表する工芸はタイリュー織物と寺院壁画です。ラムドゥアン織物とワット・ノーンブアへどうぞ。",
    lo: "ງານຫັດຖະກຳເດັ່ນຂອງນ່ານແມ່ນຜ້າທໍໄທລື້ ແລະ ຈິດຕະກຳວັດ ແນະນຳລຳດວນຜ້າທໍ ແລະ ວັດໜອງບົວ.",
    id: "Kerajinan khas Nan adalah tenun Tai Lue dan mural kuil, coba Tenun Lamduan dan Wat Nong Bua.",
    vi: "Thủ công đặc trưng của Nan là dệt Tai Lue và tranh tường chùa, hãy thử Lamduan Weaving và Wat Nong Bua.",
    my: "နန်း၏ ထင်ရှားသောလက်မှုပညာများမှာ တိုင်လူးယက်ထည်နှင့် ဘုရားနံရံပန်းချီများဖြစ်ပြီး Lamduan Weaving နှင့် Wat Nong Bua ကို စမ်းပါ။",
  },

  "Morning blessing at the city's sacred stupa": {
    zh: "清晨在城市圣塔祈福", ja: "朝、街の聖なる仏塔で参拝", lo: "ໄຫວ້ພຣະທາດສັກສິດຕອນເຊົ້າ", id: "Berkah pagi di stupa suci kota", vi: "Cầu an buổi sáng tại bảo tháp linh thiêng", my: "မြို့၏ သန့်ရှင်းစေတီတွင် မနက်ခင်းဆုတောင်း"
  },
  "See the famous whisper mural": {
    zh: "欣赏著名悄悄话壁画", ja: "有名なささやき壁画を見る", lo: "ຊົມຮູບວາດກະຊິບຮັກຊື່ດັງ", id: "Lihat mural bisikan terkenal", vi: "Xem bức tranh thì thầm nổi tiếng", my: "နာမည်ကြီး တိုးတိုးပြောပန်းချီကို ကြည့်ရန်"
  },
  "Black Ivory and the frangipani tunnel": {
    zh: "黑象牙与鸡蛋花隧道", ja: "黒象牙とプルメリアのトンネル", lo: "ງາຊ້າງດຳ ແລະ ອຸໂມງດອກລີລາວະດີ", id: "Gading Hitam dan lorong kamboja", vi: "Ngà voi đen và đường hoa sứ", my: "အနက်ရောင်ဆင်စွယ်နှင့် ဖရန်ဂျီပနီလမ်း"
  },
  "Golden viharn and seven-headed Naga": {
    zh: "金色佛殿与七首那伽", ja: "黄金の本堂と七頭ナーガ", lo: "ວິຫານສີທອງ ແລະ ນາກເຈັດຫົວ", id: "Viharn emas dan Naga tujuh kepala", vi: "Chánh điện vàng và Naga bảy đầu", my: "ရွှေရောင်ဝိဟာရနှင့် ခေါင်းခုနစ်လုံးနဂါး"
  },
  "End with the walking street and khan toke": {
    zh: "以步行街和ขันโตก晚餐收尾", ja: "ウォーキングストリートとカントークで締めくくり", lo: "ປິດທ້າຍດ້ວຍຖະໜົນຄົນຍ່າງ ແລະ ຂັນໂຕກ", id: "Akhiri dengan walking street dan khan toke", vi: "Kết thúc bằng phố đi bộ và khan toke", my: "Walking street နှင့် khan toke ဖြင့် အဆုံးသတ်ပါ"
  },
};

export function translateContentText(text: string, lang: LangCode): string {
  if (lang === "th") return text;
  return content[text]?.[lang] ?? text;
}

export function formatDistrictText(value: string, lang: LangCode): string {
  if (lang === "th") return value;

  const normalized = value.replace(/^อ\./, "").replace(/^อำเภอ/, "").trim();
  const translated = translateContentText(normalized, lang);

  if (translated === normalized) return value;
  if (lang === "en" || lang === "id") return `${translated} District`;
  if (lang === "zh") return `${translated}县`;
  if (lang === "ja") return `${translated}郡`;
  if (lang === "lo") return translated.startsWith("ເມືອງ") ? translated : `ເມືອງ${translated}`;
  if (lang === "vi") return `Huyện ${translated}`;
  if (lang === "my") return `${translated} ခရိုင်`;
  return translated;
}
