import Moralis from "moralis";
import Vue from "vue";


Vue.prototype.$moralist = Moralis

export default (context, inject) => {
  let moralis = Moralis
  moralis.start({ 
    serverUrl: "http://localhost:1337/server",
    appId: "001",
   });
  context.$moralis = moralis
}