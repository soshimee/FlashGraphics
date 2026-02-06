const svg = document.querySelector("svg");
const fo = document.querySelector("foreignObject");
const iframe = document.querySelector("iframe");
const doc = iframe.contentDocument;
doc.body.style.margin = 0;
doc.body.style.padding = 0;
const script = doc.createElement("script");
script.textContent = $script;
doc.head.appendChild(script);
const attrAll = (elems, attr, val) => elems.forEach(e => e.setAttribute(attr, val));
const ro = new ResizeObserver(entries => {
	for (const entry of entries) {
		attrAll([svg, fo, iframe], "width", entry.contentRect.width);
		attrAll([svg, fo, iframe], "height", entry.contentRect.height);
	}
});
ro.observe(doc.querySelector("ruffle-player"));
