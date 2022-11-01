export const convertOembed = () => {
	// var oembedElms = document.getElementsByTagName('oembed')
	// if (oembedElms) {
	// 	for(var i = 0; i < oembedElms.length; i++) {
	// 		var elemUrl = oembedElms[i].getAttribute('url')
	// 		var videoId = elemUrl.split('v=')[1];
	// 		var ampersandPosition = videoId.indexOf('&');
	// 		if(ampersandPosition != -1) {
	// 		  videoId = videoId.substring(0, ampersandPosition);
	// 		}
	// 		if (elemUrl) {
	// 			oembedElms[i].innerHTML = `<div class="oembed">
	// 			    <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>
	// 			</div>`
	// 		}
	// 	}
	// }
	var qlVideoElms = document.getElementsByClassName('ql-video')
	if (qlVideoElms) {
		for(var i = 0; i < qlVideoElms.length; i++) {
			var videoUrl = qlVideoElms[i].getAttribute('src')
			var oembedElm = document.createElement('DIV')
			oembedElm.setAttribute('class', 'oembed')
			oembedElm.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>`
			qlVideoElms[i].parentNode.insertBefore(oembedElm, qlVideoElms[i].nextSibling)
		}
	}
}