import React, { useState } from "react";
import { encryptMessage } from "../openpgpUtil";

export const EncryptMessage: React.FC<{
  foreignPublicKey: string;
  myPrivateKey: string;
  myPassphrase: string;
}> = ({ foreignPublicKey, myPrivateKey, myPassphrase }) => {
  const [plain, setPlain] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [sign, setSign] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEncrypt = async () => {
    setError(null);
    try {
      const result = await encryptMessage(
        plain,
        foreignPublicKey,
        sign ? myPrivateKey : undefined,
        sign ? myPassphrase : undefined
      );
      setEncrypted(result);
    } catch {
      setError("Verschlüsselung fehlgeschlagen.");
    }
  };

  return (
    <div>
      <h2>Nachricht verschlüsseln</h2>
      <textarea
        placeholder="Klartext"
        value={plain}
        onChange={e => setPlain(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={sign}
            onChange={e => setSign(e.target.checked)}
          />
          Nachricht zusätzlich signieren
        </label>
      </div>
      <button onClick={handleEncrypt} disabled={!plain || !foreignPublicKey}>
        Verschlüsseln
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <textarea
        readOnly
        placeholder="Verschlüsselte Nachricht"
        value={encrypted}
        rows={4}
        style={{ width: "100%", marginTop: 6 }}
      />
    </div>
  );
};
