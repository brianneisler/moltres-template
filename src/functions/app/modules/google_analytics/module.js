const createGoogleAnalyticsScript = (context) => ({
  content:
    'window.dataLayer = window.dataLayer || [];\n' +
    'function gtag(){dataLayer.push(arguments);}\n' +
    "gtag('js', new Date());\n" +
    `gtag('config', '${context.config.google_analytics.analyticsId}');`
})

const mod = () => ({
  loadEarlyScripts(context) {
    if (context.config.google_analytics.analyticsId) {
      return [
        {
          props: {
            async: true,
            src: `https://www.googletagmanager.com/gtag/js?id=${context.config.google_analytics.analyticsId}`
          }
        },
        {
          create: createGoogleAnalyticsScript
        }
      ]
    }
    return []
  }
})

export default mod
