const numberOfStickers = 25

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function viewport_convert(px = 0, vw = 0, vh = 0) {
	if (px != 0) {
		if (vw) {
			return (100 * px) / window.innerWidth
		} else {
			return (100 * px) / window.innerHeight
		}
	} else if (vw != 0 && vh != 0) {
		var w_h_arr = []
		w_h_arr["width"] = Math.ceil((window.innerWidth * vw) / 100)
		w_h_arr["height"] = Math.ceil((window.innerHeight * vh) / 100)
		return w_h_arr
	} else if (vw != 0) {
		return Math.ceil((window.innerWidth * vw) / 100)
	} else if (vh != 0) {
		return Math.ceil((window.innerHeight * vh) / 100)
	}
}

let unusedStickers = []

const stickerCanvas = document.querySelector(".stickerCanvas")
const stickerCanvasEnd = stickerCanvas.getBoundingClientRect()

stickerCanvas.addEventListener("click", (e) => {
	if (unusedStickers.length === 0) {
		for (var i = 1; i <= numberOfStickers; i++) {
			unusedStickers.push(i)
		}
	}

	const stickerEl = document.createElement("img")
	const randomIndex = randomIntFromInterval(0, unusedStickers.length - 1)
	const randomHeight = randomIntFromInterval(5, 9)
	const imageHeightPx = viewport_convert(0, randomHeight, 0)

	stickerEl.src = `../images/${unusedStickers[randomIndex]}.png`
	unusedStickers.splice(randomIndex, 1)

	stickerEl.classList.add("sticker")
	stickerEl.style.height = `${randomHeight}vw`
	stickerEl.style.transform = `rotate(${randomIntFromInterval(-25, 25)}deg)`

	if (e.clientX + imageHeightPx / 2 > stickerCanvasEnd.right) {
		const overflowRight =
			e.clientX + imageHeightPx / 2 - stickerCanvasEnd.right
		stickerEl.style.left = `${
			e.clientX - imageHeightPx / 2 - overflowRight
		}px`
	} else if (e.clientX - imageHeightPx / 2 < stickerCanvasEnd.left) {
	} else {
		stickerEl.style.left = `${e.clientX - imageHeightPx / 2}px`
	}

	if (e.clientY + imageHeightPx / 2 > stickerCanvasEnd.bottom) {
		const overflowBottom =
			e.clientY + imageHeightPx / 2 - stickerCanvasEnd.bottom
		stickerEl.style.top = `${
			e.clientY - imageHeightPx / 2 - overflowBottom
		}px`
	} else if (e.clientY - imageHeightPx / 2 < stickerCanvasEnd.top) {
		//const overflowTop = e.clientY - imageHeightPx / 2 - stickerCanvasEnd.top
	} else {
		stickerEl.style.top = `${e.clientY - imageHeightPx / 2}px`
	}

	stickerCanvas.appendChild(stickerEl)
})

const featuredProject2 = document.querySelector(".projectItem2");

