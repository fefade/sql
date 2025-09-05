<script lang="ts">
	import { GistData } from "@/components/gist-data/index.js"
	import apiService from "@/services/apiService.js"
	import type { GistDataFileType } from "@/types/gist.types.js"
	import {
		Button,
		ShortcutListener,
		VisibilityListener
	} from "@dxdns-kit/svelte"

	let { data } = $props()

	const api = apiService()

	let isLoading = $state(false)
	let currentPage = $state(1)
	let gistData: GistDataFileType[] = $state([])
	let gistDataCount = $state(0)
	let limit = $state(5)
	let isReset = $state(false)

	function nextPage() {
		currentPage = currentPage + 1
	}

	function handleShortcut() {
		isReset = true
		currentPage = 0
		limit = 9999
	}

	async function fetchGistData() {
		try {
			isLoading = true

			const response = await api.getGistData(limit, currentPage)
			if (!response.ok) throw new Error("error")
			const obj = await response.json()

			if (isReset) {
				gistData = obj.data
				isReset = false
			} else {
				gistData = [...gistData, ...obj.data]
			}

			gistDataCount = obj.count
		} finally {
			isLoading = false
		}
	}

	$effect(() => {
		fetchGistData()
	})
</script>

<svelte:head>
	<title>Comandos SQL | {data.title}</title>
	<meta
		name="description"
		content="Antes de executar qualquer comando é recomendado fazer uma cópia do banco de dados."
	/>
</svelte:head>

<ShortcutListener
	keys={["Control", "F"]}
	callback={handleShortcut}
	preventDefault={false}
/>

<main class="content">
	{#each gistData as item, i (`${item}-${i}`)}
		<GistData
			baseUrl="/"
			filename={item.filename}
			content={item.content}
			raw_id={item.raw_id}
		/>
	{/each}

	<VisibilityListener
		callback={() => {
			if (gistData.length < gistDataCount) {
				nextPage()
			}
		}}
	/>

	{#if gistData.length < gistDataCount || isLoading}
		<Button variant="text" {isLoading} title="load more" onclick={nextPage}>
			Carregar mais...
		</Button>
	{/if}
</main>

<style>
	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
