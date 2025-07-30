import githubService from "@/services/githubService"
import type { GistDataFileType } from "@/types"
import { json, type RequestEvent } from "@sveltejs/kit"
import { z } from "zod"

interface FileType extends GistDataFileType {
	raw_id: string
}

type DataType = Record<string, FileType>

const form = z.object({
	fragment: z.string().optional(),
	limit: z.preprocess((val) => {
		if (val === "" || val === null || val === undefined) return undefined
		return Number(val)
	}, z.number().int().positive("Limit must be a positive integer").default(10)),
	page: z.preprocess((val) => {
		if (val === "" || val === null || val === undefined) return undefined
		const n = Number(val)
		return n === 0 ? 1 : n
	}, z.number().int().positive("Page must be a positive integer").default(1))
})

export async function GET({ url }: RequestEvent) {
	const github = githubService(fetch)

	try {
		const { searchParams } = url

		const parsed = form.safeParse({
			fragment: searchParams.get("fragment") ?? undefined,
			limit: searchParams.get("limit") ?? undefined,
			page: searchParams.get("page") ?? undefined
		})

		if (!parsed.success) {
			return json(JSON.stringify(parsed.error.flatten().fieldErrors), {
				status: 400
			})
		}

		const { fragment, limit, page } = parsed.data

		const response = await github.getGistSql()

		if (!response.ok) {
			throw new Error("error fetch gist sql")
		}

		const obj = await response.json()
		const data = fragment
			? getFilteredData(obj.files, fragment)
			: (obj.files as DataType)
		const dataEntries = Object.entries(data)

		dataEntries.forEach(([_, file]) => {
			const raw = file.raw_url
			const rawIndex = raw.indexOf("raw/")
			const rawId =
				rawIndex !== -1 ? raw.substring(rawIndex + 4).split("/")[0] : ""
			const content = file.content?.replace(/#/g, "--").replace(/```/g, "")

			file.raw_id = rawId
			file.content = content
		})

		const offset = (page - 1) * limit
		const end = offset + limit

		const newData = Object.values(data).slice(offset, end)

		return json(
			{
				count: dataEntries.length,
				data: newData
			},
			{ status: 200 }
		)
	} catch (error) {
		return json(JSON.stringify(error), { status: 500 })
	}
}

function getFilteredData(data: DataType, value: string) {
	const words = value.toLowerCase().split(" ").filter(Boolean)

	return Object.keys(data).reduce((acc, key) => {
		const file = data[key]
		const filename = file.filename.toLowerCase()
		const filenameC = filename.split("-").join(" ").toLowerCase()
		const fileContent = file.content.toLowerCase()

		const matches = words.every(
			(word) =>
				filename.includes(word) ||
				fileContent.includes(word) ||
				filenameC.includes(word)
		)

		if (matches) {
			acc[key] = file
		}

		return acc
	}, {} as DataType)
}
