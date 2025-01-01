import Declarations from "@/modules/declaration/model"

export async function GET(): Promise<Response> {

    const declartionsCount = await Declarations.countDocuments({});
    return Response.json({
        status: 200, data: {
            total: declartionsCount,
            pages: Math.floor(declartionsCount / 500)
        }
    })
}

export async function POST(request: Request) {
    const formData = await request.formData()

    const dateDebut = new Date(formData.get('dateDebut') as string) || new Date('2021-01-01')
    const dateFin = new Date(formData.get('dateFin') as string) || new Date('2021-01-01')
    const categories = formData.getAll('categories') || []
    const arrondissements = formData.getAll('arrondissements') || []

    const geoJSONData = await Declarations.find(
        {
            "datedec": {
                $gte: dateFin.toISOString(),
                $lte: dateDebut.toISOString()
            },
            "type": {
                $in: categories
            },
            "arrondissement": {
                $in: arrondissements
            }
        }
    ).exec();

    const formatedData = geoJSONData.map((declaration) => {
        return { lat: declaration.geometry.coordinates[0], lng: declaration.geometry.coordinates[1], value: 1 }
    })

    return Response.json({ status: 200, data: formatedData })
}