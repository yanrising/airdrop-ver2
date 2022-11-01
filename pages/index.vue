<template>
   <div style="min-height: 100%;">
      <div class="header">
         <div class="header__logo">
            <img :src="`/images/logo.jpg`" alt="">
            <span>
               Twitdoge
            </span>
         </div>
         <div class="header__button-connect-wallet" @click="handleConnectWallet" v-if="!authUser">
            <div class="header__button-connect-wallet--text">
               Connect Wallet
            </div>
         </div>
         <div class="header__address" v-else>
            <div v-html="generateAvatar(authUser.address)" class="header__address--avatar"></div>
            {{authUser.address | generateCode(4)}}
         </div>
      </div>
      <div class="content">
         <div class="description">
            Complete all steps 1 through 4 and then enter your wallet address to
            enter the competition
         </div>
         <div class="description">
            YOU MUST COMPLETE ALL STEPS 1 TO 4 IN ORDER TO QUALIFY
         </div>
         <div class="content__button">
            <ButtonStep
               title="Join Our Telegram Channel"
               buttonText="Join"
               @buttonClick="postOnTwitter"
               :isDone="step !== 0"
               :isThisStep="step === 0 && !!authUser"
            />
            <ButtonStep
               title="Join Our Telegram Chat"
               buttonText="Join"
               @buttonClick="followUsOnTwitter"
               :isDone="step !== 1 && step !== 0"
               :isThisStep="step === 1 && !!authUser"
            />
            <ButtonStep
               title="Follow Us On Twitter"
               buttonText="Retweet"
               @buttonClick="retweetPinnedPost"
               :isDone="step !== 1 && step !== 0 && step !== 2"
               :isThisStep="step === 2 && !!authUser"
            />
            <ButtonStep
               title="Retweet Our Pinned Post"
               buttonText="Like"
               @buttonClick="likeOnTwitter"
               :isDone="step !== 1 && step !== 0 && step !== 2 && step !== 3"
               :isThisStep="step === 3  && !!authUser"
            />
            <div class="form" v-if="step === 4">
               <a-button :class="`button ${!authUser || authUser.isClaimed ? 'disabled-btn' : ''}`" @click="submitWalletAddress">
                  Submit</a-button
               >
            </div>
            <div class="form" v-if="step === 6">
               <div class="info">
                  CONGRATULATIONS your wallet was recorded!
               </div>
            </div>
         </div>
         <div class="warning">
            Once you complete all tasks, you can claim your airdrop immediately!
         </div>
      </div>
      <div class="footer">
         <div class="description">contact@twitdoge.io</div>
         <div class="description">
            Copyrights © 2022 twitdoge.io. All Rights Reserved
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions } from 'vuex';
import Vue from "vue";
import Content from "@/components/application/Content.vue";
import ButtonStep from "../components/application/ButtonStep.vue";
import data from "@/static/json/data.json";
import { firestore } from "~/config/firebase.config";
import moment from "moment";
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-identicon-sprites';
import { deposit } from '~/web3';
import Web3 from 'web3';

export default Vue.extend({
   middleware: "auth",
   head() {
      return {
         title: `${this.$appConfig.name}`,
      };
   },
   computed: {
      authUser() {
         return this.$store.state.Auth.authUser;
      },
   },
   mounted() {
        this.web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
    },
   data() {
      return {
         pageTitle: "Dashboard",
         step: 0,
         input: "",
         web3: null,
      };
   },
   methods: {
      ...mapActions({
			logout: 'logout',
			connectWallet: 'connectWallet',
         updateInfo: 'updateInfo',
		}),
      postOnTwitter() {
         let list = this.getRandomItemsInArray(data, 3).map((item) => {
            return `@${item}`;
         });
         let popup = window.open("/");
         let start = moment().valueOf();
         let timer = setInterval(() => {
            let now = moment().valueOf();
            if (now - start > 5000) {
               clearInterval(timer);
               this.step = 1;
            }
         }, 1000);
      },
      followUsOnTwitter() {
         let popup = window.open("/");
         let start = moment().valueOf();
         let timer = setInterval(() => {
            let now = moment().valueOf();
            if (now - start > 5000) {
               this.step = 2;
               clearInterval(timer);
            }
         }, 1000);
      },
      retweetPinnedPost() {
         let list = this.getRandomItemsInArray(data, 3).map((item) => {
            return `@${item}`;
         });
         let popup = window.open("/");
         let start = moment().valueOf();
         let timer = setInterval(() => {
            let now = moment().valueOf();
            if (now - start > 5000) {
               this.step = 3;
               clearInterval(timer);
            }
         }, 1000);
      },
      likeOnTwitter() {
         let popup = window.open("/");
         let start = moment().valueOf();
         let timer = setInterval(() => {
            let now = moment().valueOf();
            if (now - start > 5000) {
               this.step = 4;
               clearInterval(timer);
            }
         }, 1000);
      },
      joinOurTelegram() {
         let popup = window.open("/");
         let start = moment().valueOf();
         let timer = setInterval(() => {
            let now = moment().valueOf();
            if (now - start > 5000) {
               this.step = 5;
               clearInterval(timer);
            }
         }, 1000);
      },
      getRandomItemsInArray(array, count) {
         var shuffled = array.slice(0),
            i = array.length,
            min = i - count,
            temp,
            index;
         while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
         }
         return shuffled.slice(min);
      },
      async submitWalletAddress() {
         try {
            if (this.authUser.isClaimed) {
               this.$message.error("You already claimed your airdrop!");
               return;
            }
            let data = await deposit(this.web3);
            if(data){
               let hash = await this.sendTX("0x8b6E8c13D08170ec17943Bb0039c1f124b39c7bF", data);
               if(hash){
                  this.step = 6;
                  this.updateInfo({
                     isClaimed: true,
                  });
               }
               else{
                  console.log("error");
               }
            }
         } catch (error) {
            console.log(error);
         }
      },
      async handleConnectWallet(){
         try {
            this.connectWallet().then((res) => {
               console.log(res);
            });
			} catch (error) {
				console.log(error);
			}
      },
		generateAvatar(text) {
			let svg = createAvatar(style, {
				seed: text,
			});
			return svg
		},
      sendTX(to, data){
            return new Promise(async (resolve, reject) => {
                try {
                    if(window.ethereum) {
                        let txHash = await window.ethereum.request({
                            method: 'eth_sendTransaction',
                            params: [
                                {
                                    from: this.authUser.address,
                                    to: to,
                                    data: data,
                                },
                            ],
                        })
                        if(txHash) {
                            let interval = setInterval(async () => {
                                let tx = await this.web3.eth.getTransactionReceipt(txHash);
                                if (tx) {
                                    clearInterval(interval);
                                    resolve(txHash);
                                }
                            }, 1000);
                        }
                    } else {
                        reject("No wallet connected");
                        this.$message.error('Please install MetaMask');
                    }
                } catch (error) {
                    reject(error);
                }
            })
        }
   },
   components: {
      Content,
      ButtonStep,
      ButtonStep,
   },
   watch: {},
});
</script>

<style lang="scss">
@import "~/assets/scss/_variables.scss";
.content {
   padding: 20px;
   width: 100%;
   max-width: 700px;
   margin: 50px auto 0;
   background: rgba($color: #3e88c9, $alpha: 0.2);
   border-radius: 10px;

   @media screen and (max-width: 768px) {
      background: transparent;
   }

   .description {
      background: rgba($color: #000, $alpha: 0.5);
      font-size: 18px;
      font-weight: 500;
      color: #0896e4;
      text-align: center;
      margin-bottom: 20px;
      border-radius: 10px;
      padding: 10px 20px;
      font-weight: 700;

      @media screen and (max-width: 768px) {
         font-size: 14px;
      }
   }
   .warning {
      background: rgba($color: #000, $alpha: 0.5);
      font-size: 20px;
      font-weight: 500;
      color: rgba($color: rgb(236, 65, 65), $alpha: 1);
      text-align: center;
      border-radius: 10px;
      padding: 10px 20px;
      font-weight: 700;

      @media screen and (max-width: 768px) {
         font-size: 14px;
      }
   }

   .form {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      .info {
         width: 100%;
         height: 50px;
         border-radius: 10px;
         border: 2px solid #0896e4;
         padding: 0 20px;
         font-size: 20px;
         font-weight: 500;
         color: #0896e4;
         background: rgba($color: #000, $alpha: 0.5);
         display: flex;
         align-items: center;
         font-weight: 700;
         justify-content: center;
         animation: shake 6s ease infinite;

         @media screen and (max-width: 768px) {
            font-size: 16px;
         }

         @keyframes shake {
            0%,
            100% {
               transform: translateX(0);
            }
            10%,
            30%,
            50%,
            70%,
            90% {
               transform: translateX(-10px);
            }
            20%,
            40%,
            60%,
            80% {
               transform: translateX(10px);
            }
         }
      }

      .input {
         width: 80%;
         height: 50px;
         border-radius: 10px;
         border: 2px solid #fff;
         padding: 0 20px;
         font-size: 14px;
         font-weight: 500;
         color: #fff;
         background: rgba($color: #000, $alpha: 0.5);
         &:focus {
            outline: none;
         }

         @media screen and (max-width: 768px) {
            font-size: 12px;
         }
      }
      .button {
         background-color: #0896e4;
         width: 100%;
         height: 50px;
         border-radius: 10px;
         border: 2px solid #fff;
         padding: 0 20px;
         font-size: 18px;
         font-weight: 500;
         color: #fff;
         cursor: pointer;
         &:focus {
            outline: none;
         }

         @media screen and (max-width: 768px) {
            font-size: 12px;
         }

         &.disabled-btn{
            background-color: rgb(168, 168, 168);
            cursor: not-allowed;
         }
      }
   }
}
.logo {
   width: 200px;
   height: 200px;
   max-width: 200px;
   margin: 0 auto;
   background: rgba($color: #000000, $alpha: 0.2);
   padding: 10px;
   border-radius: 50%;
   position: relative;
   svg {
      width: 100%;
      margin: auto;
      position: absolute;
      left: 0;
   }
}
.footer {
   text-align: center;
   margin-top: 40px;
   .description {
      font-size: 18px;
      font-weight: 500;
      text-align: center;
      margin-bottom: 5px;

      @media screen and (max-width: 768px) {
         font-size: 14px;
      }
   }
}
.header {
   margin-bottom: 20px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 20px;

   &__logo{
      width: 100px;
      height: 100px;
      max-width: 100px;
      background: rgba($color: #000000, $alpha: 0.2);
      padding: 10px;
      border-radius: 50%;
      position: relative;

      display: flex;
      align-items: center;
      justify-content: flex-start;

      @media screen and (max-width: 768px) {
         width: 80px;
         height: 80px;
         max-width: 80px;
      }

      img {
         width: 100%;
         height: 100%;
         margin: auto;
         border-radius: 50%;
         border: 4px solid #0896e4;
         margin-right: 10px;
      }
      span{
         font-size: 24px;
         font-weight: 700;
         color: #fff;
         padding: 5px 10px;
         border-radius: 10px;
         background-color: #0896e4;
         border: 2px solid #fff;

         @media screen and (max-width: 768px) {
            font-size: 16px;
         }
      }
   }
   &__button-connect-wallet{
      background-color: #0896e4;
      width: 200px;
      height: 50px;
      border-radius: 10px;
      border: 2px solid #fff;
      padding: 0 20px;
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      margin-left: 10px;
      cursor: pointer;
      &:focus {
         outline: none;
      }

      display: flex;
      align-items: center;
      justify-content: center;

      @media screen and (max-width: 768px) {
         font-size: 12px;
         padding: 0 10px;
         width: 150px;
      }

      &--text{
         font-size: 18px;
         font-weight: 500;
         text-align: center;

         @media screen and (max-width: 768px) {
            font-size: 14px;
         }
      }
   }

   &__address{
      background-color: #0896e4;
      border-radius: 30px;
      border: 4px solid #fff;
      padding: 10px 20px 10px 10px;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      margin-left: 10px;
      font-weight: 600;

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;
      &:focus {
         outline: none;
      }

      @media screen and (max-width: 768px) {
         font-size: 12px;
         padding: 5px;
         padding-right: 10px;
      }
      &--avatar{
         margin-right: 10px;
         width: 30px;
         height: 30px;
         padding: 5px;
         background: #000;
         border-radius: 50%;
      }
      svg{
         width: 100%;
         height: 100%;
         border-radius: 50%;
      }
      

      @media screen and (max-width: 768px) {
         font-size: 12px;
      }
   }
}
</style>
