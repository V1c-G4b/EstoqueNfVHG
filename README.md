# 📦 EstoqueNF VHG

Sistema de gestão de estoque e notas fiscais desenvolvido com React + TypeScript + Vite.

## 🚀 Tecnologias

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna
- **Zustand** - Gerenciamento de estado
- **React Router** - Roteamento
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes de UI
- **React Hook Form** - Formulários
- **Zod** - Validação de schemas
- **Vitest** - Testes unitários

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
├── features/               # Features modulares
│   ├── auth/              # Autenticação
│   ├── estoque/           # Gestão de estoque
│   ├── dashboard/         # Dashboard
│   └── notasFiscais/      # Notas fiscais
├── shared/                # Recursos compartilhados
│   ├── components/        # Componentes reutilizáveis
│   ├── hooks/             # Hooks customizados
│   ├── stores/            # Stores Zustand
│   ├── services/          # Services/APIs
│   ├── utils/             # Utilitários
│   └── types/             # Tipos globais
└── styles/                # Estilos globais
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Preview do build
pnpm preview

# Linting
pnpm lint

# Testes
pnpm test
pnpm test:ui
pnpm test:coverage
```

## 🚦 Como Executar

1. **Clone o repositório**

   ```bash
   git clone <url-do-repo>
   cd EstoqueNfVHG
   ```

2. **Instale as dependências**

   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env
   ```

4. **Execute o projeto**
   ```bash
   pnpm dev
   ```

## 🧪 Testes

O projeto utiliza Vitest para testes unitários:

```bash
# Executar testes
pnpm test

# Executar com interface
pnpm test:ui

# Executar com coverage
pnpm test:coverage
```

## 📋 Features

- ✅ **Gestão de Produtos** - CRUD completo
- ✅ **Controle de Estoque** - Movimentações
- ✅ **Dashboard** - Métricas e gráficos
- ✅ **Notas Fiscais** - Emissão e consulta
- ✅ **Autenticação** - Login/logout
- ✅ **Responsivo** - Design adaptativo

## 🏗️ Arquitetura

### Feature-Driven Development

Cada feature possui sua própria estrutura:

- `components/` - Componentes específicos
- `pages/` - Páginas da feature
- `hooks/` - Hooks específicos
- `services/` - APIs/serviços
- `types.ts` - Tipagens
- `schema.ts` - Validações Zod
- `routes.ts` - Rotas

### State Management

- **Zustand** para estado global
- **React Hook Form** para formulários
- **Stores separadas** por feature

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
