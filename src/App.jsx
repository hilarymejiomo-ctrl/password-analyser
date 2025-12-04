import { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";

export default function App() {
    const [password, setPassword] = useState("");
    const [breachCount, setBreachCount] = useState(null);
    const [isChecking, setIsChecking] = useState(false);

    const analysis = zxcvbn(password);
    const zxScore = analysis.score;
    const zxTime = analysis.crack_times_display.offline_fast_hashing_1e10_per_second;

    const [generatedPassword, setGeneratedPassword] = useState("");
    const [length, setLength] = useState(16);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeLower, setIncludeLower] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);

    function generatePassword() {
        let chars = "";
        if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
        if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeNumbers) chars += "0123456789";
        if (includeSymbols) chars += "!@#$%^&*()-_=+[]{};:,.<>/?";

        if (chars.length === 0) return alert("Sélectionne au moins un type de caractère.");

        let pwd = "";
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            pwd += chars[array[i] % chars.length];
        }

        setGeneratedPassword(pwd);
        setPassword(pwd);
    }

    function calculateEntropy(pwd) {
        let charsetSize = 0;
        if (/[a-z]/.test(pwd)) charsetSize += 26;
        if (/[A-Z]/.test(pwd)) charsetSize += 26;
        if (/[0-9]/.test(pwd)) charsetSize += 10;
        if (/[^A-Za-z0-9]/.test(pwd)) charsetSize += 32;
        if (charsetSize === 0) return 0;
        return Math.round(pwd.length * Math.log2(charsetSize));
    }

    const entropy = calculateEntropy(password);

    async function sha1(str) {
        const data = new TextEncoder().encode(str);
        const hashBuffer = await crypto.subtle.digest("SHA-1", data);
        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase();
    }

    async function checkBreaches(pwd) {
        if (!pwd) return setBreachCount(null);

        setIsChecking(true);

        const fullHash = await sha1(pwd);
        const prefix = fullHash.slice(0, 5);
        const suffix = fullHash.slice(5);

        const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const text = await res.text();

        const match = text.split("\n").find(line => line.startsWith(suffix));
        setBreachCount(match ? parseInt(match.split(":")[1]) : 0);

        setIsChecking(false);
    }

    useEffect(() => {
        const t = setTimeout(() => checkBreaches(password), 500);
        return () => clearTimeout(t);
    }, [password]);

    /** --------------------------------------------------
     *   UI CYBERPUNK BLEU — RETURN
     * -------------------------------------------------- */
    return (
        <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col items-center px-6 py-10">

            {/* HEADER */}
            <h1 className="text-5xl font-extrabold text-blue-500 drop-shadow-[0_0_15px_#3b82f6] mb-10">
                SecurePass Analyzer 🔐
            </h1>

            {/* CARD PRINCIPALE */}
            <div className="w-full max-w-xl bg-gray-900/60 p-8 rounded-xl shadow-xl border border-blue-500/30 backdrop-blur-sm">

                <label className="text-lg font-semibold">Tape ton mot de passe :</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="•••••••••"
                    className="w-full mt-2 p-3 rounded-lg bg-gray-800 border border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />

                {/* BARRE DE FORCE */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Force (zxcvbn)</h3>
                    <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all`}
                            style={{
                                width: `${(zxScore / 4) * 100}%`,
                                backgroundColor: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#15803d"][zxScore]
                            }}
                        ></div>
                    </div>
                    <p className="mt-2">Temps estimé : <span className="text-blue-400">{zxTime}</span></p>
                </div>

                {/* ENTROPIE */}
                <p className="mt-6">
                    <span className="font-semibold">Entropie :</span> {entropy} bits
                </p>

                {/* HAVE I BEEN PWNED */}
                <div className="mt-6">
                    <h3 className="font-semibold">Fuites de données :</h3>

                    {isChecking && <p className="text-blue-400">🔎 Vérification…</p>}
                    {breachCount === 0 && password && <p className="text-green-400">✔ Aucun signe de compromission</p>}
                    {breachCount > 0 && <p className="text-red-400">⚠ Trouvé {breachCount.toLocaleString()} fois</p>}
                    {breachCount === null && <p className="text-gray-500">Saisis un mot de passe…</p>}
                </div>

                {/* RECOMMANDATIONS */}
                {analysis.feedback.suggestions.length > 0 && (
                    <ul className="mt-4 space-y-1">
                        {analysis.feedback.suggestions.map((s, i) => (
                            <li key={i} className="text-blue-300">• {s}</li>
                        ))}
                    </ul>
                )}
            </div>

            {/* GÉNÉRATEUR */}
            <div className="w-full max-w-xl bg-gray-900/60 p-8 rounded-xl mt-10 border border-blue-500/30 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">Générateur sécurisé</h2>

                <label>Longueur : {length}</label>
                <input
                    type="range"
                    min="8"
                    max="40"
                    value={length}
                    onChange={e => setLength(Number(e.target.value))}
                    className="w-full mt-2"
                />

                {/* OPTIONS */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <label><input type="checkbox" checked={includeLower} onChange={() => setIncludeLower(!includeLower)} /> minuscules</label>
                    <label><input type="checkbox" checked={includeUpper} onChange={() => setIncludeUpper(!includeUpper)} /> majuscules</label>
                    <label><input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} /> chiffres</label>
                    <label><input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} /> symboles</label>
                </div>

                {/* BOUTON */}
                <button
                    onClick={generatePassword}
                    className="mt-5 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition shadow-lg shadow-blue-500/30"
                >
                    Générer
                </button>

                {/* RESULTAT */}
                {generatedPassword && (
                    <div className="mt-4">
                        <p className="font-semibold">Mot de passe généré :</p>
                        <pre className="bg-gray-800 p-3 rounded-lg mt-2 text-blue-300">{generatedPassword}</pre>

                        <button
                            onClick={() => navigator.clipboard.writeText(generatedPassword)}
                            className="mt-3 bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                        >
                            Copier
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
