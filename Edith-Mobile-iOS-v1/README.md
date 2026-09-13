# Édith Mobile iOS — V1

Cette V1 reprend l'interface holographique de ta V23 dans une PWA iPhone indépendante.
Elle ne modifie pas Édith-PC.

## Ce qui marche
- interface Édith plein écran ;
- sphère animée ;
- icône sur l'écran d'accueil ;
- bouton micro / Ouvrir ChatGPT ;
- ouverture de https://chatgpt.com/ (iOS peut ouvrir l'app ChatGPT via son Universal Link, sinon Safari).

## Limite iOS importante
Une PWA ne peut pas injecter l'extension Chrome de la V23 dans l'app ChatGPT ni cliquer automatiquement
sur son bouton de conversation vocale. iOS isole les apps et Chrome iOS ne charge pas les extensions Chrome desktop.
Pour une intégration plus profonde, il faudrait une vraie app iOS / Safari Web Extension signée avec Xcode,
et même là l'automatisation de l'interface d'une autre app reste limitée.

## Installer sur iPhone
Les fichiers doivent être servis en HTTPS (GitHub Pages, Netlify, Vercel, etc.).
1. Ouvre l'URL dans Safari.
2. Partager.
3. Sur l'écran d'accueil.
4. Ajouter.
5. Lance Édith depuis l'icône.

## Test local sur PC
Dans ce dossier :
    python -m http.server 8080
Puis ouvre http://localhost:8080

## Étape suivante
On peut faire une V2 avec écran de démarrage, réglages, animations supplémentaires et raccourci iOS.
