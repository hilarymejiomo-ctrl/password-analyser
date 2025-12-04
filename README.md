🛡️ Cyber Password Analyzer

Analyseur avancé de mots de passe — React, Tailwind CSS, zxcvbn, Cryptographie & HaveIBeenPwned API

🔗 Démo en ligne : https://cyber-password.vercel.app

📦 Technos : React • Vite • TailwindCSS • zxcvbn • SHA-1 Web Crypto API • HIBP API

✨ Aperçu du projet

Cyber Password Analyzer est une application web moderne permettant d’analyser la sécurité d’un mot de passe selon plusieurs critères :

🔐 Score de robustesse (zxcvbn)

🔑 Entropie calculée manuellement

⚡ Temps estimé avant cassage bruteforce

⚠️ Vérification contre les bases de données de fuites (HaveIBeenPwned)

🔧 Générateur de mots de passe sécurisés

🎨 Interface moderne propulsée par TailwindCSS

Ce projet a été pensé pour fournir une analyse à la fois pédagogique et professionnelle, utile pour les débutants comme pour les personnes travaillant en cybersécurité.

🚀 Fonctionnalités principales
🔍 1. Analyse en temps réel

Score zxcvbn (0–4)

Barre de force visuelle

Feedback automatique (warnings + suggestions)

🔐 2. Analyse cryptographique

Calcul d’entropie basé sur l’espace des caractères

Estimation du temps de cassage (10 milliards/s)

Classification allant de "moins d’une seconde" à "pratiquement incassable"

🛡️ 3. Vérification HaveIBeenPwned

Hachage SHA-1 côté client (aucun mot de passe envoyé en clair)

Méthode sécurisée k-Anonymity (préfixe du hash)

Retour immédiat : trouvé / non trouvé + nombre d’occurrences

🔧 4. Générateur sécurisé

Génération cryptographiquement sûre (crypto.getRandomValues)

Options personnalisables :

Longueur (8–40)

Minuscules / Majuscules / Nombres / Symboles

🎨 5. Interface moderne

Tailwind CSS

Design responsive

Compatible mobile & desktop

🖼️ Capture d’écran (optionnelle)

(Tu peux ajouter une image ici, par exemple :)

![Preview](./public/preview.png)

🛠️ Installation & utilisation
1️⃣ Cloner le repo
git clone https://github.com/hilarymejiomo/password-analyser.git
cd password-analyser

2️⃣ Installer les dépendances :
npm install

3️⃣ Lancer l'application :
npm run dev


L’app sera accessible sur :

➡️ http://localhost:5173

🧩 Structure du projet
password-analyser/
 ├── src/
 │   ├── App.jsx
 │   ├── main.jsx
 │   ├── index.css
 │   └── components/ (si tu ajoutes pour la V2)
 ├── public/
 ├── package.json
 ├── tailwind.config.js
 ├── postcss.config.js
 └── README.md

🤝 Contribution

Les contributions sont les bienvenues !
Pour proposer une amélioration :

Fork le projet

Crée une branche :

git checkout -b feature/nom-fonctionnalite


Commit :

git commit -m "Ajout de X"


Push :

git push origin feature/nom-fonctionnalite


Ouvre une Pull Request

🛡️ Sécurité

⚠️ Aucun mot de passe n'est envoyé vers un serveur.
Toutes les analyses sont faites localement dans le navigateur.
La vérification HIBP utilise la méthode K-Anonymity recommandée par Cloudflare & Troy Hunt.

📄 Licence

MIT — libre d'utilisation, modification et distribution.

👨‍💻 Développeur

Hilary Alexandre Mejiomo
🚀 Étudiant en informatique & cybersécurité
🔗 GitHub : https://github.com/hilarymejiomo-ctrl

🌐 Projet en ligne : https://cyber-password.vercel.app
