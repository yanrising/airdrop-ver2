<template>
   <div style="min-height: 100%;">
      <div class="header">
         <div class="header__logo">
            <img src="/images/logo.jpg" alt="">
         </div>
         <div class="header__button-connect-wallet" @click="handleConnectWallet">
            <div class="header__button-connect-wallet--text">
               Connect Wallet
            </div>
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
               :isThisStep="step === 0"
            />
            <ButtonStep
               title="Join Our Telegram Chat"
               buttonText="Join"
               @buttonClick="followUsOnTwitter"
               :isDone="step !== 1 && step !== 0"
               :isThisStep="step === 1"
            />
            <ButtonStep
               title="Follow Us On Twitter"
               buttonText="Retweet"
               @buttonClick="retweetPinnedPost"
               :isDone="step !== 1 && step !== 0 && step !== 2"
               :isThisStep="step === 2"
            />
            <ButtonStep
               title="Retweet Our Pinned Post"
               buttonText="Like"
               @buttonClick="likeOnTwitter"
               :isDone="step !== 1 && step !== 0 && step !== 2 && step !== 3"
               :isThisStep="step === 3"
            />
            <div class="form" v-if="step === 4">
               <a-input
                  class="input"
                  placeholder="Copy and paste your wallet address here"
                  v-model="input"
               >
               </a-input>
               <a-button class="button" @click="submitWalletAddress"
                  >Submit</a-button
               >
            </div>
            <div class="form" v-if="step === 6">
               <div class="info">
                  CONGRATULATIONS your wallet was recorded!
               </div>
            </div>
         </div>
         <div class="warning">
            We will verify that winners have completed all steps
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

export default Vue.extend({
   head() {
      return {
         title: `${this.$appConfig.name}`,
      };
   },
   computed: {},
   created() {},
   data() {
      return {
         pageTitle: "Dashboard",
         step: 0,
         input: "",
      };
   },
   methods: {
      ...mapActions({
			logout: 'logout',
			connectWallet: 'connectWallet',
		}),
      postOnTwitter() {
         let list = this.getRandomItemsInArray(data, 3).map((item) => {
            return `@${item}`;
         });
         let popup = window.open(
            `https://twitter.com/intent/tweet?text=🔥 100 BILLION $FC WORTH $100.000 READY FOR AIRDROPS%0D%0A%0D%0A

			⏳ Time line:
			Oct 6th, 2022 – Oct 9th, 2022%0D%0A%0D%0A

			Complete all task at:👇
			https://airdrop.twitdoge.io%0D%0A%0D%0A

			Fairlaunch on Pancakeswap at 13:00 UTC Oct 9th%0D%0A%0D%0A

			${list.join("%20")}%0A%0A&hashtags=Floki,BNB,FC,Flokichain`,
            "popup",
            "height=570,width=520,"
         );
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
         let popup = window.open(
            `https://twitter.com/intent/follow?screen_name=Twitdoge.io`,
            "popup",
            "height=570,width=520,"
         );
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
         let popup = window.open(
            `https://twitter.com/intent/tweet?in_reply_to=1578351984868220929&text=${list.join(
               "%20"
            )}%0A%0A&hashtags=Floki,BNB,FC,Flokichain,Bitcoin,ElonMusk,CZ,Web3,BinanceSmartChain`,
            "popup",
            "height=570,width=520,"
         );
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
         let popup = window.open(
            `https://twitter.com/intent/like?tweet_id=1577218026109554688`,
            "popup",
            "height=570,width=520,"
         );
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
         let popup = window.open(
            `https://t.me/flokichainglobal`,
            "popup",
            "height=570,width=520,"
         );
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
         if (this.input && this.input.length > 0) {
            try {
               await firestore.collection("wallets").add({
                  address: this.input,
                  createdAt: new Date(),
               });
               this.step = 6;
            } catch (error) {
               console.log(error);
            }
         } else {
            alert("Please enter your wallet address");
         }
      },
      async handleConnectWallet(){
         try {
				await this.connectWallet().then((user) => {
               this.isConnect = false;
					this.$message.success(`Connect Wallet Success`);
				});
			} catch (error) {
				console.log(error);
			}
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
   background: rgba($color: #9a6aff, $alpha: 0.2);
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
         width: 20%;
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

         @media screen and (max-width: 768px) {
            font-size: 12px;
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
      img {
         width: 100%;
         height: 100%;
         margin: auto;
         border-radius: 50%;
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

      &--text{
         font-size: 18px;
         font-weight: 500;
         text-align: center;

         @media screen and (max-width: 768px) {
            font-size: 14px;
         }
      }

      @media screen and (max-width: 768px) {
         font-size: 12px;
      }
   }
}
</style>
