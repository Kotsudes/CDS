import ApiService from "@/services/api";
import { TVoie } from "@/modules/voie/type";

export async function get(): Promise<TVoie[]> {
    const result = await fetch(`${ApiService.baseUrl}/voie`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}