Hooks.once('ready', async function() {
    console.log("Iniciando sincronização com o Portal...");

    // Prepara os dados do mundo
    const worldData = {
        NomeMundo: game.world.title,
        Descricao: game.world.description
    };

    try {
        // Envia para o seu servidor Ubuntu
        const response = await fetch('https://portal.dmplace.com.br/api/Integration/ConectarFoundry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(worldData)
        });

        const result = await response.json();
        
        if (response.ok) {
            ui.notifications.info(`Vínculo com o portal estabelecido!`);
            console.log("Sucesso:", result.mensagem);
        } else {
            console.error("Erro na resposta:", result);
        }

    } catch (err) {
        console.error("Erro ao conectar com o portal:", err);
    }

    // BUSCA A ÚLTIMA NOTÍCIA
    try {
        const response = await fetch('https://portal.dmplace.com.br/api/Integration/UltimaSessao');
        if (response.ok) {
            const cronica = await response.json();

            // Renderiza a janela épica para os jogadores
            new Dialog({
                title: `📜 Resumo da Última Sessão: ${cronica.titulo}`,
                content: `
                    <div style="font-family: 'Signika', sans-serif; text-align: justify;">
                        <p><em>Publicado em: ${cronica.data}</em></p>
                        <hr>
                        <div style="max-height: 450px; max-width: 500px; overflow-y: auto;">
                            ${cronica.conteudo}
                        </div>
                    </div>
                `,
                buttons: {
                    fechar: {
                        label: "Rumo à Aventura!",
                        callback: () => console.log("DM Place | Jogador fechou o diário.")
                    }
                },
                default: "fechar"
            }, { width: 500 }).render(true);
        }
    } catch (err) {
        console.error("Erro ao buscar crônica:", err);
    }
});