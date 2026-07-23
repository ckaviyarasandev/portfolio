<style>
	:global(.glass-scroll) {
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.35) transparent;
	}

	:global(.glass-scroll::-webkit-scrollbar) {
		width: 8px;
	}

	:global(.glass-scroll::-webkit-scrollbar-track) {
		background: rgba(255, 255, 255, 0.04);
		border-radius: 999px;
		margin-block: 4px;
	}

	:global(.glass-scroll::-webkit-scrollbar-thumb) {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.2));
		border-radius: 999px;
		border: 2px solid transparent;
		background-clip: padding-box;
		backdrop-filter: blur(6px);
		transition:
			background 0.25s ease,
			box-shadow 0.25s ease;
	}

	:global(.glass-scroll::-webkit-scrollbar-thumb:hover) {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.35));
		background-clip: padding-box;
		box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
	}

	:global(.glass-scroll::-webkit-scrollbar-thumb:active) {
		background: rgba(255, 255, 255, 0.85);
		background-clip: padding-box;
	}

	:global(.slide-root::-webkit-scrollbar) {
		width: 6px;
	}

	:global(.slide-root::-webkit-scrollbar-thumb) {
		background: rgba(255, 255, 255, 0.25);
		border-radius: 3px;
	}
</style>