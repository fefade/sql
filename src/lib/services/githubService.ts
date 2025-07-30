export default function githubService(fetchFn: typeof fetch = fetch) {
	const id = "f439cf17fdfcaa7f1a5bdda45c4f1ee0"

	return {
		getGistSql() {
			return fetchFn(`https://api.github.com/gists/${id}`)
		},
		getGistRawSql(rawId: string) {
			return fetchFn(
				`https://gist.githubusercontent.com/dxdns/${id}/raw/${rawId}`
			)
		}
	}
}
