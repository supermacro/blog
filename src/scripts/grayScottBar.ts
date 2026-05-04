const bar = document.getElementById('gsBar');
const canvas = document.getElementById('gsCanvas');

if (bar instanceof HTMLElement && canvas instanceof HTMLCanvasElement) {
	const context = canvas.getContext('2d');

	if (context) {
		const scale = 4;
		const fallbackCanvasHeight = 52;
		let canvasWidth = 0;
		let canvasHeight = fallbackCanvasHeight;
		let simulationWidth = 0;
		let simulationHeight = 0;

		const feed = 0.0545;
		const kill = 0.062;
		const diffusionA = 1.0;
		const diffusionB = 0.5;
		const deltaTime = 1.0;

		let chemicalA = new Float32Array();
		let chemicalB = new Float32Array();
		let nextChemicalA = new Float32Array();
		let nextChemicalB = new Float32Array();

		const targetFps = 8;
		const frameMs = 1000 / targetFps;
		const stepsPerFrame = 12;
		let lastRender = 0;

		const warmupSteps = 600;

		const step = () => {
			for (let y = 0; y < simulationHeight; y += 1) {
				for (let x = 0; x < simulationWidth; x += 1) {
					const index = y * simulationWidth + x;
					const previousX = (x - 1 + simulationWidth) % simulationWidth;
					const nextX = (x + 1) % simulationWidth;
					const previousY = (y - 1 + simulationHeight) % simulationHeight;
					const nextY = (y + 1) % simulationHeight;

					const laplacianA =
						chemicalA[previousY * simulationWidth + x] +
						chemicalA[nextY * simulationWidth + x] +
						chemicalA[y * simulationWidth + previousX] +
						chemicalA[y * simulationWidth + nextX] -
						4 * chemicalA[index];
					const laplacianB =
						chemicalB[previousY * simulationWidth + x] +
						chemicalB[nextY * simulationWidth + x] +
						chemicalB[y * simulationWidth + previousX] +
						chemicalB[y * simulationWidth + nextX] -
						4 * chemicalB[index];

					const a = chemicalA[index];
					const b = chemicalB[index];
					const reaction = a * b * b;

					nextChemicalA[index] = Math.max(
						0,
						Math.min(1, a + (diffusionA * laplacianA - reaction + feed * (1 - a)) * deltaTime),
					);
					nextChemicalB[index] = Math.max(
						0,
						Math.min(1, b + (diffusionB * laplacianB + reaction - (kill + feed) * b) * deltaTime),
					);
				}
			}

			[chemicalA, nextChemicalA] = [nextChemicalA, chemicalA];
			[chemicalB, nextChemicalB] = [nextChemicalB, chemicalB];
		};

		const setup = () => {
			const configuredHeight = Number(bar.dataset.height);

			canvasWidth = bar.clientWidth || window.innerWidth;
			canvasHeight =
				Number.isFinite(configuredHeight) && configuredHeight > 0 ? configuredHeight : fallbackCanvasHeight;
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			canvas.style.width = `${canvasWidth}px`;
			canvas.style.height = `${canvasHeight}px`;

			simulationWidth = Math.ceil(canvasWidth / scale);
			simulationHeight = Math.ceil(canvasHeight / scale);

			chemicalA = new Float32Array(simulationWidth * simulationHeight).fill(1);
			chemicalB = new Float32Array(simulationWidth * simulationHeight).fill(0);
			nextChemicalA = new Float32Array(simulationWidth * simulationHeight);
			nextChemicalB = new Float32Array(simulationWidth * simulationHeight);

			const blobs = Math.floor(simulationWidth / 6);

			for (let i = 0; i < blobs; i += 1) {
				const centerX = Math.floor(Math.random() * simulationWidth);
				const centerY = Math.floor(Math.random() * simulationHeight);
				const radius = 1 + Math.floor(Math.random() * 2);

				for (let dy = -radius; dy <= radius; dy += 1) {
					for (let dx = -radius; dx <= radius; dx += 1) {
						const x = (centerX + dx + simulationWidth) % simulationWidth;
						const y = (centerY + dy + simulationHeight) % simulationHeight;
						chemicalB[y * simulationWidth + x] = 1;
						chemicalA[y * simulationWidth + x] = 0;
					}
				}
			}

			for (let i = 0; i < warmupSteps; i += 1) {
				step();
			}
		};

		const draw = () => {
			const image = context.createImageData(canvasWidth, canvasHeight);
			const { data } = image;

			for (let cellY = 0; cellY < simulationHeight; cellY += 1) {
				for (let cellX = 0; cellX < simulationWidth; cellX += 1) {
					const value = Math.max(
						0,
						Math.min(1, chemicalA[cellY * simulationWidth + cellX] - chemicalB[cellY * simulationWidth + cellX]),
					);
					const tone = Math.pow(value, 1.8);
					const red = Math.round(26 + tone * (245 - 26));
					const green = Math.round(26 + tone * (244 - 26));
					const blue = Math.round(24 + tone * (240 - 24));

					for (let dy = 0; dy < scale; dy += 1) {
						const pixelY = cellY * scale + dy;
						if (pixelY >= canvasHeight) continue;

						for (let dx = 0; dx < scale; dx += 1) {
							const pixelX = cellX * scale + dx;
							if (pixelX >= canvasWidth) continue;

							const offset = (pixelY * canvasWidth + pixelX) * 4;
							data[offset] = red;
							data[offset + 1] = green;
							data[offset + 2] = blue;
							data[offset + 3] = 255;
						}
					}
				}
			}

			context.putImageData(image, 0, 0);
		};

		const loop = (timestamp: number) => {
			requestAnimationFrame(loop);
			if (timestamp - lastRender < frameMs) return;
			lastRender = timestamp;

			for (let i = 0; i < stepsPerFrame; i += 1) {
				step();
			}

			draw();
		};

		requestAnimationFrame(() => {
			setup();
			requestAnimationFrame(loop);
		});
	}
}
