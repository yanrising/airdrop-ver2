import Vue from 'vue'
import VueToast from 'vue-toast-notification'

// import 'vue-toast-notification/dist/theme-sugar.css'
import 'vue-toast-notification/dist/theme-default.css'

Vue.use(VueToast)

function showMessage({ message, type, duration = 5000 }) {
	Vue.$toast.open({
	    message,
	    type,
	    duration,
	    position: 'top-right'
	})
}

let success = ({ message }) => {
	showMessage({ message, type: 'success' })
}

let info = ({ message }) => {
	showMessage({ message, type: 'info' })
}

let warning = ({ message }) => {
	showMessage({ message, type: 'warning' })
}

let error = ({ message }) => {
	showMessage({ message, type: 'error' })
}

export default {
	success,
	info,
	warning,
	error,
}