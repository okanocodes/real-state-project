import { http, HttpResponse } from "msw";
import { mockAdsDatabase, turkeyLocations } from "./mockDb";

export const handlers = [
  http.post("/api/listings", async ({ request }) => {
    try {
      const incomingData = await request.json();

      // Simple runtime server-side schema validations
      if (!incomingData.title || !incomingData.price || !incomingData.m2) {
        return new HttpResponse(
          JSON.stringify({ message: "Eksik zorunlu alanlar mevcut." }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      // Format payload data types cleanly to match database schemas
      const newListing = {
        ...incomingData,
        id: mockAdsDatabase.length + 1, // Keep incremental sequential IDs
        price: Number(incomingData.price),
        m2: Number(incomingData.m2),
        katSayisi: incomingData.katSayisi
          ? Number(incomingData.katSayisi)
          : undefined,
        esyali: incomingData.esyali === true || incomingData.esyali === "true",
        otopark:
          incomingData.otopark === true || incomingData.otopark === "true",
      };

      // Push to the top of our local in-memory array database
      mockAdsDatabase.unshift(newListing);

      // Return a successful resource creation response
      return HttpResponse.json(newListing, { status: 201 });
    } catch (error) {
      return new HttpResponse(
        JSON.stringify({ message: "Sunucu hatası oluştu." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }),

  //  Fetching Filtered Ads
  http.get("/api/listings", ({ request }) => {
    const url = new URL(request.url);

    // Parse query constraints from the incoming fetch request
    const category = url.searchParams.get("category");
    const searchQuery = url.searchParams.get("q");
    const il = url.searchParams.get("il");
    const ilce = url.searchParams.get("ilce");
    const mahalle = url.searchParams.get("mahalle");
    const minM2 = url.searchParams.get("minM2");
    const maxM2 = url.searchParams.get("maxM2");
    const odaSayisi = url.searchParams.get("odaSayisi");
    const binaYasi = url.searchParams.get("binaYasi");

    // --- NEWLY ADDED PARAMS ---
    const katSayisi = url.searchParams.get("katSayisi");
    const esyali = url.searchParams.get("esyali"); // Comes in as string "true" or "false"
    const otopark = url.searchParams.get("otopark"); // Comes in as string "true" or "false"

    let filteredResults = [...mockAdsDatabase];

    // Filter processing loops
    if (category)
      filteredResults = filteredResults.filter(
        (ad) => ad.category === category,
      );
    if (il) filteredResults = filteredResults.filter((ad) => ad.ilId === il);
    if (ilce)
      filteredResults = filteredResults.filter((ad) => ad.ilceId === ilce);
    if (mahalle)
      filteredResults = filteredResults.filter(
        (ad) => ad.mahalleId === mahalle,
      );
    if (minM2)
      filteredResults = filteredResults.filter((ad) => ad.m2 >= Number(minM2));
    if (maxM2)
      filteredResults = filteredResults.filter((ad) => ad.m2 <= Number(maxM2));

    // Housing specific specification matching rules
    if (category === "konut") {
      if (odaSayisi)
        filteredResults = filteredResults.filter(
          (ad) => ad.odaSayisi === odaSayisi,
        );
      if (binaYasi)
        filteredResults = filteredResults.filter(
          (ad) => ad.binaYasi === binaYasi,
        );
      if (katSayisi)
        filteredResults = filteredResults.filter(
          (ad) => ad.katSayisi === Number(katSayisi),
        );

      // Explicitly matching "true" strings against mock DB boolean values
      if (esyali === "true") {
        filteredResults = filteredResults.filter((ad) => ad.esyali === true);
      }
      if (otopark === "true") {
        filteredResults = filteredResults.filter((ad) => ad.otopark === true);
      }
    }

    if (searchQuery) {
      filteredResults = filteredResults.filter((ad) =>
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return HttpResponse.json(filteredResults);
  }),

  // 2. Active Location Drops
  http.get("/api/locations/active/cities", () => {
    const activeCityIds = [...new Set(mockAdsDatabase.map((ad) => ad.ilId))];
    const cities = turkeyLocations.cities.filter((c) =>
      activeCityIds.includes(c.id),
    );
    return HttpResponse.json(cities);
  }),

  http.get("/api/locations/active/districts", ({ request }) => {
    const url = new URL(request.url);
    const cityId = url.searchParams.get("cityId");
    const activeDistrictIds = [
      ...new Set(
        mockAdsDatabase
          .filter((ad) => ad.ilId === cityId)
          .map((ad) => ad.ilceId),
      ),
    ];
    const districts = turkeyLocations.districts.filter(
      (d) => d.cityId === cityId && activeDistrictIds.includes(d.id),
    );
    return HttpResponse.json(districts);
  }),

  http.get("/api/locations/active/neighborhoods", ({ request }) => {
    const url = new URL(request.url);
    const districtId = url.searchParams.get("districtId");
    const activeNeighborhoodIds = [
      ...new Set(
        mockAdsDatabase
          .filter((ad) => ad.ilceId === districtId)
          .map((ad) => ad.mahalleId),
      ),
    ];
    const neighborhoods = turkeyLocations.neighborhoods.filter(
      (n) =>
        n.districtId === districtId && activeNeighborhoodIds.includes(n.id),
    );
    return HttpResponse.json(neighborhoods);
  }),
];
