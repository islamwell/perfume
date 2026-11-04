# AROMATEK OSLO (v1.0.54) — Parfymehus & Kuratert Parfymeri

Eksklusiv e-handels- og kunstopplevelse for **Aromatek Oslo** — lokalisert i Tøyengata 3, 0190 Oslo (inne hos PakStar).

---

## 🌟 Versjon 1.0.54 Høydepunkter

1. **Nytt Merkenavn — Aromatek Oslo & Aromatek Perfumes**:
   - Rebranding gjennomført på tvers av hele nettstedet: tittel, metadata, OpenGraph, Twitter Cards, Schema.org JSON-LD, introduksjonsanimasjon, header, footer, retningslinjemodaler, Vipps-informasjon og kvitteringsgenerator.

2. **Ny Offisiell Logo (`images/aromatek-logo.jpeg`)**:
   - Lagt til `images/aromatek-logo.jpeg` som hovedlogo i:
     - Åpningsanimasjon (med gullinnrammet luksusmedaljong og glødeffekt).
     - Klebrig toppheader (responsivt tilpasset mobil og desktop).
     - Bunntekst (footer) og forhåndsvisninger.
   - Generert oppdaterte favicons og touch-ikoner (`favicon.png` og `apple-touch-icon.png`) direkte fra det nye emblemet.

3. **Fullverdig Lys Modus (Light Mode) etter Moderne Web-standarder**:
   - Lagt til temavelger i header (`#themeToggleBtn` med ☀️ / 🌙) og i mobilskuffen (`#mobNavTheme`).
   - Deklarert `<meta name="color-scheme" content="light dark">` og tidlig inline FOUC-hindringsskript i `<head>`.
   - Støtter automatisk gjenkjenning av operativsystemets fargevalg (`prefers-color-scheme`) samt lagring av brukerens manuelle valg i `localStorage` (`arx_theme`).
   - Automatisk synkronisering på tvers av faner via `storage`-hendelser.
   - Nøye avstemt kontrast og fargepalett i lys modus for alle 120 produktkort, filter- og søkefelt, modal-dialoger, handlekurvskuff, showroom og bunntekst.

4. **Lokal Buffer & Versjonering**:
   - Cache-nøkkel bumpet til `arx_custom_catalog_v54`.
   - Bunntekst og systemdokumentasjon oppdatert til `v1.0.54`.

---

## 🚀 Versjonering
`v1.0.54 (updated 2026-11-04 12:25)`
