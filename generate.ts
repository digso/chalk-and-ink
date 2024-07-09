import {SvgToFontOptions} from "svgtofont"
import {createSVG, createTTF, createWOFF} from "svgtofont/lib/utils"

const options: SvgToFontOptions = {
  src: "icons/abc",
  dist: "fonts",
  fontName: "chalk-and-ink",
  emptyDist: true,
  css: false,
  svgicons2svgfont: {fontHeight: 1000, normalize: true},

  // When output, the character is just
  // the first letter of the name of the source svg file.
  getIconUnicode(name, _unicode, _startUnicode) {
    const index = name.codePointAt(0)
    if (!index) throw new Error(`cannot get char unicode: ${name}`)
    return [name, index!]
  },
}

async function generateFont() {
  await createSVG(options)
  const ttf = await createTTF(options)
  await createWOFF(options, ttf)
}
generateFont()
