export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    if (!config['no-authorization']) {
      const accessToken = localStorage.getItem('token')
      if (accessToken) {
        config.headers.Authorization = `${accessToken}`
      }
    }

    if (config['authorization']) {
      config.headers.Authorization = config['authorization']
    }

    config.headers['Content-Type'] = config['Content-Type'] || 'application/json'
    delete config['Content-Type']
    config.credentials = true
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // redirect('/400')
    }
  })
}