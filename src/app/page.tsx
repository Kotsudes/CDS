import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map/map"), {
    ssr: false,
});

export default function Home() {
    return <Map />;
}
