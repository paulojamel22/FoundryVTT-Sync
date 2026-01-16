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
});