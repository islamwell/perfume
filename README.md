# AROMATEK OSLO (v1.0.59) — Parfymehus & Kuratert Parfymeri

Eksklusiv e-handels- og kunstopplevelse for **Aromatek Oslo** — lokalisert i Tøyengata 3, 0190 Oslo (inne hos PakStar).

---

## 🌟 Versjon 1.0.59 Høydepunkter (Mobilvisning & Brukeropplevelse Optimalisering)

1. **Fjerning av «Perfume» i Mobilvisning av Aromatek**:
   - I mobil- og nettbrettvisning (`max-width: 54rem`) er ordet «PERFUMES» i logoen/merketittelen (`.brand-perfume-word`) skjult, slik at kun det rene og kraftfulle **AROMATEK** vises ved siden av logomedaljongen. Dette frigjør verdifull plass i toppmenyen, eliminerer visuell tranghet og forhindrer tekstbryting på små skjermer.

2. **Null Horisontal Scrolling & Ren Vertikal Visning av Produsenter**:
   - Den tidligere horisontale rullelinjen for produsentpiller (`overflow-x: auto; flex-wrap: nowrap;`) er fullstendig erstattet med et adaptivt, vertikalt 2-kolonners rutenett (`grid-template-columns: repeat(2, 1fr)`) på mobil.
   - Alle 16 sentrale dufthus (Surrati, Bujairami, Al Haramain, Risala, Lattafa, Maison Alhambra, Swiss Arabian, French Avenue, Reef, IBRAQ, Hamidi, Armaf, Bespoke London, Buhara Esans, Ahmed Al Maghribi og Luksus Gavesett) vises nå ryddig og vertikalt med full lesbarhet, nøyaktige antall og direkte filtrering uten sidesveiping.
   - Inkluderer en dedikert «Vis alle (120)»-knapp for umiddelbar tilbakestilling av filter.

3. **Betydelig Større og Mer Lettleste Fonter på Mobil**:
   - **Produktnavn (`.card-name`)**: Økt fra 0.85rem til **0.98rem – 1.02rem** med forbedret linjehøyde og kontrast.
   - **Produsentnavn (`.card-brand`)**: Økt fra 0.6rem til **0.78rem – 0.80rem** i fet gullskrift (`var(--gold)`).
   - **Priser (`.card-price`)**: Økt fra 1.05rem til **1.28rem – 1.35rem** i markant hvit skrift.
   - **Akkord-/Duftpiller (`.card-tag-badge`)**: Økt fra 0.62rem til **0.74rem** med romsligere polstring.
   - **Kjøp-knapper & Mengdestyrere**: Økt berøringshøyde til **40–42px** (oppfyller WCAG AA og Modern Web Guidance) med store, tydelige `+`/`−`-ikoner (`1.25rem – 1.3rem`).
   - **Filtere og Søkefelter**: Satt til standard **16px (1rem)** for å eliminere automatisk zoom på iOS Safari og gi maksimal lesbarhet.

4. **Mobil Quick-Finder Hub (Lynrask Finning av Varer & Produsenter)**:
   - Lagt til en dedikert, brukervennlig snarveishub (`#mobileQuickHub`) øverst på mobilvisningen med et fremtredende søkefelt («Søk blant 120 parfymer og merker...») og tre store, taktile hurtigknapper:
     - 🏛️ **Produsenter** (scroller direkte til den vertikale merkeoversikten)
     - ✨ **Bestselgere** (scroller til internettets mest solgte dufter)
     - 🛍️ **Alle (120)** (tilbakestiller filtre og scroller til hele flakongkatalogen)

5. **Lokal Buffer & Versjonering**:
   - Cache-nøkkel bumpet til `arx_custom_catalog_v59` med automatisk migrering og opprydding.
   - Bunntekst og systemdokumentasjon oppdatert til `v1.0.59 (updated 2026-11-09 15:45)`.

---

## 🌟 Versjon 1.0.58 Høydepunkter (Pre-Launch UI/UX Audit & Polish)

1. **2-Kolonners Responsivt Rutenett på Mobil**:
   - Optimalisert produktvisningen på mobilskjermer (`max-width: 439px`) fra en massiv 1-kolonne til et elegant, moderne 2-kolonners rutenett (`repeat(2, 1fr)` med 0.75rem mellomrom), tilsvarende bransjeledende e-handelsapper. Gjør blaing, produktsammenligning og kjøp vesentlig raskere og mer behagelig på telefon.

2. **Native Modal «Light-Dismiss» & Scroll-Inneslutning**:
   - Alle 9 modal-dialoger (`<dialog>`) er oppgradert med `closedby="any"` (moderne standard) samt en dedikert fallback for Safari, slik at brukeren enkelt kan lukke modaler ved å trykke på bakgrunnen utenfor boksen.
   - Lagt til `overscroll-behavior: contain;` på `dialog:modal` og `dialog::backdrop` (`overflow: hidden`) som hindrer uønsket rulling av bakgrunnssiden når en modal er åpen, uten layout shift.

3. **Tilgjengelighet & Taktil Ergonomi**:
   - Innført WCAG AA `:focus-visible` gullfokusramme (`outline: 2px solid var(--gold); outline-offset: 2px;`) for tastaturnavigasjon.
   - Taktile berøringsmål (`@media (pointer: coarse)`) på minst 32–44px for stepperknapper, fjern-knapper og lukk-ikoner for feilfrie trykk på berøringsskjermer.

4. **Komplett Fjerning av Steds- og Emballasjetekst**:
   - Ryddet bort alle gjenværende forekomster av «Mekka» og «Makkah» fra merkevelgere, spotlight-kort, dropdown-menyer og beskrivelser til fordel for et helhetlig «Surrati Perfumes».
   - Fjernet alle etterfølgende «kr»-tekster fra underoverskrifter og garantitekster («Maks 1 500»).

5. **Lokal Buffer & Versjonering**:
   - Cache-nøkkel bumpet til `arx_custom_catalog_v58` med automatisk opprydding av eldre versjoner.
   - Bunntekst og systemdokumentasjon oppdatert til `v1.0.58`.

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
`v1.0.59 (updated 2026-11-09 15:45)`
