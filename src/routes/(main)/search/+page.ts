import type { GistDataFileType } from "$lib/types"
import type { PageLoad } from "./$types"
import apiService from "$lib/services/apiService"

export const load = (async ({ url, fetch }) => {
	const query = url.searchParams.get("query")
	const api = apiService(fetch)
	const response = await api.getGistDataByFragment(String(query))
	if (!response.ok) throw new Error("error")
	const obj = await response.json()
	const result = obj.data as GistDataFileType[]
	return { gistData: result }
}) satisfies PageLoad
