import Arrondissement from "@/modules/arrondissement/model"

export async function GET() {

    try {
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const cursor = Arrondissement.find({}).cursor();
                    controller.enqueue("[") // Start of the array
                    let isFirst = true;

                    for await (const doc of cursor) {

                        if (!isFirst) {
                            controller.enqueue(",");
                        }
                        else {
                            isFirst = false;
                        }

                        controller.enqueue(JSON.stringify(doc));
                    }
                    controller.enqueue("]") // End of the array
                    controller.close();
                }
                catch (error) {
                    console.log(error)
                    controller.error("Erreur lors du streaming des données");
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ error: "Erreur lors de la récupération des données" }),
            { status: 500, headers: { "Content-Type": "application/json" } });
    }
}
