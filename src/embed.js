// Embed mode: the toolkit rendered inside another site's page (the clinic's Wix
// site), where that page already supplies the header, branding and global nav.
//
// Opt in with ?embed=1 on the iframe URL rather than sniffing for an iframe, so
// the standalone site is never altered by accident and the mode can be checked
// directly in a browser.
export const isEmbed = (() => {
  if (typeof window === 'undefined') return false;
  const v = new URLSearchParams(window.location.search).get('embed');
  return v !== null && v !== '0' && v !== 'false';
})();

// Report our height to the parent so it can size the iframe to the content
// instead of leaving a scrollbar inside a scrollbar. Wix's "Embed a Site"
// element cannot listen for this — that needs a Custom Element or an HTML
// embed on their side — but sending it is harmless when nobody is listening.
export function reportHeight() {
  if (!isEmbed || typeof window === 'undefined' || window.parent === window) return () => {};

  let last = 0;
  const send = () => {
    const h = Math.ceil(document.documentElement.scrollHeight);
    if (h && Math.abs(h - last) > 24) {
      last = h;
      window.parent.postMessage({ type: 'cba-toolkit:height', height: h }, '*');
    }
  };

  send();
  const ro = new ResizeObserver(send);
  ro.observe(document.documentElement);
  window.addEventListener('load', send);
  return () => { ro.disconnect(); window.removeEventListener('load', send); };
}
