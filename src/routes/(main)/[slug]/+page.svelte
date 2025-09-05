<script lang="ts">
	import { page } from "$app/state"
	import { GistData } from "@/components/gist-data"
	import { Link } from "@dxdns-kit/svelte"

	let { data } = $props()

	const { slug } = page.params
	const title = page.url.searchParams.get("title")
</script>

<svelte:head>
	<title>{title?.split("-").join(" ").toUpperCase()} | {data.title}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<Link href="/" style="padding: 1rem 0;">
	<span style="display: inline-block; transform: rotate(180deg);">
		{String.fromCharCode(10140)}
	</span>
	Voltar
</Link>

<GistData
	baseUrl="/"
	filename={String(title)}
	content={data.gistData}
	raw_id={slug!}
/>
