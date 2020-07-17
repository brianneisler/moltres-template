import renderScripts from './renderScripts'
import renderStyles from './renderStyles'

const templateHtml = (
  context,
  {
    earlyScripts = [],
    html = '',
    meta = '',
    scripts = [],
    state = {},
    styles = []
  }
) => `
<!DOCTYPE html>
<html lang="en" style="height:100%">
  <head>
    <meta charset="utf-8">
    ${meta}
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover" />
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#4a90e2">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="msapplication-config" content="/path/to/config-file.xml" />
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/png" href="/assets/icons/rubber-duck-icon-16x16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="/assets/icons/rubber-duck-icon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/assets/icons/rubber-duck-icon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/assets/icons/rubber-duck-icon-128x128.png" sizes="128x128">
    <link rel="apple-touch-icon" sizes="120x120" href="/assets/icons/rubber-duck-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/rubber-duck-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="167x167" href="/assets/icons/rubber-duck-icon-167x167.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/rubber-duck-icon-180x180.png">
    <link rel="stylesheet" type="text/css" href="/css/index.css" media="screen" />
    ${renderStyles(context, styles)}
    ${renderScripts(context, earlyScripts, { state })}
  </head>
  <body>
    <div id="root">${html}</div>
    ${renderScripts(context, scripts, { state })}
  </body>
</html>
`

export default templateHtml
