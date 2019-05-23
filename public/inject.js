/**
 * injectScript - Inject internal script to available access to the `window`
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
  node.appendChild(script);

  const extensionIdScript = document.createElement('script');
  extensionIdScript.setAttribute('type', 'application/javascript');
  extensionIdScript.textContent = `window.extensionId = '${chrome.runtime.id}';`;
  node.appendChild(extensionIdScript);

  const extensionModeScript = document.createElement('script');
  extensionModeScript.setAttribute('type', 'application/javascript');
  extensionModeScript.textContent = `window.extensionDevMode = ${!('update_url' in chrome.runtime.getManifest())};`;
  node.appendChild(extensionModeScript);
}
injectScript(chrome.extension.getURL('content.js'), 'body');
