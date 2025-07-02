import * as openpgp from "openpgp";

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

/**
 * Hilfsfunktion: Konvertiert einen möglichen WebStream<string> zu string.
 */
async function streamToString(stream: any): Promise<string> {
  if (typeof stream === "string") return stream;
  let result = "";
  for await (const chunk of stream) result += chunk;
  return result;
}

/**
 * Generiert ein OpenPGP-Schlüsselpaar.
 */
export async function generateKey(name: string, email: string, passphrase: string): Promise<KeyPair> {
  const { privateKey, publicKey } = await openpgp.generateKey({
    type: "rsa",
    rsaBits: 2048,
    userIDs: [{ name, email }],
    passphrase,
    format: "armored"
  });
  return { publicKey, privateKey };
}

/**
 * Verschlüsselt eine Nachricht für einen Public Key. Optional: signiert mit privatem Schlüssel.
 */
export async function encryptMessage(
  plainText: string,
  publicKeyArmored: string,
  signKey?: string,
  passphrase?: string
): Promise<string> {
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
  let signingKeys = undefined;
  if (signKey && passphrase) {
    const privateKey = await openpgp.readPrivateKey({ armoredKey: signKey });
    const decryptedKey = await openpgp.decryptKey({ privateKey, passphrase });
    signingKeys = decryptedKey;
  }
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: plainText }),
    encryptionKeys: publicKey,
    signingKeys,
    format: "armored"
  });
  return typeof encrypted === "string" ? encrypted : await streamToString(encrypted);
}

/**
 * Entschlüsselt eine Nachricht mit privatem Schlüssel. Optional: prüft Signatur mit fremdem Public Key.
 */
export async function decryptMessage(
  cipherText: string,
  privateKeyArmored: string,
  passphrase: string,
  publicKeyArmored?: string
): Promise<{ data: string; verified: boolean }> {
  const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored });
  const decryptedKey = await openpgp.decryptKey({ privateKey, passphrase });
  let verificationKeys;
  if (publicKeyArmored) {
    verificationKeys = await openpgp.readKey({ armoredKey: publicKeyArmored });
  }
  const message = await openpgp.readMessage({ armoredMessage: cipherText });
  const { data, signatures } = await openpgp.decrypt({
    message,
    decryptionKeys: decryptedKey,
    verificationKeys,
    format: "utf8"
  });
  let verified = false;
  if (signatures && signatures.length > 0) {
    const signature = signatures[0];
    try {
      await signature.verified;
      verified = true;
    } catch {
      verified = false;
    }
  }
  // data kann auch ein Stream sein
  const plain = typeof data === "string" ? data : await streamToString(data);
  return { data: plain, verified };
}

/**
 * Signiert eine Nachricht mit privatem Schlüssel.
 */
export async function signMessage(
  plainText: string,
  privateKeyArmored: string,
  passphrase: string
): Promise<string> {
  const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored });
  const decryptedKey = await openpgp.decryptKey({ privateKey, passphrase });
  const signed = await openpgp.sign({
    message: await openpgp.createMessage({ text: plainText }),
    signingKeys: decryptedKey,
    format: "armored"
  });
  return typeof signed === "string" ? signed : await streamToString(signed);
}

/**
 * Prüft die Signatur einer signierten Nachricht mit fremdem Public Key.
 */
export async function verifyMessage(
  signedMessage: string,
  publicKeyArmored: string
): Promise<{ data: string; verified: boolean }> {
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
  const message = await openpgp.readMessage({ armoredMessage: signedMessage });
  const verificationResult = await openpgp.verify({
    message,
    verificationKeys: publicKey,
    format: "utf8"
  });
  let verified = false;
  try {
    await verificationResult.signatures[0].verified;
    verified = true;
  } catch {
    verified = false;
  }
  // verificationResult.data kann ein Stream sein
  const plain = typeof verificationResult.data === "string"
    ? verificationResult.data
    : await streamToString(verificationResult.data);
  return { data: plain, verified };
}
