import { fakerTR as faker } from "@faker-js/faker";

// Static master list of locations for our system
export const turkeyLocations = {
  cities: [
    { id: "34", name: "İstanbul" },
    { id: "06", name: "Ankara" },
    { id: "35", name: "İzmir" },
  ],
  districts: [
    // --- İSTANBUL ---
    { id: "3401", cityId: "34", name: "Kadıköy" },
    { id: "3402", cityId: "34", name: "Beşiktaş" },
    { id: "3403", cityId: "34", name: "Sarıyer" },
    { id: "3404", cityId: "34", name: "Üsküdar" },
    { id: "3405", cityId: "34", name: "Şişli" },

    // --- ANKARA ---
    { id: "0601", cityId: "06", name: "Çankaya" },
    { id: "0602", cityId: "06", name: "Yenimahalle" },
    { id: "0603", cityId: "06", name: "Etimesgut" },
    { id: "0604", cityId: "06", name: "Gölbaşı" },

    // --- İZMİR ---
    { id: "3501", cityId: "35", name: "Bornova" },
    { id: "3502", cityId: "35", name: "Karşıyaka" },
    { id: "3503", cityId: "35", name: "Konak" },
    { id: "3504", cityId: "35", name: "Çeşme" },
    { id: "3505", cityId: "35", name: "Urla" },
  ],
  neighborhoods: [
    // Kadıköy (3401)
    { id: "340101", districtId: "3401", name: "Moda" },
    { id: "340102", districtId: "3401", name: "Fenerbahçe" },
    { id: "340103", districtId: "3401", name: "Suadiye" },
    { id: "340104", districtId: "3401", name: "Caddebostan" },

    // Beşiktaş (3402)
    { id: "340201", districtId: "3402", name: "Bebek" },
    { id: "340202", districtId: "3402", name: "Arnavutköy" },
    { id: "340203", districtId: "3402", name: "Levent" },
    { id: "340204", districtId: "3402", name: "Ortaköy" },

    // Sarıyer (3403)
    { id: "340301", districtId: "3403", name: "Tarabya" },
    { id: "340302", districtId: "3403", name: "Yeniköy" },
    { id: "340303", districtId: "3403", name: "Zekeriyaköy" },

    // Üsküdar (3404)
    { id: "340401", districtId: "3404", name: "Kuzguncuk" },
    { id: "340402", districtId: "3404", name: "Çengelköy" },
    { id: "340403", districtId: "3404", name: "Acıbadem" },

    // Şişli (3405)
    { id: "340501", districtId: "3405", name: "Nişantaşı" },
    { id: "340502", districtId: "3405", name: "Teşvikiye" },
    { id: "340503", districtId: "3405", name: "Mecidiyeköy" },

    // Çankaya (0601)
    { id: "060101", districtId: "0601", name: "Ayrancı" },
    { id: "060102", districtId: "0601", name: "Tunalı Hilmi" },
    { id: "060103", districtId: "0601", name: "Ümitköy" },
    { id: "060104", districtId: "0601", name: "Çukurambar" },

    // Yenimahalle (0602)
    { id: "060201", districtId: "0602", name: "Batıkent" },
    { id: "060202", districtId: "0602", name: "Çayyolu" },

    // Etimesgut (0603)
    { id: "060301", districtId: "0603", name: "Bağlıca" },
    { id: "060302", districtId: "0603", name: "Eryaman" },

    // Gölbaşı (0604)
    { id: "060401", districtId: "0604", name: "İncek" },
    { id: "060402", districtId: "0604", name: "Karşıyaka Mah." },

    // Bornova (3501)
    { id: "350101", districtId: "3501", name: "Alsancak" }, // (Note: Locally Konak, but mapped to Bornova here for old data backup safety)
    { id: "350102", districtId: "3501", name: "Kazımdirik" },
    { id: "350103", districtId: "3501", name: "Özkanlar" },

    // Karşıyaka (3502)
    { id: "350201", districtId: "3502", name: "Mavişehir" },
    { id: "350202", districtId: "3502", name: "Bostanlı" },
    { id: "350203", districtId: "3502", name: "Alaybey" },

    // Konak (3503)
    { id: "350301", districtId: "3503", name: "Göztepe" },
    { id: "350302", districtId: "3503", name: "Küçükyalı" },
    { id: "350303", districtId: "3503", name: "Kahramanlar" },

    // Çeşme (3504)
    { id: "350401", districtId: "3504", name: "Alaçatı" },
    { id: "350402", districtId: "3504", name: "Ilıca" },
    { id: "350403", districtId: "3504", name: "Dalyan" },

    // Urla (3505)
    { id: "350501", districtId: "3505", name: "İskele Mah." },
    { id: "350502", districtId: "3505", name: "Zeytinalanı" },
  ],
};

// Generate 100 random real estate ads
const generateMockAds = () => {
  const ads = [];
  const categories = ["konut", "arsa"];
  const roomOptions = ["1+1", "2+1", "3+1", "4+1"];
  const titleOptions = ["lüks", "fırsat", "kelepir"];
  const ageOptions = ["0", "1-5", "6-10", "11+"];

  for (let i = 1; i <= 100; i++) {
    const category = faker.helpers.arrayElement(categories);

    // Pick random location structures
    const neighborhood = faker.helpers.arrayElement(
      turkeyLocations.neighborhoods,
    );
    const district = turkeyLocations.districts.find(
      (d) => d.id === neighborhood.districtId,
    );
    const city = turkeyLocations.cities.find((c) => c.id === district.cityId);

    // Dynamic random seeds to guarantee varied placeholder graphics
    const seed1 = i * 10;
    const seed2 = i * 10 + 1;
    const seed3 = i * 10 + 2;
    const seed4 = i * 10 + 3;

    const baseAd = {
      id: i,
      category,
      title:
        category === "konut"
          ? `${district.name} satılık ${faker.helpers.arrayElement(roomOptions)} ${faker.helpers.arrayElement(titleOptions)} daire`
          : `${district.name} bölgesinde yatırımlık imarlı arsa`,
      price:
        category === "konut"
          ? faker.number.int({ min: 900000, max: 25000000 })
          : faker.number.int({ min: 1500000, max: 25000000 }),
      m2:
        category === "konut"
          ? faker.number.int({ min: 50, max: 250 })
          : faker.number.int({ min: 300, max: 5000 }),
      imageUrl: `https://picsum.photos/seed/${seed1}/800/600`,
      images: [
        `https://picsum.photos/seed/${seed1}/800/600`,
        `https://picsum.photos/seed/${seed2}/800/600`,
        `https://picsum.photos/seed/${seed3}/800/600`,
        `https://picsum.photos/seed/${seed4}/800/600`,
      ],
      ilId: city.id,
      ilName: city.name,
      ilceId: district.id,
      ilceName: district.name,
      mahalleId: neighborhood.id,
      mahalleName: neighborhood.name,
    };

    // Add unique metadata values depending on category
    if (category === "konut") {
      baseAd.odaSayisi = faker.helpers.arrayElement(roomOptions);
      baseAd.binaYasi = faker.helpers.arrayElement(ageOptions);
      baseAd.katSayisi = faker.number.int({ min: 1, max: 5 });
      baseAd.esyali = faker.datatype.boolean();
      baseAd.otopark = faker.datatype.boolean();
    }

    ads.push(baseAd);
  }
  return ads;
};

export const mockAdsDatabase = generateMockAds();
