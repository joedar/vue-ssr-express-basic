import { createApp } from './app'

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp()
  const { url } = context

  router.push(url)

  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents()
    if (!matchedComponents.length) {
      return reject({ code: 404 })
    }

    return resolve(app)
  }, reject)
})