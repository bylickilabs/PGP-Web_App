import React, { useState } from "react";
import { generateKey, KeyPair } from "../openpgpUtil";

export const KeyGenerator: React.FC<{ onGenerate: (keys: KeyPair) => void }> = ({ onGenerate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const keys = await generateKey(name, email, passphrase);
      onGenerate(keys);
    } catch (e) {
      setError("Fehler bei der Schlüsselerzeugung.");
    }
    setGenerating(false);
  };

  return (
    <div>
      <h2>Schlüsselpaar generieren</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Passphrase" value={passphrase} onChange={e => setPassphrase(e.target.value)} />
      <button onClick={handleGenerate} disabled={generating}>Generieren</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};
