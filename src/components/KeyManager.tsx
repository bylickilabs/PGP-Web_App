import React, { useState } from "react";
import { KeyPair } from "../openpgpUtil";

export const KeyManager: React.FC<{
  myKeys: KeyPair | null;
  setMyKeys: (keys: KeyPair) => void;
  foreignPublicKey: string;
  setForeignPublicKey: (key: string) => void;
}> = ({ myKeys, setMyKeys, foreignPublicKey, setForeignPublicKey }) => {
  const [importPrivate, setImportPrivate] = useState("");
  const [importPublic, setImportPublic] = useState("");
  const [importForeign, setImportForeign] = useState("");

  return (
    <div>
      <h2>Schlüsselverwaltung</h2>
      <div style={{ marginBottom: 10 }}>
        <strong>Eigenes Schlüsselpaar exportieren:</strong><br />
        <textarea readOnly value={myKeys?.publicKey || ""} rows={4} style={{ width: "100%" }} />
        <textarea readOnly value={myKeys?.privateKey || ""} rows={4} style={{ width: "100%" }} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <strong>Eigenes Schlüsselpaar importieren:</strong><br />
        <textarea
          placeholder="Privater Schlüssel (ASCII Armored)"
          value={importPrivate}
          onChange={e => setImportPrivate(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
        />
        <textarea
          placeholder="Öffentlicher Schlüssel (ASCII Armored)"
          value={importPublic}
          onChange={e => setImportPublic(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
        />
        <button onClick={() => setMyKeys({ privateKey: importPrivate, publicKey: importPublic })}>
          Importieren
        </button>
      </div>
      <div style={{ marginBottom: 10 }}>
        <strong>Fremden öffentlichen Schlüssel speichern:</strong><br />
        <textarea
          placeholder="Fremder Public Key (ASCII Armored)"
          value={importForeign}
          onChange={e => setImportForeign(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
        />
        <button onClick={() => setForeignPublicKey(importForeign)}>
          Speichern
        </button>
        <div style={{ marginTop: 6 }}>
          <strong>Aktueller Fremdschlüssel:</strong>
          <textarea readOnly value={foreignPublicKey} rows={2} style={{ width: "100%" }} />
        </div>
      </div>
    </div>
  );
};
