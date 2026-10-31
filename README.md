# AROMATIX OSLO (v1.0.48) — Parfymehus & Kuratert Parfymeri

Eksklusiv e-handels- og kunstopplevelse for **Aromatix Oslo** — lokalisert i Tøyengata 3, 0190 Oslo (inne hos PakStar).

---

## 🌟 Versjon 1.0.48 Høydepunkter

1. **Surrati Perfumes Makkah & Risala Autograph (110 Utvalgte Flakonger)**:
   - Nytt luksusutvalg fra det ærverdige dufthuset **Surrati** fra Mekka:
     - **Surrati Oud Honey** (140 ml Eau de Parfum) – 899 kr
     - **Surrati Rosso Ombré** (150 ml Extrait de Parfum) – 899 kr
     - **Surrati Fabrica** (150 ml Extrait de Parfum) – 899 kr
     - **Surrati Cuban Tobacco** (100 ml Signature Extrait) – 899 kr
     - **Surrati Jewel** (140 ml Prestige EDP) – 899 kr
     - **Surrati Dolce Marina** (140 ml Riviera Edition) – 899 kr
   - Lagt til den virale nisjesensasjonen **Le Falconé Risala Autograph** (100 ml Eau de Parfum, Isola Blu DNA) – 649 kr.
   - Dedikerte hurtigfiltre for både Surrati og Risala i desktop- og mobilmenyen samt sortering i katalogen.
   - Oppdaterte produktbilder i høy oppløsning (960×1200) lagret lokalt i `images/`.

2. **Direkte Telegram-Varsling ved Bestilling**:
   - Backend Cloudflare-funksjon (`/functions/api/orders.js`) sender automatisk en ryddig, formatert ordrekvittering til butikkeiers Telegram så snart kunden klikker «Send Bestillingsforespørsel».
   - Inkluderer ordrenummer, kundens navn, Vipps-mobilnummer, leveringsmåte (Tøyengata 3 henting eller Posten Norgespakke), spesifikke duftvarianter/størrelser, delsum, frakt og totalt Vipps-beløp.

3. **Ordre- & Telegram-Kontrollpanel i Kurator Atelier (Admin)**:
   - Fane **«📋 Innkomne Ordrer»**: Komplett oversikt over alle bestillinger med hurtigknapp for å kopiere ferdig Vipps-krav tekst til utklippstavlen.
   - Fane **«📱 Telegram Varsling»**: Enkelt oppsett for Telegram Bot Token og Chat ID, inkludert en **«⚡ Send Testmelding til mobilen»**-knapp for å verifisere at boten pinger telefonen din.

---

## 🚀 Versjonering
`v1.0.48 (updated 2026-10-31 22:05)`

