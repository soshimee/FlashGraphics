const srcMap = $srcmap;
const a = Element.prototype.appendChild;
Element.prototype.appendChild = function (...args) {
	if (args[0] instanceof HTMLScriptElement) {
		const m = srcMap[args[0].getAttribute("src").split("/").pop()];
		if (m) args[0].setAttribute("src", m);
	}
	return a.apply(this, args);
};
const b = window.fetch;
window.fetch = function (...args) {
	if (args[0] instanceof URL) {
		const m = srcMap[args[0].href.split("/").pop()];
		if (m) args[0] = new URL(m);
	}
	return b.apply(this, args);
};
