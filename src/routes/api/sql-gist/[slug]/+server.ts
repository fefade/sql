import githubService from "$lib/services/githubService"
import { type RequestEvent, json } from "@sveltejs/kit"
import { z } from "zod"

const form = z.object({
	raw_id: z.string()
})

export async function GET({ params }: RequestEvent) {
	const github = githubService(fetch)

	try {
		const { slug } = params
		const parsed = form.safeParse({
			raw_id: slug
		})

		if (!parsed.success) {
			return json(JSON.stringify(parsed.error.flatten().fieldErrors), {
				status: 400
			})
		}

		const { raw_id } = parsed.data

		const response = await github.getGistRawSql(raw_id)
		if (!response.ok) {
			throw new Error("error fetch gist raw sql")
		}

		const text = await response.text()
		const result = text.replace(/#/g, "--").replace(/```/g, "")

		return json(result, { status: 200 })
	} catch (error) {
		return json(JSON.stringify(error), { status: 500 })
	}
}
