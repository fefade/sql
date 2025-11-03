<script lang="ts">
	import { goto } from "$app/navigation"
	import { Link, Navbar, SearchInput } from "@fefade/svelte"

	let { children } = $props()

	function handleSubmit(event: Event) {
		event.preventDefault()

		const form = new FormData(event.target as HTMLFormElement)
		const query = form.get("query")

		goto(`/search?query=${query?.toString()}`)
	}
</script>

<div class="container">
	<Link href="/">
		<h1 style="text-align: center; line-height: 1.5;">Comandos SQL ✨</h1>
	</Link>

	<Navbar
		id="nav1"
		isTranslucent
		style="
        position: sticky; 
        top: 15px; 
        left: 0; 
        right: 0; 
        z-index: 900; 
        border-radius: 15px;
        height: auto;
        padding: 1rem;
        "
	>
		<div class="navbarContent" style="flex: 1;">
			<form onsubmit={handleSubmit}>
				<SearchInput
					name="query"
					variant="contained"
					placeholder="Buscar..."
					oninput={(e) => {
						const target = e.target as HTMLInputElement
						if (target.value === "") {
							goto("/")
						}
					}}
				/>
			</form>

			<Navbar.Item
				variant="contained"
				href="https://dxdns.dev/files"
				target="_blank"
			>
				Arquivos
			</Navbar.Item>
		</div>
	</Navbar>
	{@render children?.()}
</div>

<style>
	.container {
		width: 800px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.navbarContent {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
		align-items: center;
	}

	@media screen and (max-width: 768px) {
		.container {
			width: 100%;
		}

		.navbarContent {
			grid-template-columns: 1fr;
		}

		.navbarContent > :last-child {
			justify-self: flex-end;
		}
	}
</style>
