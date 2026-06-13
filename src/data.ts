/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FlowerItem } from "./types";

// Import custom generated beautiful crop-accurate images
import imgBK001 from "./assets/images/mor_ayicikli_1780693927890.png";
import imgBK002 from "./assets/images/gokkusagi_rose_1780693950595.png";
import imgBK003 from "./assets/images/siyah_renkli_1780693964075.png";
import imgBK004 from "./assets/images/ask_sarili_kirmizi_1780693976526.png";
import imgBK005 from "./assets/images/kolye_seti_1780694028705.png";
import imgBK006 from "./assets/images/siyah_silindir_kutu_1780694042126.png";
import imgBK007 from "./assets/images/ayicikli_pembe_ruya_1780694150187.png";
import imgBK012 from "./assets/images/isikli_kelebek_kirmizi_1780694055353.png";
import imgBK013 from "./assets/images/isikli_kelebek_mor_1780694068533.png";
import imgBK014 from "./assets/images/luks_saatli_kirmizi_1780693991265.png";
import imgBK015 from "./assets/images/lila_saray_buketi_1780694165853.png";
import imgBK016 from "./assets/images/beyaz_ruya_1780694092976.png";
import imgBK017 from "./assets/images/zarif_melodi_1780694081316.png";
import imgBK021 from "./assets/images/mor_porselen_orkide_1780694181263.png";
import imgBK022 from "./assets/images/pembe_kalpli_gul_1780694005578.png";
import imgBK023 from "./assets/images/lilium_zambak_buketi_1780694194928.png";

// Import custom generated watch and gift images
import imgHD005 from "./assets/images/gumus_saat_png_1780694888335.png";
import imgHD006 from "./assets/images/kelebek_altin_saat_png_1780694901981.png";
import imgHD007 from "./assets/images/dikdortgen_gold_saat_png_1780694914749.png";
import imgHD008 from "./assets/images/kalpli_gumus_saat_png_1780694928627.png";
import imgHD009 from "./assets/images/isila_gold_saat_png_1780694949695.png";
import imgHD010 from "./assets/images/kirmizi_kalp_kutu_png_1780694962786.png";
import imgHD011 from "./assets/images/pembe_kalp_kutu_png_1780694974913.png";
import imgHD012 from "./assets/images/ask_kare_kutu_png_1780694989205.png";

const RAW_FLOWER_PRODUCTS: FlowerItem[] = [
  // BOUQUETS row 1 (Ayıcıklı ve Renkli Özel Tasarımlar)
  {
    id: "1",
    name: "Peluş Ayıcıklı Mor Gül Buketi",
    category: "BK-001",
    price: 890,
    image: imgBK001,
    description: "Derin mor güller arasına yerleştirilmiş 5 adet sevimli peluş beyaz ayıcık, lüks çift renkli mor ambalaj ile süslenmiştir.",
    details: "Özel ithal mor ve violet kadife yapay güller ile hazırlanan, her biri sevgiyle yerleştirilmiş 5 adet mini pofuduk beyaz ayıcıklı, solmayan rüya buket tasarımı.",
    type: "bouquet"
  },
  {
    id: "2",
    name: "Kelebekli Gökkuşağı Rüyası Gül Buketi",
    category: "BK-002",
    price: 950,
    image: imgBK002,
    description: "Mavi, mor, beyaz, turuncu ve pembe renklerin ahengi, parıltılı 3D kelebekler ve inci detaylı özel kağıt sargı.",
    details: "Pastel ve canlı tonlardaki rüya güllerinin eşsiz renk harmonisi. Üzerinde uçuşan hologramlı kelebekler ve kenarlarındaki zarif inci dikişleriyle masalsı bir tasarım.",
    type: "bouquet"
  },
  {
    id: "3",
    name: "Zıtların Uyumu Siyah & Renkli Gül Buketi",
    category: "BK-003",
    price: 980,
    image: imgBK003,
    description: "Yarısı asil kadife siyah güller, diğer yarısı mavi, pembe ve mor rüya gülleri. Senden Önce / Senden Sonra özel kartlı ve peluş ayıcıklı kurdele.",
    details: "Zarafetin zıt kutuplarını bir araya getiren başyapıt. 'Senden Önce' ve 'Senden Sonra' yazılı nostaljik aşk kartları ve kurdelesinde oturan şık peluş beyaz ayısıyla büyüleyici.",
    type: "bouquet"
  },
  {
    id: "4",
    name: "Aşk Sarılı Ayıcıklı Kırmızı Gül Buketi",
    category: "BK-004",
    price: 790,
    image: imgBK004,
    description: "Kırmızı aşk temalı 'Love' baskılı özel ambalajda sevimli peluş ayıcıklar ve tutkulu kırmızı güller.",
    details: "Aşkın en saf halini anlatan, etrafına serpilmiş sevimli ayıcıklar ve 'Love' desenli şık kırmızı-beyaz ambalajı ile kalpleri ısıtan romantik hediye.",
    type: "bouquet"
  },
  {
    id: "5",
    name: "Kalp Kutulu Kolye & Pembe Ayıcıklı Set",
    category: "BK-005",
    price: 1350,
    image: imgBK005,
    description: "Pembe güller, ayıcıklar ve yanında kırmızı kalp kutu içerisinde sergilenen altın renkli şık kalp kolye hediye seti.",
    details: "Bir buketten çok daha fazlası. Tatlı pembe güller ve peluş ayıcıklı buketin yanında, kırmızı kadife kaplı kalp hediye kutusunda sunulan altın kaplama zarif zincir kolye seti.",
    type: "bouquet"
  },
  {
    id: "6",
    name: "Seni Seviyorum Siyah Silindir Kutu",
    category: "BK-006",
    price: 680,
    image: imgBK006,
    description: "Lüks mat siyah silindir kutu içerisinde dairesel kırmızı güller ve tam ortada parlayan asil beyaz gül. Altın yaldızlı fiyonk.",
    details: "Siyah kutunun asaletinde parlayan kırmızı güller ve kalbinizin biricik simgesi olan tam ortadaki tek beyaz gül. 'Seni Seviyorum' yazılı fiyonksu kurdele ile tamamlanmıştır.",
    type: "bouquet"
  },
  {
    id: "7",
    name: "Ayıcıklı Pembe Rüya Gül Buketi",
    category: "BK-007",
    price: 850,
    image: imgBK007,
    description: "Tatlı pembe güller, pembe şık kurdeleli ambalaj ve yaprakların arasına titizlikle dizilmiş peluş pofuduk beyaz ayıcıklar.",
    details: "Adeta bir pamuk şekeri rüyası. Pembenin en tatlı tonlarındaki güller ve aralarında tebessüm eden pofuduk beyaz ayıcıkların sevimli uyumu.",
    type: "bouquet"
  },
  {
    id: "12",
    name: "Işıklı Kırmızı Kelebekler Rüyası",
    category: "BK-012",
    price: 880,
    image: imgBK012,
    description: "Kırmızı yarı şeffaf ledli sargıda parıldayan 3D el yapımı kırmızı kelebeklerin büyüleyici uçuşumu.",
    details: "Gecenizi aydınlatacak bir sihir. Buket içerisine gizlenmiş peri led ışıkları ve üzerinde adeta canlı gibi dans eden parıltılı kırmızı kelebek sanatı.",
    type: "bouquet"
  },
  {
    id: "13",
    name: "Işıklı Lavanta Kelebekler Rüyası",
    category: "BK-013",
    price: 890,
    image: imgBK013,
    description: "Mor tüller ve yarı şeffaf ledli sargıda parıldayan 3D el yapımı lavanta/mor kelebekler ile peri led aydınlatma.",
    details: "Mor rengin mistik atmosferinde süzülen 3D kelebekler. Sıcak sarı peri led aydınlatması ile karanlıkta büyüleyici bir fener gibi parlar.",
    type: "bouquet"
  },
  {
    id: "14",
    name: "Aklındasın Her Saat Özel Gül Saati",
    category: "BK-014",
    price: 1450,
    image: imgBK014,
    description: "Kırmızı kadife dairesel güllerin tam ortasında 'Her Saat Aklındasın' yazan şık dekoratif duvar saati.",
    details: "Zamanı durduran hediye. Hem eşsiz kırmızı güllerden oluşan bir buket, hem de duvara asılabilecek 'Her Saat Aklındasın' yazılı sessiz akar saate sahip çift değerli tasarım.",
    type: "bouquet"
  },
  {
    id: "15",
    name: "Asil Mor ve Pembe Güller Buketi",
    category: "BK-015",
    price: 750,
    image: imgBK015,
    description: "Ortada asil koyu mor güller ve etrafında onları taçlandıran soft şeker pembe gülleril çift kat sargılı görkemli harmonisi.",
    details: "Mor güllerin asil duruşu ile pembe güllerin narinliğini birleştiren, fisto teli ve elyaf kağıt sarımı ile göz dolduran özel aranjman.",
    type: "bouquet"
  },
  {
    id: "16",
    name: "Asil Mat Siyah Kağıtta Kırmızı Gül Buketi",
    category: "BK-016",
    price: 680,
    image: imgBK016,
    description: "Göz alıcı beyaz ve pudra gülleri simgeleyen, asil saf birinci sınıf beyaz ambalajlı buket.",
    details: "Kırmızının ve beyazın pürüzsüz ihtişamı. Ağır duruşu ve lüks görünümü ile özel tebrikler için vazgeçilmez bir klasik.",
    type: "bouquet"
  },
  {
    id: "17",
    name: "Romantik Gazete Kağıdında Pembe Güller",
    category: "BK-017",
    price: 640,
    image: imgBK017,
    description: "Nostaljik Fransız gazete baskılı özel ithal gazete kağıdına sarılı, taze pembe zarif güller.",
    details: "Retro ve vintage severler için nostaljik esintili tasarım. Klasik gazete kağıdının dokusuyla birleşen romantik pembe güllerın şıklığı.",
    type: "bouquet"
  },
  {
    id: "21",
    name: "Asil Mor Porselen Orkide Aranjmanı",
    category: "BK-021",
    price: 1100,
    image: imgBK021,
    description: "Asil koyu mor yapay phalaenopsis orkide çiçeklerinin lüks beyaz saksı ve tül detayları ile şaheser sunumu.",
    details: "Gaziantep içi en çok tercih edilen, kalıcılığı ve asil duruşuyla salonların başköşesinde yer alacak lüks mor orkide tasarımı.",
    type: "bouquet"
  },
  {
    id: "22",
    name: "Pedestalde 3D Kalp Gül Heykeli",
    category: "BK-022",
    price: 1950,
    image: imgBK022,
    description: "Özel tasarım siyah ahşap müze kaidesi üzerinde, kalp formunda özenle işlenmiş pudra pembe ve beyaz kadife güller.",
    details: "Görsel bir şölen! Kalp şekli verilmiş pürüzsüz gül kubbesi, mat siyah şık bir stant üzerinde yaşam alanlarına aşkın heykelini taşıyor.",
    type: "bouquet"
  },
  {
    id: "23",
    name: "Mis Kokulu Pembe & Beyaz Lilium Buketi",
    category: "BK-023",
    price: 820,
    image: imgBK023,
    description: "Büyüleyici kokusuyla kraliçe beyaz ve pembe liliumlar (zambak), kırmızı saten kurdeleli pürüzsüz beyaz ambalaj sarımı.",
    details: "Zambağın büyüleyici ferah kokusunu evinize getiren, taze yeşil yapraklarla beslenmiş, beyaz kuşe kağıda sarılı dairesel görkemli aranjman.",
    type: "bouquet"
  },

  // GIFTS SECTION (Hediyelikler & İlave Ürünler)
  {
    id: "28",
    name: "Premium Kadın Gümüş Kol Saati",
    category: "HD-005",
    price: 850,
    image: imgHD005,
    description: "Peluş yastık üzerinde lüks gümüş kaplama, kristal taş işlemeli kadın kol saati. Özel kırmızı alt tabanlı dikey kutuda.",
    details: "Özel günlerde sevdiğinize her saniye sizi hatırlatacak, gümüş kaplama kordonu parlak yapay elmaslarla bezeli şık ve minimalist asil kadın saati.",
    type: "gift"
  },
  {
    id: "29",
    name: "Kelebek Kordonlu Altın Kadın Kol Saati",
    category: "HD-006",
    price: 880,
    image: imgHD006,
    description: "Özel kelebek detaylı kordonu siyah simetrik taşlarla bezeli, şık altın dokulu kadranlı lüks hediye saati.",
    details: "Fark yaratmak isteyenler için özel olarak tasarlanmış parlak altın kaplama kasa. Kordonundaki çift kelebek figürü ve göz alıcı siyah taş işlemeleri ile eşsiz.",
    type: "gift"
  },
  {
    id: "30",
    name: "Vintage Dikdörtgen Gold Kadın Kol Saati",
    category: "HD-007",
    price: 920,
    image: imgHD007,
    description: "Asil siyah kadrana sahip, çevresi pırlanta kesim taşlarla çevrelenmiş şık dikdörtgen vintage kadın saati.",
    details: "Zamanın ötesinde bir şıklık sunan, kalp desenli aşk kutusunda peluş yastık üzerinde sergilenen gold tasarım saat, retro tarzı asil duruşla birleştiriyor.",
    type: "gift"
  },
  {
    id: "31",
    name: "Kalp Kadranlı Kristal Gümüş Kadın Saat",
    category: "HD-008",
    price: 890,
    image: imgHD008,
    description: "Çevresi ışıltılı pırlanta kesim taşlarla örülü romantik kalp kadrana sahip, yaprak sarmal gümüş kordonlu hediye saat.",
    details: "Kalbinizin sahibine sunabileceğiniz en anlamlı ve kalıcı hediyelerden biri. Yaprak sarmalı zarif gümüş kordonu ve kalpli tasarımıyla büyüleyici.",
    type: "gift"
  },
  {
    id: "32",
    name: "Işıltılı Yıldız Gold Kadın Kol Saati",
    category: "HD-009",
    price: 860,
    image: imgHD009,
    description: "Altın kadranında narin yıldız detayları bulunan, ışıltılı pırlanta bezeli dairesel narin zincir kadın saati.",
    details: "Gecenizi aydınlatacak bir yıldız gibi tasarlanmış, ince bilekler için narin gerdanlık uyumunda altın zincir yapısına sahip özel tasarım hediye saat.",
    type: "gift"
  },
  {
    id: "33",
    name: "Aşk Temalı Led Işıklı Kalp Hediye Kutusu",
    category: "HD-010",
    price: 980,
    image: imgHD010,
    description: "Büyük kırmızı saten fiyonklu, içerisinde peri led ışıklı aşk şişeleri ve el yapımı sürpriz kartlar içeren kalp şeklinde kutu.",
    details: "İçerisinde rulo şeklinde aşk mektupları, sıcak led ışıklarla aydınlatılmış romantik dekoratif şişeler ve özenle yerleştirilmiş kalpli detaylar ile dolu unutulmaz bir hediye kutu seti.",
    type: "gift"
  },
  {
    id: "34",
    name: "Sevgililer Kar Küresi & Led Işıklı Hediye Seti",
    category: "HD-011",
    price: 1150,
    image: imgHD011,
    description: "Pembe aşk temalı kalp kutuda; özel çift figürlü mavi kar küresi, led ışıklı dekor şişe ve premium kadın parfümü.",
    details: "Romantizmin doruk noktası rüya seti. Işıltılı kar küresi, sıcak peri led detayı, gül yaprakları ve teni taze çiçek kokusuyla saracak lüks kadın parfümü bir arada.",
    type: "gift"
  },
  {
    id: "35",
    name: "Gizemli Kırmızı Kare Aşk Hediye Kutusu",
    category: "HD-012",
    price: 1050,
    image: imgHD012,
    description: "Gold kalp işlemeli şık kırmızı kutuda; peluş kalp yastık, peri led ışıklı 'Love' dekoratif şişe ve lüks koku seti.",
    details: "Kırmızı kutudan süzülen sıcacık led parıltısı. Özel ambalajında kalıcı peluş kalpli yastık, pembe lüks parfüm ve tatlı sevgi detayları ile göz kamaştırıcı.",
    type: "gift"
  }
];

export const FLOWER_PRODUCTS: FlowerItem[] = RAW_FLOWER_PRODUCTS.map((item, index) => ({
  ...item,
  price: 400 + (index % 3) * 50
}));

export const GA_TIME_SLOTS = [
  "09:00 - 12:00",
  "12:00 - 15:00",
  "15:00 - 18:00",
  "18:00 - 21:00"
];
