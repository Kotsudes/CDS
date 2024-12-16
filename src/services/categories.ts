import { TCategory } from "@/modules/category/type";
import ApiService from "@/services/api";

export async function get(): Promise<TCategory[]> {
    const result = await fetch(`${ApiService.baseUrl}/category`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}