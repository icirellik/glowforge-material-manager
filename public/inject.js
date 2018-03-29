/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {string} file_path Local path of the internal script.
 * @param  {string} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */
function injectScript(file_path, tag) {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  node.appendChild(script);

  var extensionIdScript = document.createElement('script');
  extensionIdScript.setAttribute("type", "application/javascript");
  extensionIdScript.textContent = 'window.extensionId = \'' + chrome.runtime.id + '\';';
  node.appendChild(extensionIdScript);
}
injectScript(chrome.extension.getURL('content.js'), 'body');
