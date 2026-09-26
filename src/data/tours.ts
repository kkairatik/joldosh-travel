import { unsplash } from "@/lib/images";
import { tourSchema } from "@/lib/tours/schema";

// Демо-данные. На этапе 4 они станут начальным наполнением базы (seed),
// а пока проверяются схемой при сборке: опечатка в поле — ошибка сразу

const item = {
  flight: {
    ru: "Перелёт из Бишкека и обратно",
    en: "Return flight from Bishkek",
  },
  transfer: {
    ru: "Трансфер аэропорт — отель — аэропорт",
    en: "Airport transfers",
  },
  insurance: { ru: "Медицинская страховка", en: "Travel medical insurance" },
  excursions: { ru: "Экскурсии по желанию", en: "Optional excursions" },
  meals: { ru: "Обеды и ужины", en: "Lunches and dinners" },
  personal: { ru: "Личные расходы", en: "Personal expenses" },
  visa: {
    ru: "Виза, если она нужна по вашему гражданству, — поможем оформить",
    en: "A visa, if your citizenship requires one — we can help",
  },
};

export const tours = tourSchema.array().parse([
  {
    slug: "antalya-all-inclusive",
    destination: "turkey",
    type: "beach",
    title: {
      ru: "Анталья: «всё включено» у моря",
      en: "Antalya: all-inclusive by the sea",
    },
    summary: {
      ru: "Семь ночей в отеле 5★ на первой линии в Ларе: песчаный пляж, аквапарк и питание «всё включено».",
      en: "Seven nights at a beachfront 5★ hotel in Lara: a sandy beach, a water park and all-inclusive dining.",
    },
    description: {
      ru: "Классический пляжный отдых для всей семьи. Отель на первой линии с собственным песчаным пляжем, открытыми бассейнами, аквапарком и детским клубом. Питание «всё включено»: завтраки, обеды, ужины, снеки и напитки весь день. Из Антальи легко добраться до водопадов Дюден, античного Перге и старого города Калеичи — экскурсии подскажем и забронируем на месте.",
      en: "A classic beach holiday for the whole family. A beachfront hotel with its own sandy beach, outdoor pools, a water park and a kids’ club. All-inclusive dining: breakfast, lunch, dinner, snacks and drinks all day. From Antalya it’s easy to reach the Düden waterfalls, ancient Perge and the old town of Kaleiçi — we’ll recommend and book excursions on the spot.",
    },
    price: 690,
    oldPrice: 820,
    nights: 7,
    hot: true,
    popularity: 98,
    images: [
      unsplash("photo-1668537901164-964d87c96976"),
      unsplash("photo-1591211028625-bf35ca092e43"),
      unsplash("photo-1713885639308-d953cc619ffd"),
      unsplash("photo-1620208467457-da5fa93c7936"),
    ],
    itinerary: [
      {
        day: 1,
        title: { ru: "Вылет из Бишкека", en: "Flight from Bishkek" },
        text: {
          ru: "Прямой рейс в Анталью, около 6 часов в пути. Трансфер в отель, заселение и ужин.",
          en: "Direct flight to Antalya, about 6 hours. Transfer to the hotel, check-in and dinner.",
        },
      },
      {
        day: 2,
        dayTo: 7,
        title: { ru: "Отдых на море", en: "Beach days" },
        text: {
          ru: "Пляж, бассейны и анимация отеля. По желанию — старый город Калеичи, водопады Дюден или яхт-тур вдоль побережья.",
          en: "The beach, pools and hotel entertainment. Optional trips to Kaleiçi old town, the Düden waterfalls or a yacht cruise along the coast.",
        },
      },
      {
        day: 8,
        title: { ru: "Возвращение домой", en: "Flight home" },
        text: {
          ru: "Завтрак, трансфер в аэропорт и вылет в Бишкек.",
          en: "Breakfast, transfer to the airport and flight back to Bishkek.",
        },
      },
    ],
    included: [
      item.flight,
      item.transfer,
      {
        ru: "Отель 5★ на первой линии, 7 ночей",
        en: "5★ beachfront hotel, 7 nights",
      },
      { ru: "Питание «всё включено»", en: "All-inclusive meals and drinks" },
      item.insurance,
    ],
    excluded: [item.excursions, item.personal, item.visa],
    departures: [
      "2026-10-03",
      "2026-10-10",
      "2026-10-17",
      "2026-10-24",
      "2026-10-31",
      "2027-05-01",
      "2027-05-15",
    ],
  },
  {
    slug: "istanbul-cappadocia",
    destination: "turkey",
    type: "sightseeing",
    title: { ru: "Стамбул и Каппадокия", en: "Istanbul and Cappadocia" },
    summary: {
      ru: "Мечети и базары Стамбула, прогулка по Босфору и рассвет на воздушном шаре над долинами Каппадокии.",
      en: "Istanbul’s mosques and bazaars, a Bosphorus cruise and a sunrise balloon flight over the valleys of Cappadocia.",
    },
    description: {
      ru: "Два самых узнаваемых образа Турции в одной поездке. Три дня в Стамбуле: Айя-София, Голубая мечеть, Гранд-базар и вечерний круиз по Босфору. Затем перелёт в Каппадокию — города в скалах, подземный город Деринкую и полёт на воздушном шаре на рассвете. Живём в бутик-отеле в историческом центре Стамбула и в пещерном отеле в Гёреме.",
      en: "Turkey’s two most iconic sights in one trip. Three days in Istanbul: Hagia Sophia, the Blue Mosque, the Grand Bazaar and an evening Bosphorus cruise. Then a flight to Cappadocia — towns carved into rock, the underground city of Derinkuyu and a sunrise balloon flight. You’ll stay in a boutique hotel in Istanbul’s historic centre and in a cave hotel in Göreme.",
    },
    price: 980,
    nights: 6,
    popularity: 85,
    images: [
      unsplash("photo-1604156789095-3348604c0f43"),
      unsplash("photo-1524231757912-21f4fe3a7200"),
      unsplash("photo-1623621534850-d325a1980c7e"),
      unsplash("photo-1589561454226-796a8aa89b05"),
      unsplash("photo-1643354812958-b648b92dc6c5"),
    ],
    itinerary: [
      {
        day: 1,
        title: { ru: "Прилёт в Стамбул", en: "Arrival in Istanbul" },
        text: {
          ru: "Прямой рейс из Бишкека, трансфер в отель в Султанахмете. Вечером — прогулка по площади Султанахмет.",
          en: "Direct flight from Bishkek, transfer to a hotel in Sultanahmet. An evening walk around Sultanahmet Square.",
        },
      },
      {
        day: 2,
        title: { ru: "Исторический Стамбул", en: "Historic Istanbul" },
        text: {
          ru: "С гидом: Айя-София, Голубая мечеть, цистерна Базилика и Гранд-базар.",
          en: "With a guide: Hagia Sophia, the Blue Mosque, the Basilica Cistern and the Grand Bazaar.",
        },
      },
      {
        day: 3,
        title: { ru: "Босфор и Галата", en: "The Bosphorus and Galata" },
        text: {
          ru: "Свободное утро, после обеда — Галатская башня, район Каракёй и вечерний круиз по Босфору.",
          en: "A free morning; in the afternoon, Galata Tower, the Karaköy district and an evening Bosphorus cruise.",
        },
      },
      {
        day: 4,
        title: { ru: "Перелёт в Каппадокию", en: "Flight to Cappadocia" },
        text: {
          ru: "Утренний рейс в Кайсери, долины Гёреме и музей под открытым небом. Заселение в пещерный отель.",
          en: "A morning flight to Kayseri, the Göreme valleys and the open-air museum. Check-in at a cave hotel.",
        },
      },
      {
        day: 5,
        title: { ru: "Воздушные шары", en: "Hot-air balloons" },
        text: {
          ru: "Полёт на воздушном шаре на рассвете (по желанию), подземный город Деринкую и долина Ихлара.",
          en: "An optional sunrise balloon flight, the underground city of Derinkuyu and the Ihlara Valley.",
        },
      },
      {
        day: 6,
        title: { ru: "Свободный день", en: "A free day" },
        text: {
          ru: "Конная прогулка по долинам, гончарные мастерские Аваноса или турецкий хаммам.",
          en: "Horse riding through the valleys, the pottery workshops of Avanos or a Turkish hammam.",
        },
      },
      {
        day: 7,
        title: { ru: "Возвращение домой", en: "Flight home" },
        text: {
          ru: "Трансфер в аэропорт Кайсери и вылет в Бишкек через Стамбул.",
          en: "Transfer to Kayseri airport and a flight to Bishkek via Istanbul.",
        },
      },
    ],
    included: [
      {
        ru: "Перелёты Бишкек — Стамбул — Кайсери — Бишкек",
        en: "Flights Bishkek — Istanbul — Kayseri — Bishkek",
      },
      item.transfer,
      {
        ru: "Отели 4★ с завтраками, 6 ночей",
        en: "4★ hotels with breakfast, 6 nights",
      },
      {
        ru: "Экскурсии с гидом по программе",
        en: "Guided tours as per the itinerary",
      },
      item.insurance,
    ],
    excluded: [
      {
        ru: "Полёт на воздушном шаре — от 180 $",
        en: "Balloon flight — from $180",
      },
      { ru: "Входные билеты в музеи", en: "Museum tickets" },
      item.meals,
      item.visa,
    ],
    departures: [
      "2026-10-09",
      "2026-10-23",
      "2026-11-06",
      "2026-11-20",
      "2026-12-04",
      "2027-02-12",
      "2027-03-12",
    ],
  },
  {
    slug: "dubai-city-and-beach",
    destination: "uae",
    type: "sightseeing",
    title: {
      ru: "Дубай: небоскрёбы и пляжи",
      en: "Dubai: skyscrapers and beaches",
    },
    summary: {
      ru: "Бурдж-Халифа, сафари в пустыне и пляжи Персидского залива — пять ночей в отеле 4★ рядом с метро.",
      en: "The Burj Khalifa, a desert safari and Persian Gulf beaches — five nights at a 4★ hotel near the metro.",
    },
    description: {
      ru: "Идеальный вариант для первой поездки в Эмираты. Отель 4★ в районе Дубай-Марина: в пяти минутах пляж JBR и метро. В программе — смотровая площадка Бурдж-Халифы, поющие фонтаны, джип-сафари по дюнам с ужином и свободные дни для шопинга и пляжа. Рейс из Бишкека — около четырёх часов.",
      en: "Perfect for a first trip to the Emirates. A 4★ hotel in Dubai Marina, five minutes from JBR beach and the metro. The programme includes the Burj Khalifa observation deck, the Dubai Fountain, a jeep safari over the dunes with dinner, and free days for shopping and the beach. The flight from Bishkek takes about four hours.",
    },
    price: 890,
    nights: 5,
    popularity: 95,
    images: [
      unsplash("photo-1512453979798-5ea266f8880c"),
      unsplash("photo-1523816572-a1a23d1a67b8"),
      unsplash("photo-1634148551170-d37d021e0cc9"),
      unsplash("photo-1549944850-84e00be4203b"),
      unsplash("photo-1686918269961-507270a5a238"),
    ],
    itinerary: [
      {
        day: 1,
        title: { ru: "Прилёт в Дубай", en: "Arrival in Dubai" },
        text: {
          ru: "Прямой рейс из Бишкека, трансфер в отель в Дубай-Марине.",
          en: "Direct flight from Bishkek, transfer to the hotel in Dubai Marina.",
        },
      },
      {
        day: 2,
        title: { ru: "Современный Дубай", en: "Modern Dubai" },
        text: {
          ru: "Обзорная экскурсия: Пальма Джумейра, Бурдж-эль-Араб, смотровая площадка Бурдж-Халифы и поющие фонтаны.",
          en: "City tour: Palm Jumeirah, the Burj Al Arab, the Burj Khalifa observation deck and the Dubai Fountain.",
        },
      },
      {
        day: 3,
        title: { ru: "Сафари в пустыне", en: "Desert safari" },
        text: {
          ru: "Утром пляж, после обеда — джип-сафари по дюнам, катание на верблюдах и ужин в бедуинском лагере.",
          en: "The beach in the morning, then a jeep safari over the dunes, camel rides and dinner at a Bedouin camp.",
        },
      },
      {
        day: 4,
        dayTo: 5,
        title: { ru: "Свободные дни", en: "Free days" },
        text: {
          ru: "Пляж JBR, аквапарк или шопинг в Dubai Mall. По желанию — поездка в Абу-Даби.",
          en: "JBR beach, a water park or shopping at Dubai Mall. An optional day trip to Abu Dhabi.",
        },
      },
      {
        day: 6,
        title: { ru: "Возвращение домой", en: "Flight home" },
        text: {
          ru: "Трансфер в аэропорт и вылет в Бишкек.",
          en: "Transfer to the airport and a flight back to Bishkek.",
        },
      },
    ],
    included: [
      item.flight,
      item.transfer,
      {
        ru: "Отель 4★ с завтраками, 5 ночей",
        en: "4★ hotel with breakfast, 5 nights",
      },
      {
        ru: "Обзорная экскурсия и билет на Бурдж-Халифу",
        en: "City tour and a Burj Khalifa ticket",
      },
      { ru: "Сафари в пустыне с ужином", en: "Desert safari with dinner" },
      item.insurance,
    ],
    excluded: [
      {
        ru: "Туристический сбор отеля — около 5 $ за ночь",
        en: "Hotel tourism fee — about $5 per night",
      },
      item.meals,
      item.visa,
    ],
    departures: [
      "2026-10-08",
      "2026-10-22",
      "2026-11-05",
      "2026-11-19",
      "2026-12-03",
      "2026-12-17",
      "2027-01-14",
      "2027-02-11",
    ],
  },
  {
    slug: "sharm-el-sheikh-red-sea",
    destination: "egypt",
    type: "beach",
    title: {
      ru: "Шарм-эль-Шейх: Красное море",
      en: "Sharm El Sheikh: the Red Sea",
    },
    summary: {
      ru: "Тёплое море круглый год, коралловый риф у самого берега и отель 5★ «всё включено» в бухте Наама-Бей.",
      en: "A warm sea all year round, a coral reef right off the beach and a 5★ all-inclusive hotel in Naama Bay.",
    },
    description: {
      ru: "Лучший способ сбежать к морю, когда в Бишкеке холодно: даже в ноябре вода прогревается до +26 °C. У отеля свой пляж с понтоном, от которого начинается риф, — с маской и трубкой каждый день становится экскурсией. Поездки на остров Тиран, в заповедник Рас-Мохаммед и к монастырю Святой Екатерины организуем на месте.",
      en: "The best way to escape to the sea when it’s cold in Bishkek: even in November the water is around 26 °C. The hotel has its own beach with a pontoon leading straight to the reef — with a mask and snorkel every day becomes an excursion. Trips to Tiran Island, Ras Mohammed National Park and St Catherine’s Monastery can be arranged on the spot.",
    },
    price: 620,
    oldPrice: 740,
    nights: 7,
    hot: true,
    popularity: 90,
    images: [
      unsplash("photo-1708694423464-0f5b19fb2444"),
      unsplash("photo-1700482323555-182b61c90794"),
      unsplash("photo-1633978077821-6b1b16a176a4"),
      unsplash("photo-1641966153139-98999b3eb6bb"),
      unsplash("photo-1666136242426-761b173a1412"),
    ],
    itinerary: [
      {
        day: 1,
        title: { ru: "Чартер из Бишкека", en: "Charter from Bishkek" },
        text: {
          ru: "Прямой рейс в Шарм-эль-Шейх, около 6 часов в пути. Трансфер в отель и ужин.",
          en: "Direct flight to Sharm El Sheikh, about 6 hours. Transfer to the hotel and dinner.",
        },
      },
      {
        day: 2,
        dayTo: 7,
        title: { ru: "Море и рифы", en: "The sea and the reefs" },
        text: {
          ru: "Пляж, снорклинг на домашнем рифе и анимация отеля. По желанию — морская прогулка на остров Тиран или дайвинг с инструктором.",
          en: "Beach time, snorkelling on the house reef and hotel entertainment. An optional boat trip to Tiran Island or a dive with an instructor.",
        },
      },
      {
        day: 8,
        title: { ru: "Возвращение домой", en: "Flight home" },
        text: {
          ru: "Трансфер в аэропорт и вылет в Бишкек.",
          en: "Transfer to the airport and a flight back to Bishkek.",
        },
      },
    ],
    included: [
      item.flight,
      item.transfer,
      {
        ru: "Отель 5★ в Наама-Бей, 7 ночей",
        en: "5★ hotel in Naama Bay, 7 nights",
      },
      { ru: "Питание «всё включено»", en: "All-inclusive meals and drinks" },
      item.insurance,
    ],
    excluded: [
      { ru: "Дайвинг и морские прогулки", en: "Diving and boat trips" },
      item.personal,
      item.visa,
    ],
    departures: [
      "2026-10-06",
      "2026-10-20",
      "2026-11-03",
      "2026-11-17",
      "2026-12-01",
      "2026-12-29",
      "2027-01-19",
      "2027-02-16",
    ],
  },
  {
    slug: "phuket-andaman-islands",
    destination: "thailand",
    type: "beach",
    title: {
      ru: "Пхукет: острова Андаманского моря",
      en: "Phuket: islands of the Andaman Sea",
    },
    summary: {
      ru: "Десять ночей у пляжа Ката, лодочные туры на Пхи-Пхи и в залив Пханг-Нга, тайский массаж и ночные рынки.",
      en: "Ten nights near Kata Beach, boat trips to Phi Phi and Phang Nga Bay, Thai massage and night markets.",
    },
    description: {
      ru: "Длинный отпуск для тех, кто хочет не только лежать на пляже. Отель 4★ в пяти минутах от пляжа Ката, одного из самых красивых на острове. Включены две морские экскурсии: на острова Пхи-Пхи с бухтой Майя и в залив Пханг-Нга к «острову Джеймса Бонда». Остальное время — море, кафе и вечерние рынки.",
      en: "A long holiday for those who want more than a sun lounger. A 4★ hotel five minutes from Kata Beach, one of the most beautiful on the island. Two boat trips are included: to the Phi Phi Islands and Maya Bay, and to Phang Nga Bay and “James Bond Island”. The rest of the time is for the sea, cafés and night markets.",
    },
    price: 1190,
    nights: 10,
    popularity: 76,
    images: [
      unsplash("photo-1534008897995-27a23e859048"),
      unsplash("photo-1589394815804-964ed0be2eb5"),
      unsplash("photo-1552465011-b4e21bf6e79a"),
      unsplash("photo-1577375837944-47617314bfd9"),
      unsplash("photo-1584314620461-90d4239969cf"),
    ],
    itinerary: [
      {
        day: 1,
        title: { ru: "Перелёт на Пхукет", en: "Flight to Phuket" },
        text: {
          ru: "Вылет из Бишкека с одной пересадкой, прилёт и трансфер в отель у пляжа Ката.",
          en: "A flight from Bishkek with one connection, arrival and transfer to the hotel near Kata Beach.",
        },
      },
      {
        day: 2,
        title: { ru: "Первый день у моря", en: "First beach day" },
        text: {
          ru: "Отдых после перелёта, вечером — смотровая площадка Карон и ужин из морепродуктов.",
          en: "Rest after the flight; in the evening, the Karon viewpoint and a seafood dinner.",
        },
      },
      {
        day: 3,
        title: { ru: "Острова Пхи-Пхи", en: "The Phi Phi Islands" },
        text: {
          ru: "Скоростной катер на Пхи-Пхи: бухта Майя, снорклинг и обед на острове.",
          en: "A speedboat to Phi Phi: Maya Bay, snorkelling and lunch on the island.",
        },
      },
      {
        day: 4,
        dayTo: 6,
        title: { ru: "Свободные дни", en: "Free days" },
        text: {
          ru: "Пляж, тайский массаж, статуя Большого Будды и ночной рынок Пхукет-тауна.",
          en: "The beach, Thai massage, the Big Buddha and the Phuket Town night market.",
        },
      },
      {
        day: 7,
        title: { ru: "Залив Пханг-Нга", en: "Phang Nga Bay" },
        text: {
          ru: "Каякинг среди известняковых скал и «остров Джеймса Бонда».",
          en: "Kayaking among limestone cliffs and “James Bond Island”.",
        },
      },
      {
        day: 8,
        dayTo: 10,
        title: { ru: "Время для себя", en: "Time for yourself" },
        text: {
          ru: "Дайвинг, кулинарный мастер-класс или просто пляж.",
          en: "Diving, a cooking class or simply the beach.",
        },
      },
      {
        day: 11,
        title: { ru: "Возвращение домой", en: "Flight home" },
        text: {
          ru: "Трансфер в аэропорт и вылет в Бишкек.",
          en: "Transfer to the airport and a flight back to Bishkek.",
        },
      },
    ],
    included: [
      item.flight,
      item.transfer,
      {
        ru: "Отель 4★ с завтраками, 10 ночей",
        en: "4★ hotel with breakfast, 10 nights",
      },
      {
        ru: "Морские экскурсии на Пхи-Пхи и в Пханг-Нгу",
        en: "Boat trips to Phi Phi and Phang Nga Bay",
      },
      item.insurance,
    ],
    excluded: [item.meals, item.excursions, item.personal],
    departures: [
      "2026-11-07",
      "2026-11-21",
      "2026-12-05",
      "2026-12-19",
      "2027-01-09",
      "2027-01-23",
      "2027-02-06",
    ],
  },
  {
    slug: "phu-quoc-direct-flight",
    destination: "vietnam",
    type: "beach",
    title: {
      ru: "Фукуок: прямой рейс из Бишкека",
      en: "Phu Quoc: a direct flight from Bishkek",
    },
    summary: {
      ru: "Белый песок пляжа Сао, закаты на западном побережье и отель 5★ с завтраками — и никаких пересадок.",
      en: "The white sand of Sao Beach, west-coast sunsets and a 5★ hotel with breakfast — and no connections.",
    },
    description: {
      ru: "Вьетнамский остров, который быстро становится любимым у туристов из Кыргызстана: прямой рейс, недорогая еда и тихое тёплое море. Отель 5★ на побережье Лонг-Бич. В стоимость включена морская прогулка по южным островам со снорклингом. На месте стоит прокатиться по канатной дороге на остров Хон-Тхом и заглянуть на ночной рынок.",
      en: "A Vietnamese island that is quickly becoming a favourite with travellers from Kyrgyzstan: a direct flight, affordable food and a calm, warm sea. A 5★ hotel on Long Beach. A boat trip around the southern islands with snorkelling is included. Don’t miss the cable car to Hon Thom island and the night market.",
    },
    price: 1050,
    oldPrice: 1240,
    nights: 9,
    hot: true,
    popularity: 88,
    images: [
      unsplash("photo-1693282814784-649be45a459b"),
      unsplash("photo-1732243395944-cb3ff9311091"),
      unsplash("photo-1698809807960-758cf416e96e"),
      unsplash("photo-1737192577662-57ede8310e89"),
    ],
    itinerary: [
      {
        day: 1,
        title: { ru: "Прямой рейс", en: "A direct flight" },
        text: {
          ru: "Вылет из Бишкека, прилёт на Фукуок и трансфер в отель на Лонг-Бич.",
          en: "A flight from Bishkek, arrival on Phu Quoc and transfer to the hotel on Long Beach.",
        },
      },
      {
        day: 2,
        dayTo: 4,
        title: { ru: "Пляж и закаты", en: "Beaches and sunsets" },
        text: {
          ru: "Отдых у моря, закаты на западном побережье и вечерний рынок в Зыонгдонге.",
          en: "Beach days, sunsets on the west coast and the evening market in Duong Dong.",
        },
      },
      {
        day: 5,
        title: { ru: "Южные острова", en: "The southern islands" },
        text: {
          ru: "Морская прогулка по архипелагу Ан-Тхой: снорклинг, обед на лодке и пляж Сао.",
          en: "A boat trip around the An Thoi archipelago: snorkelling, lunch on board and Sao Beach.",
        },
      },
      {
        day: 6,
        dayTo: 9,
        title: { ru: "Свободные дни", en: "Free days" },
        text: {
          ru: "Канатная дорога на Хон-Тхом, сафари-парк или спа. Или просто море.",
          en: "The Hon Thom cable car, the safari park or a spa. Or simply the sea.",
        },
      },
      {
        day: 10,
        title: { ru: "Возвращение домой", en: "Flight home" },
        text: {
          ru: "Трансфер в аэропорт и прямой рейс в Бишкек.",
          en: "Transfer to the airport and a direct flight to Bishkek.",
        },
      },
    ],
    included: [
      {
        ru: "Прямой рейс Бишкек — Фукуок — Бишкек",
        en: "Direct flight Bishkek — Phu Quoc — Bishkek",
      },
      item.transfer,
      {
        ru: "Отель 5★ с завтраками, 9 ночей",
        en: "5★ hotel with breakfast, 9 nights",
      },
      {
        ru: "Морская прогулка по южным островам",
        en: "Boat trip around the southern islands",
      },
      item.insurance,
    ],
    excluded: [
      { ru: "Канатная дорога на Хон-Тхом", en: "The Hon Thom cable car" },
      item.meals,
      item.visa,
    ],
    departures: [
      "2026-11-02",
      "2026-11-16",
      "2026-11-30",
      "2026-12-14",
      "2026-12-28",
      "2027-01-11",
      "2027-02-08",
    ],
  },
  {
    slug: "georgia-tbilisi-kazbegi-kakheti",
    destination: "georgia",
    type: "sightseeing",
    title: {
      ru: "Грузия: Тбилиси, Казбеги и Кахетия",
      en: "Georgia: Tbilisi, Kazbegi and Kakheti",
    },
    summary: {
      ru: "Старый Тбилиси, церковь Гергети у подножия Казбека и винные погреба Кахетии — с гидом и дегустацией.",
      en: "Old Tbilisi, Gergeti Church at the foot of Mount Kazbek and the wine cellars of Kakheti — with a guide and a tasting.",
    },
    description: {
      ru: "Грузия — это горы, вино и гостеприимство. Живём в бутик-отеле в старом Тбилиси, откуда пешком до серных бань и крепости Нарикала. Выезжаем по Военно-Грузинской дороге в Казбеги к церкви Гергети и проводим день в Кахетии с дегустацией в семейном винном погребе. Мцхета и монастырь Джвари — тоже в программе.",
      en: "Georgia is mountains, wine and hospitality. We stay in a boutique hotel in Old Tbilisi, within walking distance of the sulphur baths and Narikala Fortress. We drive the Georgian Military Road to Kazbegi and Gergeti Church, and spend a day in Kakheti with a tasting in a family wine cellar. Mtskheta and Jvari Monastery are part of the programme too.",
    },
    price: 760,
    nights: 6,
    popularity: 78,
    images: [
      unsplash("photo-1563284223-333497472e88"),
      unsplash("photo-1561731172-9d906d7b13bf"),
      unsplash("photo-1707833634540-f4c92117d68c"),
      unsplash("photo-1577986696086-c96095524959"),
      unsplash("photo-1623353857277-f4ddeb5695f6"),
    ],
    itinerary: [
      {
        day: 1,
        title: { ru: "Прилёт в Тбилиси", en: "Arrival in Tbilisi" },
        text: {
          ru: "Прямой рейс из Бишкека, трансфер в отель и ужин с грузинской кухней.",
          en: "Direct flight from Bishkek, transfer to the hotel and a Georgian dinner.",
        },
      },
      {
        day: 2,
        title: { ru: "Старый Тбилиси", en: "Old Tbilisi" },
        text: {
          ru: "Пешеходная экскурсия: Абанотубани, канатная дорога к Нарикале, мост Мира и улица Шардени.",
          en: "A walking tour: Abanotubani, the cable car to Narikala, the Bridge of Peace and Shardeni Street.",
        },
      },
      {
        day: 3,
        title: { ru: "Мцхета и Казбеги", en: "Mtskheta and Kazbegi" },
        text: {
          ru: "Древняя столица Мцхета, крепость Ананури и подъём к церкви Гергети с видом на Казбек.",
          en: "The ancient capital Mtskheta, Ananuri Fortress and the climb to Gergeti Church facing Mount Kazbek.",
        },
      },
      {
        day: 4,
        title: { ru: "Кахетия", en: "Kakheti" },
        text: {
          ru: "Сигнахи — «город любви», монастырь Бодбе и дегустация вина в семейном погребе.",
          en: "Sighnaghi, the “city of love”, Bodbe Monastery and a wine tasting in a family cellar.",
        },
      },
      {
        day: 5,
        dayTo: 6,
        title: { ru: "Свободные дни", en: "Free days" },
        text: {
          ru: "Серные бани, блошиный рынок у Сухого моста или поездка в Боржоми.",
          en: "The sulphur baths, the Dry Bridge flea market or a trip to Borjomi.",
        },
      },
      {
        day: 7,
        title: { ru: "Возвращение домой", en: "Flight home" },
        text: {
          ru: "Трансфер в аэропорт и вылет в Бишкек.",
          en: "Transfer to the airport and a flight back to Bishkek.",
        },
      },
    ],
    included: [
      item.flight,
      item.transfer,
      {
        ru: "Бутик-отель 4★ с завтраками, 6 ночей",
        en: "4★ boutique hotel with breakfast, 6 nights",
      },
      {
        ru: "Три экскурсии с гидом и транспортом",
        en: "Three guided tours with transport",
      },
      { ru: "Дегустация вина в Кахетии", en: "Wine tasting in Kakheti" },
      item.insurance,
    ],
    excluded: [
      { ru: "Серные бани", en: "The sulphur baths" },
      item.meals,
      item.personal,
    ],
    departures: [
      "2026-10-01",
      "2026-10-15",
      "2026-10-29",
      "2027-04-15",
      "2027-05-06",
      "2027-05-20",
    ],
  },
  {
    slug: "maldives-overwater-villa",
    destination: "maldives",
    type: "beach",
    title: {
      ru: "Мальдивы: вилла над водой",
      en: "The Maldives: an overwater villa",
    },
    summary: {
      ru: "Вилла на сваях над лагуной, гидросамолёт до острова и полупансион — отпуск, о котором мечтают годами.",
      en: "A villa on stilts above the lagoon, a seaplane to the island and half board — the holiday people dream about for years.",
    },
    description: {
      ru: "Семь ночей на острове-курорте в атолле Ари: четыре ночи в пляжной вилле и три — в вилле над водой с лестницей прямо в лагуну. Трансфер на гидросамолёте с видом на атоллы, полупансион, снорклинг с черепахами у домашнего рифа. Из Бишкека удобнее всего лететь через Дубай — подберём стыковку без долгого ожидания.",
      en: "Seven nights at an island resort in Ari Atoll: four nights in a beach villa and three in an overwater villa with steps straight into the lagoon. A seaplane transfer over the atolls, half board and snorkelling with turtles on the house reef. The easiest way from Bishkek is via Dubai — we’ll find a connection without a long layover.",
    },
    price: 2450,
    nights: 7,
    popularity: 65,
    images: [
      unsplash("photo-1590523277543-a94d2e4eb00b"),
      unsplash("photo-1541417904950-b855846fe074"),
      unsplash("photo-1602002418816-5c0aeef426aa"),
      unsplash("photo-1688949078626-a358f500e063"),
      unsplash("photo-1558281050-4c33200099c7"),
    ],
    itinerary: [
      {
        day: 1,
        title: { ru: "Прилёт и гидросамолёт", en: "Arrival and the seaplane" },
        text: {
          ru: "Перелёт из Бишкека со стыковкой в Дубае, гидросамолёт до острова и заселение в пляжную виллу.",
          en: "A flight from Bishkek via Dubai, a seaplane to the island and check-in to a beach villa.",
        },
      },
      {
        day: 2,
        dayTo: 4,
        title: { ru: "Остров и риф", en: "The island and the reef" },
        text: {
          ru: "Снорклинг на домашнем рифе, спа и ужины на пляже. По желанию — выход в море к мантам.",
          en: "Snorkelling on the house reef, the spa and dinners on the beach. An optional boat trip to see manta rays.",
        },
      },
      {
        day: 5,
        dayTo: 7,
        title: { ru: "Вилла над водой", en: "The overwater villa" },
        text: {
          ru: "Переезд в виллу над лагуной: завтраки на террасе и закаты прямо из воды.",
          en: "Move to a villa above the lagoon: breakfasts on the deck and sunsets straight from the water.",
        },
      },
      {
        day: 8,
        title: { ru: "Возвращение домой", en: "Flight home" },
        text: {
          ru: "Гидросамолёт в Мале и вылет в Бишкек через Дубай.",
          en: "A seaplane to Malé and a flight to Bishkek via Dubai.",
        },
      },
    ],
    included: [
      { ru: "Перелёт через Дубай и обратно", en: "Return flights via Dubai" },
      {
        ru: "Гидросамолёт до острова и обратно",
        en: "Return seaplane transfer",
      },
      {
        ru: "4 ночи в пляжной вилле и 3 ночи в вилле над водой",
        en: "4 nights in a beach villa and 3 nights in an overwater villa",
      },
      { ru: "Полупансион", en: "Half board" },
      item.insurance,
    ],
    excluded: [
      { ru: "Экологический налог Мальдив", en: "The Maldives green tax" },
      { ru: "Напитки и экскурсии", en: "Drinks and excursions" },
      item.personal,
    ],
    departures: [
      "2026-11-10",
      "2026-12-01",
      "2027-01-12",
      "2027-02-09",
      "2027-03-09",
    ],
  },
  {
    slug: "issyk-kul-and-karakol",
    destination: "kyrgyzstan",
    type: "mountains",
    title: { ru: "Иссык-Куль и Каракол", en: "Issyk-Kul and Karakol" },
    summary: {
      ru: "Южный берег Иссык-Куля, каньон Сказка, горячие источники Алтын-Арашана и ущелье Джеты-Огуз — без перелётов.",
      en: "The south shore of Issyk-Kul, Fairy Tale Canyon, the Altyn-Arashan hot springs and Jeti-Oguz gorge — no flights needed.",
    },
    description: {
      ru: "Путешествие вокруг «жемчужины Тянь-Шаня» на комфортном минивэне. Купаемся в озере, гуляем среди красных скал каньона Сказка, ночуем в Караколе и поднимаемся в долину Алтын-Арашан к горячим источникам. Обратно — по северному берегу мимо петроглифов Чолпон-Аты. Хорошее первое знакомство с Кыргызстаном, в том числе для гостей из-за рубежа.",
      en: "A journey around the “pearl of the Tian Shan” in a comfortable minivan. We swim in the lake, walk among the red rocks of Fairy Tale Canyon, stay in Karakol and ride up to the Altyn-Arashan valley and its hot springs. The way back follows the north shore past the Cholpon-Ata petroglyphs. A great first introduction to Kyrgyzstan, including for visitors from abroad.",
    },
    price: 390,
    nights: 5,
    popularity: 80,
    images: [
      unsplash("photo-1551189783-e226306fd8a1"),
      unsplash("photo-1675157935570-e04938711f1e"),
      unsplash("photo-1608497735578-11912e18ed9f"),
      unsplash("photo-1683910609611-cf259e4591f5"),
      unsplash("photo-1689788647851-3203de944519"),
    ],
    itinerary: [
      {
        day: 1,
        title: { ru: "Бишкек — южный берег", en: "Bishkek to the south shore" },
        text: {
          ru: "Выезд в 8:00, Боомское ущелье и каньон Сказка на закате. Ночь в гостевом доме у озера.",
          en: "Departure at 8:00, Boom Gorge and Fairy Tale Canyon at sunset. A night at a lakeside guesthouse.",
        },
      },
      {
        day: 2,
        title: { ru: "Джеты-Огуз", en: "Jeti-Oguz" },
        text: {
          ru: "Красные скалы «Семь быков» и «Разбитое сердце», купание в озере и переезд в Каракол.",
          en: "The red “Seven Bulls” and “Broken Heart” rocks, a swim in the lake and the drive to Karakol.",
        },
      },
      {
        day: 3,
        title: { ru: "Алтын-Арашан", en: "Altyn-Arashan" },
        text: {
          ru: "Подъём на внедорожнике в долину, горячие источники и ночь в горах.",
          en: "A 4×4 ride up the valley, hot springs and a night in the mountains.",
        },
      },
      {
        day: 4,
        title: { ru: "Каракол", en: "Karakol" },
        text: {
          ru: "Дунганская мечеть, Свято-Троицкий собор и ужин с ашлян-фу.",
          en: "The Dungan Mosque, Holy Trinity Cathedral and a dinner of ashlan-fu.",
        },
      },
      {
        day: 5,
        title: { ru: "Северный берег", en: "The north shore" },
        text: {
          ru: "Петроглифы Чолпон-Аты и свободное время на пляже.",
          en: "The Cholpon-Ata petroglyphs and free time on the beach.",
        },
      },
      {
        day: 6,
        title: { ru: "Возвращение в Бишкек", en: "Back to Bishkek" },
        text: {
          ru: "Завтрак и дорога в Бишкек, приезд к обеду.",
          en: "Breakfast and the drive back to Bishkek, arriving around lunchtime.",
        },
      },
    ],
    included: [
      {
        ru: "Минивэн и внедорожник по программе",
        en: "Minivan and 4×4 transport",
      },
      {
        ru: "Гостевые дома и отель, 5 ночей",
        en: "Guesthouses and a hotel, 5 nights",
      },
      { ru: "Завтраки и ужины", en: "Breakfasts and dinners" },
      { ru: "Гид и входные билеты", en: "A guide and entrance fees" },
    ],
    excluded: [
      { ru: "Обеды", en: "Lunches" },
      { ru: "Конные прогулки", en: "Horse riding" },
      item.personal,
    ],
    departures: [
      "2027-06-12",
      "2027-06-26",
      "2027-07-10",
      "2027-07-24",
      "2027-08-07",
      "2027-08-21",
    ],
  },
  {
    slug: "son-kul-horse-trek",
    destination: "kyrgyzstan",
    type: "mountains",
    title: {
      ru: "Сон-Куль: конный тур и юрты",
      en: "Son-Kul: a horse trek and yurts",
    },
    summary: {
      ru: "Высокогорное озеро на высоте 3016 м, два дня верхом по джайлоо и ночи в юрточном лагере под звёздами.",
      en: "A lake at 3,016 m, two days on horseback across the summer pastures and nights in a yurt camp under the stars.",
    },
    description: {
      ru: "Самое атмосферное путешествие по Кыргызстану. Из Кочкора едем к озеру Кол-Укок и дальше идём верхом с опытным проводником — лошади спокойные и подходят новичкам. Ночуем в юртах у пастухов, пробуем кумыс и бешбармак, встречаем рассвет на берегу Сон-Куля. Сезон — с середины июня до конца августа.",
      en: "The most atmospheric trip in Kyrgyzstan. From Kochkor we head to Kol-Ukok lake and continue on horseback with an experienced guide — the horses are calm and suit beginners. We sleep in herders’ yurts, try kumys and beshbarmak, and watch the sunrise on the shore of Son-Kul. The season runs from mid-June to the end of August.",
    },
    price: 290,
    nights: 3,
    popularity: 70,
    images: [
      unsplash("photo-1592240419090-5d933c5a759b"),
      unsplash("photo-1489421382202-f7ec0cfd96f7"),
      unsplash("photo-1783303391423-0085f18dc50e"),
      unsplash("photo-1595496358672-2d175fcdd01a"),
      unsplash("photo-1683910608510-a54ea52bb889"),
    ],
    itinerary: [
      {
        day: 1,
        title: { ru: "Бишкек — Кочкор", en: "Bishkek to Kochkor" },
        text: {
          ru: "Переезд в Кочкор, около 4 часов. Мастер-класс по войлочным коврам шырдак и ночь в гостевом доме.",
          en: "The drive to Kochkor, about 4 hours. A workshop on shyrdak felt carpets and a night at a guesthouse.",
        },
      },
      {
        day: 2,
        title: { ru: "Верхом к Кол-Укоку", en: "Riding to Kol-Ukok" },
        text: {
          ru: "Начинаем конный переход: ущелья, джайлоо и ночь в юртах у озера Кол-Укок.",
          en: "The horse trek begins: gorges, summer pastures and a night in yurts by Kol-Ukok lake.",
        },
      },
      {
        day: 3,
        title: { ru: "Перевал и Сон-Куль", en: "The pass and Son-Kul" },
        text: {
          ru: "Перевал на высоте около 3400 м и спуск к Сон-Кулю. Бешбармак на ужин в юрточном лагере.",
          en: "A pass at about 3,400 m and the descent to Son-Kul. Beshbarmak for dinner at the yurt camp.",
        },
      },
      {
        day: 4,
        title: {
          ru: "Рассвет и дорога домой",
          en: "Sunrise and the road home",
        },
        text: {
          ru: "Рассвет на озере, прогулка по берегу и возвращение в Бишкек к вечеру.",
          en: "Sunrise on the lake, a walk along the shore and the drive back to Bishkek by evening.",
        },
      },
    ],
    included: [
      { ru: "Транспорт по программе", en: "Transport as per the itinerary" },
      { ru: "Лошади и проводник", en: "Horses and a guide" },
      {
        ru: "Юрты и гостевой дом, 3 ночи",
        en: "Yurts and a guesthouse, 3 nights",
      },
      { ru: "Трёхразовое питание", en: "All meals" },
      { ru: "Мастер-класс по шырдаку", en: "The shyrdak workshop" },
    ],
    excluded: [
      { ru: "Аренда спального мешка", en: "Sleeping bag rental" },
      { ru: "Чаевые проводнику", en: "Tips for the guide" },
      item.personal,
    ],
    departures: [
      "2027-06-19",
      "2027-07-03",
      "2027-07-17",
      "2027-07-31",
      "2027-08-14",
    ],
  },
  {
    slug: "karakol-ski-weekend",
    destination: "kyrgyzstan",
    type: "ski",
    title: {
      ru: "Каракол: горнолыжные выходные",
      en: "Karakol: a ski weekend",
    },
    summary: {
      ru: "Лучший горнолыжный курорт Центральной Азии: трассы до 3040 м, ски-пасс на два дня и отель у подъёмников.",
      en: "Central Asia’s best ski resort: runs up to 3,040 m, a two-day ski pass and a hotel by the lifts.",
    },
    description: {
      ru: "Сухой пушистый снег, еловые леса и трассы для любого уровня — от пологих зелёных до чёрных. Живём в отеле у подножия склона, ски-пасс на два дня уже включён. Для новичков в первый день — занятие с инструктором. Вечером — горячие источники или ужин в Караколе.",
      en: "Dry powder, spruce forests and runs for every level, from gentle greens to blacks. We stay at a hotel at the foot of the slopes, and a two-day ski pass is included. Beginners get a lesson with an instructor on the first day. In the evening: hot springs or dinner in Karakol.",
    },
    price: 260,
    nights: 3,
    popularity: 60,
    images: [
      unsplash("photo-1639933319952-715226889d30"),
      unsplash("photo-1639936014191-130ed8733401"),
      unsplash("photo-1595686528907-725bf013cbfd"),
      unsplash("photo-1641919238084-448ec0bfd446"),
    ],
    itinerary: [
      {
        day: 1,
        title: { ru: "Дорога в Каракол", en: "The road to Karakol" },
        text: {
          ru: "Выезд из Бишкека в пятницу утром, вдоль Иссык-Куля в Каракол. Заселение и прокат снаряжения.",
          en: "Leave Bishkek on Friday morning and drive along Issyk-Kul to Karakol. Check-in and equipment rental.",
        },
      },
      {
        day: 2,
        dayTo: 3,
        title: { ru: "Катание", en: "Skiing" },
        text: {
          ru: "Два дня на склонах: ски-пасс включён, для новичков — инструктор. Вечером баня или горячие источники.",
          en: "Two days on the slopes with the ski pass included and an instructor for beginners. A sauna or hot springs in the evening.",
        },
      },
      {
        day: 4,
        title: { ru: "Возвращение домой", en: "Back home" },
        text: {
          ru: "Утреннее катание по желанию и возвращение в Бишкек к вечеру.",
          en: "An optional morning run and the drive back to Bishkek by evening.",
        },
      },
    ],
    included: [
      {
        ru: "Трансфер Бишкек — Каракол — Бишкек",
        en: "Transfer Bishkek — Karakol — Bishkek",
      },
      {
        ru: "Отель с завтраками, 3 ночи",
        en: "Hotel with breakfast, 3 nights",
      },
      { ru: "Ски-пасс на два дня", en: "A two-day ski pass" },
      {
        ru: "Занятие с инструктором для новичков",
        en: "A lesson with an instructor for beginners",
      },
    ],
    excluded: [
      { ru: "Прокат снаряжения", en: "Equipment rental" },
      item.meals,
      { ru: "Горячие источники", en: "Hot springs" },
    ],
    departures: [
      "2026-12-18",
      "2027-01-08",
      "2027-01-22",
      "2027-02-05",
      "2027-02-19",
      "2027-03-05",
    ],
  },
]);
