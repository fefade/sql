<script lang="ts">
	import favicon from "@/assets/512x512.png"
	import { Provider, Link } from "@dxdns-kit/svelte"

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Provider>
	<div class="container">
		{@render children?.()}
	</div>

	<div class="footer muted">
		<div>
			<span>&copy; 2025</span>
			<Link href="https://dxdns.dev" target="_blank" hover="right">dxdns</Link>
		</div>

		<Link
			hover="underlineNone"
			href="https://github.com/sponsors/dxdns"
			target="_blank"
		>
			<small>
				<span style="filter: invert(0.5);">❤️</span>
				Sponsor this project
			</small>
		</Link>
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

	.footer {
		padding: 5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}
</style>
