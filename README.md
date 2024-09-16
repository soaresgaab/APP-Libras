# Padrões do Projeto

## 1. Estrutura de Pastas
- **`src/`**: Todo o código-fonte da aplicação.
- **`ativos/`**: Recursos visuais como imagens.
- **`componentes/`**: Componentes reutilizáveis, como o componente de carregamento.
- **`constantes/`**: Valores estáticos e constantes.
- **`gancho/`**: Hooks personalizados, como erro de login.
- **`módulo/`**: Módulos específicos, como modal de imagem.
- **`utilitários/`**: Funções auxiliares, como métodos para excluir ou sugerir itens.

## 2. Gerenciamento de Arquivos e Configuração
- **`.dockerignore`** e **`arquivo docker`**: Configurações relacionadas ao Docker.
- **`.eslintrc.js`**: Configuração para o linting com ESLint, garantindo um código consistente.
- **`.gitignore`**: Arquivos e diretórios que devem ser ignorados pelo Git.
- **`eas.json`**: Configurações para compilação usando o EAS.
- **`metro.config.js`**: Configurações para o bundler do React Native.
- **`babel.config.js`**: Configuração para o Babel, que transpila o código.
- **`tsconfig.json`**: Configuração do TypeScript, definindo regras de tipagem.

## 3. Mensagens de Commit
- **Mensagens claras**: Use mensagens que descrevem de forma breve e direta a mudança realizada.

Exemplos de commits:
- `"adicionar dockerfile"`
- `"criar formulário de login"`
- `"atualizar rota API"`

## 4. Boas Práticas
- **Manter o .gitignore atualizado**: Evite enviar arquivos necessários, como configurações locais ou cache.
- **Modularização**: Separe componentes reutilizáveis na pasta `componentes` e siga a estrutura de pastas organizada por módulos e funcionalidades.
- **Commits frequentes**: Faça commits pequenos e claros, com uma descrição específica do que foi feito em cada um.
- **Validação de código**: Use o ESLint para manter a qualidade e padronização do código.
