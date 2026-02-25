<script lang="ts">
	import favicon from "$lib/assets/images/favicon.ico"
	import { Provider } from "@fefade-ui/svelte"

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="canonical" href="https://sql.fefade.com" />
</svelte:head>

<Provider>
	<div class="container">
		{@render children?.()}
	</div>
</Provider>

<style>
	@font-face {
		font-family: "Inter";
		src: url("/fonts/Inter-Regular.woff") format("woff");
		font-weight: 400;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: "Inter";
		src: url("/fonts/Inter-Bold.woff") format("woff");
		font-weight: 700;
		font-style: normal;
		font-display: swap;
	}

	:global(body) {
		font-family: "Inter", sans-serif;
		line-height: 1.2;
		overflow-x: hidden;
		margin: 0;
		padding: 0;
	}

	.container {
		width: 80%;
		margin: 3rem auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 15rem);
	}
</style>
