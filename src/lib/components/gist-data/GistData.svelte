<script lang="ts">
	import { Button, Card, Code, Link, Window } from "@dxdns/feflow-svelte"

	interface Props {
		baseUrl: string
		filename: string
		content: string
		raw_id: string
	}

	let { baseUrl, filename, content, raw_id }: Props = $props()

	let elCode: HTMLElement | undefined = $state()
	let copied = $state(false)

	function selectText(el: HTMLElement) {
		const range = document.createRange()
		range.selectNodeContents(el)
		const sel = window.getSelection()
		sel?.removeAllRanges()
		sel?.addRange(range)
	}

	async function copyText(el: HTMLElement) {
		await navigator.clipboard.writeText(String(el.textContent))
	}

	async function handleTextCopy() {
		if (!elCode) return
		selectText(elCode)
		await copyText(elCode)
		copied = true
		setTimeout(() => (copied = false), 2000)
	}

	const title = filename.split("-").join(" ").replace(".md", "")
	const pathname = title.split(" ").join("-").toLowerCase()
	const url = `${baseUrl}${raw_id}?title=${pathname}`
	const urlShare = `https://wa.me/?text=https://sql.dxdns.dev${url}`
</script>

<Window>
	{#snippet label()}
		<Link
			href={url}
			style="
			font-size: 13px; 
			font-weight: bold; 
			line-height: normal;
			"
		>
			{title.toUpperCase()}
		</Link>
	{/snippet}
	<Card variant="contained">
		<Code style="max-height: 200px;">
			{@const contentFiltered = content
				.split("\n")
				.filter((l) => l.trim() !== "")}

			<div bind:this={elCode}>
				{#each contentFiltered as text, i (`${text}-${i}`)}
					{@const isComment = text.startsWith("--")}
					{@const muted = isComment ? "text-muted" : ""}
					<Code.Item lineNumber={i} class={muted}>{text}</Code.Item>
					{#if isComment}
						<br />
					{/if}
				{/each}
			</div>
		</Code>
	</Card>

	<div
		style="
		display: flex; 
		align-items: center; 
		justify-content: space-between; 
		margin-top: 1rem;
		"
	>
		<Button disabled={copied} variant="text" onclick={handleTextCopy}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="16px"
				viewBox="0 -960 960 960"
				width="16px"
				fill="#e3e3e3"
			>
				<path
					d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
				/>
			</svg>
		</Button>
		<Link
			style="margin-left: auto;"
			title="Compartilhar"
			href={urlShare}
			target="_blank"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="16px"
				viewBox="0 -960 960 960"
				width="16px"
				fill="#e3e3e3"
			>
				<path
					d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"
				/>
			</svg>
		</Link>
	</div>
</Window>
