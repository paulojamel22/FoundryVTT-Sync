# FoundryVTT-Sync 📜

O **FoundryVTT-Sync** é um módulo minimalista para o Foundry VTT projetado para integrar o seu mundo de RPG diretamente com o **Portal DM Place**. 

Este oráculo técnico estabelece uma ponte entre o ambiente de jogo e o servidor web, permitindo que informações cruciais do mundo sejam visualizadas fora do Foundry em tempo real.

## 🔮 Funcionalidades Atuais

* **Sincronização de Identidade**: Envia automaticamente o **Nome do Mundo** e a **Descrição** para a API do Portal DM Place.
* **Vínculo em Tempo Real**: Dispara a atualização assim que o Mestre (GM) carrega o mundo (Hook: `ready`).
* **Logs de Servidor**: Integração direta com os logs do Ubuntu via `journalctl` para monitoramento de conexão.

## 🛠️ Requisitos

* **Foundry VTT**: v11 ou v12.
* **Portal DM Place**: v2.0.12 ou superior rodando em ambiente .NET.
* **Acesso Web**: O servidor do Portal deve estar acessível via HTTPS.

## 🚀 Instalação

1. Baixe os arquivos deste repositório.
2. Crie uma pasta chamada `dmplace-sync` dentro do diretório de módulos do seu Foundry: `Config/data/modules/`.
3. Reinicie o Foundry VTT.
4. Vá em **Gerenciar Módulos** e ative o **DM Place - Sincronizador de Mundos**.

## 🏗️ Estrutura Técnica

O módulo utiliza uma chamada `fetch` assíncrona para o endpoint:
`https://portal.dmplace.com.br/api/Integration/ConectarFoundry`

Os dados são enviados no formato JSON:
```json
{
  "nomeMundo": "Título do Mundo no Foundry",
  "descricao": "Descrição detalhada do Lore"
}