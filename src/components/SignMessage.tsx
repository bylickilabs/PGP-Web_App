import React, { useState } from "react";
import { signMessage } from "../openpgpUtil";

export const SignMessage: React.FC<{
  myPrivateKey: string;
  myPassphrase: string;
}> = ({ myPrivateKey, myPassphrase }) => {
  const [plain, setPlain] = useState("");
  const [signed, setSigned] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSign = async () => {
    setError(null);
    try {
      const result = await signMessage(plain, myPrivateKey, myPassphrase);
      setSigned(result);
    } catch {
      setError("Signierung fehlgeschlagen.");
    }
  };

  return (
    <div>
      <h2>Nachricht signieren</h2>
      <textarea
        placeholder="Klartext"
        value={plain}
        onChange={e => setPlain(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />
      <button onClick={handleSign} disabled={!plain || !myPrivateKey || !myPassphrase}>
        Signieren
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <textarea
        readOnly
        placeholder="Signierte Nachricht"
        value={signed}
        rows={4}
        style={{ width: "100%", marginTop: 6 }}
      />
    </div>
  );
};
