// import { isEmpty } from 'lodash'
import { getConfig } from '../config'
import { isBoolean } from 'lodash'
class BaseService {
  constructor(state) {
    Object.assign(this, state)
    this.config = getConfig(process.env.NODE_ENV)
  }

  loadAllWithPaging(reqObj) {
    const { 
      page = 1, pageSize = 10, 
    } = reqObj
    let url = `${this.config.apiEndpoint}/api/auth/${this.name}/?page=${page}&pageSize=${pageSize}`
    const request = parsedQuery(url, reqObj)

    return new Promise((resolve, reject) => {
      return this.$axios.$get(request.url, {
        params: request.params,
      }).then((res) => {
        let data = {}
        data.records = res && res.rows || []
        data.total = res && res.total || 0
        if (res && res.message) {
          data.errors = res && res.message
        }
        resolve(data)
      }, (e) => {
        // console.log(e)
        reject({ message: 'Failed to load records' })
      })
    })
  }

  save(reqObj) {
    let url = `${this.config.apiEndpoint}/api/auth/${this.name}/`
    return new Promise((resolve, reject) => {
      this.$axios.$post(url, reqObj).then((res) => {
        resolve(parsedResponse(res))
      }, (e) => {
        if (e && e.response) {
          const { data } = e.response
          if (data && data.message) {
            resolve({ errors: data.message })
          }
        } else {
          // console.log(e)
          reject(e)
        }
      })
    })
  }

  update(reqObj) {
    const { _id } = reqObj
    let url = `${this.config.apiEndpoint}/api/auth/${this.name}/${_id}/`
    return new Promise((resolve, reject) => {
      this.$axios.$put(url, reqObj).then((res) => {
        resolve(parsedResponse(res))
      }, (e) => {
        reject(e)
      })
    })
  }

  getById(id, populates = []) {
    let url = `${this.config.apiEndpoint}/api/auth/${this.name}/${id}`
    if (populates && populates.length > 0) {
      url += `/?populate[]=${populates[0]}`
      for (let i = 1; i < populates.length; i++) {
        url += `&populate[]=${populates[i]}`
      }
    }
    return new Promise((resolve, reject) => {
      this.$axios.$get(url).then((res) => {
        resolve(parsedResponse(res))
      }, (e) => {
        // console.log(e)
        reject(e)
      })
    })
  }

  create() {
    return Promise.resolve(this.model)
  }

  remove(reqObj) {
    const { _id } = reqObj
    let url = `${this.config.apiEndpoint}/api/auth/${this.name}/${_id}`
    return new Promise((resolve, reject) => {
      this.$axios.$delete(url).then((res) => {
        resolve(parsedResponse(res))
      }, (err) => {
        reject(err)
      })
    })
  }
}

let parsedQuery = (url, reqObj) => {
  const {
    status = '',
    search = '', 
    searchFields = [],
    rangeKey = '', 
    rangeValues = [],
    id = '',
    carId = '',
    populates = [],
    sort = '-createdAt',
    isDeleted = null,
    requestType = "",
  } = reqObj
  let requestUrl = url
  const params = {
    query: {},
  }
  if (status) {
    params.query.status = status
  }
  if (requestType) {
    params.query.requestType = requestType
  }
  if (search) {
    params.search = search
    if (searchFields && searchFields.length > 0) {
      requestUrl += searchFields.map(o => `&searchFields[]=${o}`).join('')
    }
  }
  if (rangeKey && rangeValues && rangeValues.length === 2) {
    params.query[rangeKey] = {
      $gte: rangeValues[0],
      $lt: rangeValues[1],
    }
  }
  if (id) {
    params.query._id = id
  }
  if (carId) {
    params.query.carId = carId
  }
  if (populates && populates.length > 0) {
    populates.forEach((o) => {
      requestUrl += `&populate[]=${o}`
    })
  }
  if (sort) {
    requestUrl += `&sort=${sort}`
  } 
  if (isBoolean(isDeleted)) {
    if (!isDeleted) {
      params.query.$or = [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    } else {
      params.query.isDeleted = isDeleted
    }
  }

  return {
    url: requestUrl,
    params,
  }
}

let parsedResponse = (res) => {
  let data = null
  if (res && res._id) {
    data = res
  } else {
    data = {
      errors: res && res.message,
    }
  }
  return data
}

export default BaseService