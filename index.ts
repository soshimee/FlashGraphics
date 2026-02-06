import { parseSwf } from "swf-parser";

const file = Bun.file("./in.swf");

const swf = parseSwf(await file.bytes());

const { xMin, xMax, yMin, yMax } = swf.header.frameSize;

const width = (xMax - xMin) / 20;
const height = (yMax - yMin) / 20;

const toDataUri = async (file: Bun.BunFile) => `data:${file.type};base64,${await file.bytes().then(b => b.toBase64())}`;

const srcMap: Record<string, string> = {};

for await (const file of new Bun.Glob("{*.wasm,core.ruffle.*.js}").scan("ruffle")) {
	srcMap[file] = await toDataUri(Bun.file(`ruffle/${file}`));
}

const scripts: string[] = [];

scripts.push(await Bun.file("templates/pre.js").text().then(t => t.replaceAll("$srcmap", JSON.stringify(srcMap))));
scripts.push(await Bun.file("ruffle/ruffle.js").text());
scripts.push(await Bun.file("templates/main.js").text().then(async t => t.replaceAll("$ruffle", JSON.stringify({ url: await toDataUri(file), autoplay: "on", unmuteOverlay: "hidden" }))));

const injector = await Bun.file("templates/injector.js").text().then(t => t.replaceAll("$script", () => JSON.stringify(scripts.join("\n"))));

const svg = await Bun.file("templates/main.svg").text().then(t => t.replaceAll("$width", width.toString()).replaceAll("$height", height.toString()).replaceAll("$script", () => injector));

Bun.file("out.svg").write(svg);
