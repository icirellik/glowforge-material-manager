/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * Manifest V3 blocks content scripts from injecting inline scripts, so the
 * extension id and mode are passed to the script as data attributes.
 *
 * @param  {string} filePath Local path of the internal script.
 * @param  {string} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */
function injectScript(filePath, tag) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', filePath);
  script.dataset.extensionId = chrome.runtime.id;
  script.dataset.extensionDevMode = String(!('update_url' in chrome.runtime.getManifest()));
  node.appendChild(script);
}
injectScript(chrome.runtime.getURL('content.js'), 'body');
