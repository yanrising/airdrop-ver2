import AIRDROPABI from "./web3abi.json";
const CONTRACT = "0x8b6E8c13D08170ec17943Bb0039c1f124b39c7bF"

export const deposit = async (web3) => {
  try {
    const tokenCont = new web3.eth.Contract(AIRDROPABI, CONTRACT);
    let data = await tokenCont.methods.claimAirdrop().encodeABI();
    
    return data;
  } catch (error) {
    console.log(error);
  }
}