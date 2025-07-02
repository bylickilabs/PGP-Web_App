import React, { useState } from "react";
import { KeyGenerator } from "./components/KeyGenerator";
import { KeyManager } from "./components/KeyManager";
import { EncryptMessage } from "./components/EncryptMessage";
import { DecryptMessage } from "./components/DecryptMessage";
import { SignMessage } from "./components/SignMessage";
import { VerifyMessage } from "./components/VerifyMessage";
import { KeyPair } from "./openpgpUtil";

export default function App() {
  const [myKeys, setMyKeys] = useState<KeyPair | null>(null);
  const [foreignPublicKey, setForeignPublicKey] = useState("");

  // State für Passphrase, damit der User sie nicht bei jedem Vorgang neu eintippen muss:
  const [myPassphrase, setMyPassphrase] = useState("");

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>PGP Web App – Vollversion</h1>
      <KeyGenerator
        onGenerate={keys => {
          setMyKeys(keys);
          setMyPassphrase("");
          alert("Schlüsselpaar erzeugt. Bitte Passphrase merken!");
        }}
      />
      <hr />
      <KeyManager
        myKeys={myKeys}
        setMyKeys={setMyKeys}
        foreignPublicKey={foreignPublicKey}
        setForeignPublicKey={setForeignPublicKey}
      />
      <div style={{ margin: "10px 0" }}>
        <input
          type="password"
          placeholder="Ihre Passphrase (für Entschlüsselung/Signieren)"
          value={myPassphrase}
          onChange={e => setMyPassphrase(e.target.value)}
          style={{ width: "100%", marginTop: 6 }}
        />
      </div>
      <hr />
      <EncryptMessage
        foreignPublicKey={foreignPublicKey}
        myPrivateKey={myKeys?.privateKey || ""}
        myPassphrase={myPassphrase}
      />
      <hr />
      <DecryptMessage
        myPrivateKey={myKeys?.privateKey || ""}
        myPassphrase={myPassphrase}
        foreignPublicKey={foreignPublicKey}
      />
      <hr />
      <SignMessage
        myPrivateKey={myKeys?.privateKey || ""}
        myPassphrase={myPassphrase}
      />
      <hr />
      <VerifyMessage foreignPublicKey={foreignPublicKey} />
    </div>
  );
}
