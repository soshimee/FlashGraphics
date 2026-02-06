const iframe = document.querySelector("iframe");
const doc = iframe.contentDocument;
doc.body.style.margin = 0;
doc.body.style.padding = 0;
doc.body.style.overflow = "hidden";
const script = doc.createElement("script");
script.textContent = $script;
doc.head.appendChild(script);
