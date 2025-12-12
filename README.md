# 🔐 PGP Web App

|![pgp1](https://github.com/user-attachments/assets/636c4f8d-4d03-4d54-96f5-ee1a03d49457)|
|---|

## 🚀 Überblick
Vollständige Webanwendung für OpenPGP-Verschlüsselung, basierend auf React, TypeScript und openpgp.js.

## 🛠 Technologien
- React 18
- TypeScript 4.9.5
- openpgp.js 5.x

## 📌 Funktionen
- Schlüsselpaar generieren
- Schlüssel importieren/exportieren
- Nachrichten verschlüsseln & entschlüsseln
- Nachrichten signieren & verifizieren

Alle Operationen sind vollständig clientseitig (Browser), ohne Server-Abhängigkeiten.

## 📦 Installation

### Voraussetzungen
- Node.js >=18.x (LTS empfohlen)
- npm

### Projekt Setup

```bash
git clone https://github.com/bylickilabs/PGP-Web-App.git
cd PGP-Web-App
npm install
npm start
```

Öffnet Automatisch [http://localhost:3000](http://localhost:3000) im Browser.

## 🧩 Projektstruktur
```
src/
├─ components/
│  ├─ KeyGenerator.tsx
│  ├─ KeyManager.tsx
│  ├─ EncryptMessage.tsx
│  ├─ DecryptMessage.tsx
│  ├─ SignMessage.tsx
│  └─ VerifyMessage.tsx
├─ App.tsx
├─ index.tsx
└─ openpgpUtil.ts
```

## ⚠️ Sicherheitshinweise
- Nur für Demonstration und Entwicklung. 
  - Ein Security-Audit wird empfohlen, bevor produktive Nutzung erfolgt.

## 📜 Lizenz
MIT [LICENSE](LICENSE)

## 🤝 Support
Fragen und Anregungen gerne über Issues oder Pull Requests.
