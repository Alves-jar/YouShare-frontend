# YouShare Frontend

Aplicação frontend em Angular para a plataforma de colaboração de vídeos YouShare.

## Visão Geral

YouShare é uma plataforma de colaboração de vídeos que permite aos usuários:
- Criar e gerenciar projetos
- Fazer upload e compartilhar vídeos
- Comentar em versões de vídeos
- Receber notificações sobre atualizações de projetos

Este frontend Angular consome a API Java do backend YouShare.

## Funcionalidades

### Autenticação
- Registro e login de usuários
- Autenticação baseada em token JWT
- Rotas protegidas com AuthGuard

### Projetos
- Criar novos projetos com título e descrição
- Visualizar todos os projetos no dashboard
- Página de detalhes do projeto com vídeos e comentários

### Vídeos
- Fazer upload de vídeos com título e descrição
- Visualizar vídeos com controles de reprodução
- Associar vídeos a projetos

### Comentários
- Adicionar comentários aos vídeos
- Visualizar todos os comentários de um vídeo
- Identificação do usuário nos comentários

## Tecnologias

- **Framework**: Angular 19
- **Linguagem**: TypeScript
- **Biblioteca de UI**: Angular Material
- **Cliente HTTP**: Angular HttpClient
- **Estilização**: SCSS
- **Gerenciamento de Estado**: RxJS BehaviorSubject

## Estrutura do Projeto

```
src/app
├── components
│   ├── navbar          # Barra de navegação com Material
│   ├── project-card    # Componente de card de projeto
│   └── video-card      # Componente de card de vídeo
├── pages
│   ├── login           # Página de login com Material
│   ├── register        # Página de registro com Material
│   ├── dashboard       # Listagem de projetos
│   ├── projects        # Visualização de todos os projetos
│   ├── create-project  # Formulário de criação de projeto
│   ├── project-details # Projeto com vídeos e comentários
│   ├── upload-video    # Formulário de upload de vídeo
│   └── notifications   # Página de notificações
├── services
│   ├── auth.ts         # Serviço de autenticação
│   ├── project.ts      # Serviço de API de projetos
│   ├── video.ts        # Serviço de API de vídeos
│   └── comment.ts      # Serviço de API de comentários
├── models
│   └── user.ts         # Interfaces de User, Project, Video
├── guards
│   └── auth-guard.ts   # Guarda de proteção de rotas
└── interceptors
    └── auth-interceptor.ts  # Interceptor de token JWT
```

## Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd youshare-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API nos arquivos `src/app/services/*.ts` se necessário (padrão: `http://localhost:8080/api`)

## Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
ng serve
```

Navegue para `http://localhost:4200/`. A aplicação recarregará automaticamente se você alterar qualquer arquivo fonte.

## Build

Build para produção:

```bash
ng build --configuration production
```

Os artefatos de build serão armazenados no diretório `dist/`.

## Integração com API

O frontend integra com a API Java do backend YouShare:

- **URL Base**: `http://localhost:8080/api`
- **Autenticação**: Token JWT Bearer no header Authorization
- **Interceptor**: Adiciona token automaticamente em todas as requisições

### Endpoints de API Utilizados

- `POST /auth/login` - Login do usuário
- `POST /auth/register` - Registro de usuário
- `GET /projects` - Listar todos os projetos
- `GET /projects/:id` - Obter detalhes do projeto
- `POST /projects` - Criar novo projeto
- `GET /videos` - Listar todos os vídeos
- `POST /videos/upload` - Fazer upload de vídeo
- `GET /comments/video/:id` - Obter comentários do vídeo
- `POST /comments` - Adicionar comentário

## Componentes do Angular Material

A UI utiliza componentes do Angular Material:

- `MatToolbar` - Barra de navegação
- `MatCard` - Cards de conteúdo
- `MatButton` - Botões
- `MatInput` / `MatFormField` - Inputs de formulário
- `MatProgressSpinner` - Indicadores de carregamento
- `MatIcon` - Ícones

## Fluxo de Autenticação

1. Usuário faz login via `/login`
2. Backend retorna token JWT e dados do usuário
3. Token armazenado no localStorage
4. AuthInterceptor adiciona token em todas as requisições HTTP
5. AuthGuard protege rotas privadas
6. Navbar mostra/esconde baseado no estado de autenticação

## Fases de Desenvolvimento

1. ✅ Setup do projeto com Angular CLI
2. ✅ Estrutura de pastas (services, models, pages, components)
3. ✅ Páginas de autenticação e AuthService
4. ✅ JWT Interceptor para requisições API
5. ✅ Serviços de API (Project, Video, Comment)
6. ✅ Páginas principais (Dashboard, Projects, Upload, etc.)
7. ✅ Componentes reutilizáveis (Navbar, Cards)
8. ✅ Proteção de rotas com AuthGuard
9. ✅ Integração com UI do Angular Material
10. ✅ Integração completa com backend

## Geração de Código

O Angular CLI inclui ferramentas poderosas de geração de código. Para gerar um novo componente, execute:

```bash
ng generate component nome-do-componente
```

Para uma lista completa de esquemas disponíveis (como `components`, `directives`, ou `pipes`), execute:

```bash
ng generate --help
```

## Testes

### Testes Unitários

Para executar testes unitários com o runner de testes [Vitest](https://vitest.dev/):

```bash
ng test
```

### Testes End-to-End

Para testes end-to-end (e2e):

```bash
ng e2e
```

O Angular CLI não vem com um framework de testes end-to-end por padrão. Você pode escolher um que atenda às suas necessidades.

## Recursos Adicionais

Para mais informações sobre o uso do Angular CLI, incluindo referências detalhadas de comandos, visite a página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
