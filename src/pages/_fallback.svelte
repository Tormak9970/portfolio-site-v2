<script lang="ts">
    
</script>

<main>
	<div class="frown">:(</div>
	<div class="msg">Error 404. Either I broke something, or you made a typo! <br/>You can return home by clicking the logo in the top left of your screen.</div>
	<div class="qrcode-cont">
		<div class="qrcode">
			<img src="/images/error.svg" alt="error qrcode" width="100px" height="100px">
		</div>
		<div class="qrcode-msg">For more information about the issue, please scan the QR Code.</div>
	</div>
</main>

<style>
	main {
		width: calc(100% - 28px);
		height: calc(100% - 28px);

		padding: 14px;

		background-color: blue;
	}

	.frown {
		font-size: 80px;
		margin-bottom: 14px;
	}

	.msg {
		font-size: 18px;
		margin-bottom: 14px;
	}

	.qrcode-cont {
		display: flex;
	}

	.qrcode {
		margin-right: 14px;
	}
</style>