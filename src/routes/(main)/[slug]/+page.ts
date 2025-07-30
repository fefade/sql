import type { PageLoad } from "./$types"

export const load = (async ({ params, fetch }) => {
	const { slug } = params
	const response = await fetch(`/api/sql-gist/${slug}`)
	if (!response.ok) throw new Error("error")
	const obj = (await response.json()) as string

	return {
		gistData: obj
	}
}) satisfies PageLoad
