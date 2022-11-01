import ImageKit from 'imagekit-javascript'
import { getConfig } from '../config'

const CONFIG = getConfig(process.env.NODE_ENV)

const imageKit = new ImageKit({
  publicKey : 'public_Z0NClssNO5ZDIGVQviRT9Rbk2X4=',
  urlEndpoint : 'https://ik.imagekit.io/harrydemo',
  authenticationEndpoint: `${CONFIG.apiEndpoint}/api/image/generateAuthentication?token=${localStorage.getItem('token')}`
})

export default imageKit