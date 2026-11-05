# AROMATEK OSLO (v1.0.57) — Parfymehus & Kuratert Parfymeri

Eksklusiv e-handels- og kunstopplevelse for **Aromatek Oslo** — lokalisert i Tøyengata 3, 0190 Oslo (inne hos PakStar).

---

## 🌟 Versjon 1.0.57 Høydepunkter

1. **Automatisk Tilbakestilling av Filtre ved Toppsøk**:
   - Når brukeren søker i toppnavigasjonen (både på desktop `#topNavSearchInput` og i mobilmenyen `#mobNavSearchInput`), tilbakestilles merkefilteret (`activeBrand = 'all'`) og duftfamiliefilteret (`activeScent = 'all'`) automatisk.
   - Forhindrer at søk blokkeres av tidligere valgte merker eller duftnoter, slik at kunden umiddelbart finner enhver parfyme på tvers av hele katalogen på 120 produkter.
   - Forstørrelsesglass-ikonet i toppmenyen kan nå også klikkes for umiddelbart fokus og søk i katalogen.

2. **Lokal Buffer & Versjonering**:
   - Cache-nøkkel bumpet til `arx_custom_catalog_v57` med automatisk opprydding av eldre versjoner.
   - Bunntekst og systemdokumentasjon oppdatert til `v1.0.57`.

---

## 🌟 Versjon 1.0.56 Høydepunkter

1. **PakStar (`pakstaras.no`) E-handelsfunksjoner**:
   - **Dynamisk Kjøp-knapp & Inline Antallsvelger**: Hvert produktkort og topp-bestselgerkort har nå en integrert mengdestyrer (`.card-qty-stepper` med `−`, antall, `+`). Når et produkt legges i kurven, skifter kortet umiddelbart til `.in`-tilstand og viser steppertall. Redusering til 0 tilbakestiller kortet sømløst til «Kjøp»-knappen.
   - **Uforstyrret Handleflyt**: Hurtigkjøp fra kort legger varen rett i kurven uten å tvinge opp hele sideskuffen, slik at kunden kan handle uavbrutt akkurat som på PakStar.
   - **Handlekurv «Bump»-Mikroanimasjon**: Header-kurven spretter dynamisk (`@keyframes bump`) ved hver oppdatering.
   - **Luksus Gull Toast-Pille**: Elegant svevende varselpille (`#toastNotification.toast-pill`) med gullkant og hvit/mørk frostet glass som bekrefter at varen er lagt til eller oppdatert.
   - **Taktil Haptisk Respons**: Diskret vibrasjon (`navigator.vibrate(12)`) ved trykk på mobil.

2. **Prisjustering på Buhara Esans**:
   - Prisen for **Buhara Esans · 1 stk roll-on (7 ml)** er oppdatert til **99** (før 100) i både katalog, søk og heltekort 11.

3. **Fjerning av «kr»-tekst etter priser**:
   - Formatfunksjonen `nok` returnerer nå kun rent, formatert tall uten etterfølgende «kr» (f.eks. `899`, `499`, `99`), og hardkodet `kr`-tekst er fjernet fra heltekort, kjøpslinje og handlekurvoppsummering for et mer minimalistisk og eksklusivt uttrykk.

4. **Forbedrede Duftpiller & Merker (Hovedduft / Akkord)**:
   - Alle merkelapper på flakongene er løftet med luksuriøst frostet glass, gullkant og en lysende aksentprikk (`.badge-dot`).
   - All pris- og emballasjetekst (f.eks. «899 kr», «Magnetkork», «Sylinder-eske», «Slangeflakong») er erstattet med **parfymens faktiske hovedduftnoter** (f.eks. «Villhonning & Mørk Oud», «Grå Oud & Safran», «Kirsebær & Røkt Lær», «Sort Te & Ambroxan», «Krydret Eple & Kardemomme»).

5. **Fjerning av «Holy Makkah»**:
   - All forekomst av «Holy Makkah» er fjernet fra produsentfelt, bildebeskrivelser og spotlight-bannere for et renere merkevareuttrykk.

6. **Lokal Buffer & Versjonering**:
   - Cache-nøkkel bumpet til `arx_custom_catalog_v56` med automatisk opprydding av eldre versjoner.
   - Bunntekst og systemdokumentasjon oppdatert til `v1.0.56`.

---

## 🚀 Versjonering
`v1.0.57 (updated 2026-11-05 17:36)`
