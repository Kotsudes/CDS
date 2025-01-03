import Map from "@/components/map/map";

export default function Home() {
  

    return (
        <div>
            <div className="h-[2vh]">
                <h1>Visualiser les données</h1>
            </div>
            <div>
                <Map />
            </div>
        </div>
    );
}