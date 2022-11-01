import async from 'async'
import { isArray } from 'lodash'
import { getPathFromUrl } from '~/helpers/utils'
import { getId } from '~/helpers/uuid'

export default {
  data() {
    return {
      fileList: null,
      files: {},
    }
  },
  created() {
    this.loadFiles()
  },
  methods: {
    loadFiles() {
      if (this.data) {
        let fileList = {}
        this.uploadFields.forEach((o) => {
          fileList[o] = []
          this.files[o] = []
          if (this.data[o]) {
            let arrs = []
            if (!isArray(this.data[o])) {
              arrs = [this.data[o]]
            } else {
              arrs = this.data[o]
            }
            for (let i = 0; i < arrs.length; i++) {
              const uuid = getId()
              fileList[o].push({
                uid: uuid,
                name: `image-${uuid}.png`,
                url: arrs[i],
                status: "done",
                _id: uuid,
              })
            }
          }
        })
        this.fileList = fileList
      }
    },
    onAddFile: function(result, field) {
      console.log(this.fileList, field);
			const [jsonFile, file] = result
			this.fileList[field].push(jsonFile)
			this.files[field].push(file)
		},
		onRemoveFile: function(file, field) {
			let index = this.fileList[field].findIndex(e => e.uid === file.uid)
			// remove from fileList
			const newJsonFileList = this.fileList[field].slice()
			newJsonFileList.splice(index, 1)
			this.fileList[field] = newJsonFileList
			// remove from files
			index = this.files[field].findIndex(e => e.uid === file.uid)
			const newFileList = this.files[field].slice()
			newFileList.splice(index, 1)
      this.files[field] = newFileList
		},
		onUploadFiles: function() {
      return new Promise((resolve) => {
        let uploadUrls = {}
        async.each(Object.keys(this.fileList), (o, cb) => {
          if (this.files[o] && this.files[o].length > 0) {
            const uploadUrlsPromise = this.files[o].map(async (file) => {
              const {
                url
              } = await this.$store.dispatch(
                'generateFileSignature',
                file
              )
              await this.$store.dispatch('uploadFile', {
              	file,
              	signedUrl: url
              })
              return {
                url: getPathFromUrl(url)
              }
            });
            Promise.all(uploadUrlsPromise).then((result) => {
              uploadUrls[o] = result
              const oldFiles = this.fileList[o].filter(e => "_id" in e)
              if (oldFiles.length > 0) {
                uploadUrls[o] = [...oldFiles, ...uploadUrls[o]]
              }
              cb()
            })
          } else {
            cb()
          }
        }, (err) => {
          if (err) {
            // console.log(err)
          }
          resolve(uploadUrls)
        })
      })
		},
  },
}