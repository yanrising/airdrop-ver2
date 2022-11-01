import client from '~/plugins/api-sdk'
import toastr from '~/plugins/toastr'
import Enum from '~/helpers/enum'

const EVENT = Enum.WS_EVENT()

const connect = () => {
	console.log('# ws connected')
	client.admin.dashboard.connect()
}

const onEventListener = () => {
	client.admin.dashboard.onMessage((response) => {
		// console.log('response: ', response);
		const data = JSON.parse(response.data) || {}
		if (!data) return
		switch(data.event) {
			// TODO: remove the draft order
			case EVENT.ORDER_CREATED:
				toastr.success({ message: 'Dev Store: You have a new order!' })
				// when placed: <Customer name> has just placed  an order for $price
				break
			default:
				break
		}
	})
}

export default {
	connect,
	onEventListener,
}