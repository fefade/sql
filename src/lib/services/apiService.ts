export default function apiService(fetchFn: typeof fetch = fetch) {
	return {
		getGistData(limit: number, currentPage: number) {
			return fetchFn(`/api/sql-gist?limit=${limit}&page=${currentPage}`)
		},
		getGistDataByFragment(query: string) {
			return fetchFn(`/api/sql-gist?limit=9999&page=1&fragment=${query}`)
		}
	}
}
