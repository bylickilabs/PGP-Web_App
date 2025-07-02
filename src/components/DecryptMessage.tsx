import React, { useState } from "react";
import { decryptMessage } from "../openpgpUtil";

export const DecryptMessage: React.FC<{
  myPrivateKey: string;
  myPassphrase: string;
  foreignPublicKey: string;
}> = ({ myPrivateKey, myPassphrase, foreignPublicKey }) => {
  const [cipher, setCipher] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [verified, setVerified] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecrypt = async () => {
    setError(null);
    try {
      const result = await decryptMessage(cipher, myPrivateKey, myPassphrase, foreignPublicKey || undefined);
      setDecrypted(result.data);
      setVerified(result.verified);
    } catch {
      setError("Entschlüsselung oder Signaturprüfung fehlgeschlagen.");
    }
  };

  return (
    <div>
      <h2>Nachricht entschlüsseln</h2>
      <textarea
        placeholder="Verschlüsselte Nachricht"
        value={cipher}
        onChange={e => setCipher(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />
      <button onClick={handleDecrypt} disabled={!cipher || !myPrivateKey || !myPassphrase}>
        Entschlüsseln
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <textarea
        readOnly
        placeholder="Klartext"
        value={decrypted}
        rows={4}
        style={{ width: "100%", marginTop: 6 }}
      />
      {verified !== null && (
        <div>
          Signaturprüfung:&nbsp;
          {verified ? <span style={{ color: "green" }}>gültig</span> : <span style={{ color: "red" }}>ungültig oder nicht vorhanden</span>}
        </div>
      )}
    </div>
  );
};
