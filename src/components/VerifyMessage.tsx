import React, { useState } from "react";
import { verifyMessage } from "../openpgpUtil";

export const VerifyMessage: React.FC<{
  foreignPublicKey: string;
}> = ({ foreignPublicKey }) => {
  const [signed, setSigned] = useState("");
  const [plain, setPlain] = useState("");
  const [verified, setVerified] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    setError(null);
    try {
      const result = await verifyMessage(signed, foreignPublicKey);
      setPlain(result.data);
      setVerified(result.verified);
    } catch {
      setError("Signaturprüfung fehlgeschlagen.");
      setVerified(false);
    }
  };

  return (
    <div>
      <h2>Signatur prüfen</h2>
      <textarea
        placeholder="Signierte Nachricht"
        value={signed}
        onChange={e => setSigned(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />
      <button onClick={handleVerify} disabled={!signed || !foreignPublicKey}>
        Prüfen
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <textarea
        readOnly
        placeholder="Klartext (bei gültiger Signatur)"
        value={plain}
        rows={4}
        style={{ width: "100%", marginTop: 6 }}
      />
      {verified !== null && (
        <div>
          Signaturprüfung:&nbsp;
          {verified ? <span style={{ color: "green" }}>gültig</span> : <span style={{ color: "red" }}>ungültig</span>}
        </div>
      )}
    </div>
  );
};
