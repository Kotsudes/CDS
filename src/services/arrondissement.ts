import ApiService from "@/services/api";

export async function get() {
    try {
        const response = await fetch(`${ApiService.baseUrl}/arrondissement`, { method: 'GET' });

        const reader = response.body?.getReader();
        if (!reader) throw new Error("Stream non disponible");

        const decoder = new TextDecoder();
        let data = "";
        let done = false;
        const results = []; // Tableau pour accumuler les documents

        while (!done) {
            const { value, done: streamDone } = await reader.read();
            done = streamDone;

            // Décodage et mise à jour des données
            data += decoder.decode(value, { stream: true });

            // Traitement des objets JSON complets dans le flux
            const splitData = data.split("\n").filter((line) => line.trim() !== '');
            splitData.forEach((line) => {
                try {
                    const parsed = JSON.parse(line);
                    results.push(parsed); // Ajouter dynamiquement le document au tableau
                    //updateMap(parsed); // Ex. : mise à jour d'une carte en direct
                } catch (_) {
                    // Si le JSON est incomplet, on continue à lire le stream
                }
            })
        }

        const parsedData = JSON.parse(data);

        return parsedData;
    }
    catch (error) {
        console.error("Erreur lors de la récupréations des données : ", error);
    }

}

export async function getNames(): Promise<string[]> {
    const result = await fetch(`${ApiService.baseUrl}/arrondissement/name`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}