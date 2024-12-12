import ApiService from "@/services/api";
import { TCategory } from "@/modules/category/type";

export async function get(): Promise<TCategory[]> {
    const result = await fetch(`${ApiService.baseUrl}/category`, { method: 'GET' });
    const json = await result.json();
    return await json.data;
}