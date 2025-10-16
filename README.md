# Base Ecosystem Starter

Mini starter repo pour déployer des smart contracts simples sur **Base Sepolia** et **Base mainnet**, avec Hardhat + TypeScript.

## Démarrage rapide
1. `cp .env.example .env` puis remplis les variables.
2. `pnpm install` (ou `yarn` / `npm i`)
3. `pnpm hardhat compile`
4. Déployer Greeter: `pnpm hardhat run scripts/deploy_greeter.ts --network baseSepolia`

## Contenu
- `contracts/GreeterBase.sol` et `contracts/CounterBase.sol`
- `scripts/` pour déployer, lire, vérifier
- `addresses/` pour stocker les adresses par réseau
- `docs/` notes pratiques Base et sécurité
- `test/` tests unitaires minimaux

Auteur: Seb2869
Licence: MIT
