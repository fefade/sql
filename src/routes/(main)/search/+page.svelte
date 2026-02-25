<script lang="ts">
	import { GistData } from "$lib/components/gist-data"

	let { data } = $props()
</script>

<svelte:head>
	<title>Comandos SQL - Resultados da pesquisa | {data.title}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div>
	<h3>Resultados ({data.gistData.length}):</h3>
	{#each data.gistData as item, i (`${item}-${i}`)}
		<GistData
			baseUrl="/"
			filename={item.filename}
			content={item.content}
			raw_id={item.raw_id}
		/>
	{/each}
</div>
