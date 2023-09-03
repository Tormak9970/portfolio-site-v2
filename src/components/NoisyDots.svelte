<script lang="ts">
  import { createNoise3D } from "simplex-noise";
  import { afterUpdate, onMount } from "svelte";

  let canvas:HTMLCanvasElement;
  let ctx:CanvasRenderingContext2D;

  function mapRange(value: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number, clamp: boolean) {
    if (Math.abs(inputMin - inputMax) < Number.EPSILON) {
      return outputMin;
    } else {
      let outVal =
        ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
        outputMin;
      if (clamp) {
        if (outputMax < outputMin) {
          if (outVal < outputMax) {
            outVal = outputMax;
          } else if (outVal > outputMin) {
            outVal = outputMin;
          }
        } else {
          if (outVal > outputMax) {
            outVal = outputMax;
          } else if (outVal < outputMin) {
            outVal = outputMin;
          }
        }
      }
      return outVal;
    }
  }

  const noise = createNoise3D();

  const pointSpacing = 24;
  const minCircleRad = 2;
  const maxCircleRad = 20;

  const amplitude = 0.8;
  const frequencyX = 3;
  const frequencyY = 3;

  function clear(): void {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawScaledCircle(x:number, y:number, noise:number) {
    ctx.fillStyle = "#252525"; // also try #2c2c2c, #303030, #383838
    ctx.beginPath();
    ctx.arc(x, y, mapRange(noise, -1, 1, minCircleRad, maxCircleRad, false), 0, 2 * Math.PI);
    ctx.fill();
  }

  function drawPoints(time: number) {
    const numIttsX = Math.ceil(canvas.width / pointSpacing) + 1;
    const numIttsY = Math.ceil(canvas.height / pointSpacing) + 1;
    for (let i = 0; i < numIttsX; i++) {
      const x = pointSpacing * i;
      
      for (let j = 0; j < numIttsY; j++) {
        const y = pointSpacing * j;

        const n = noise( x / canvas.width * frequencyX, y / canvas.height * frequencyY, time * 0.5) * amplitude;

        drawScaledCircle(x, y, n);
      }
    }
  }

  function animate(currentTime:number): void {
    if (canvas) {
      clear();
      currentTime *= 0.001;
      drawPoints(currentTime);
    }

    requestAnimationFrame(animate.bind(this));
  }

  function updateCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    updateCanvas();
    animate(0);
  });

  afterUpdate(() => {
    updateCanvas();
  });
</script>

<svelte:window on:resize="{() => { updateCanvas(); }}" />

<div class="noisy-dots">
  <canvas bind:this="{canvas}" />
</div>

<style>
  .noisy-dots {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: black;
  }
</style>