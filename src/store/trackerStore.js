// 狀態資料庫
import { defineStore } from "pinia";

// 參數 1.資料庫名稱 2.資料庫內容
export default defineStore("indexStore", {
  //state 類似 vue data
  state: () => ({
    income: 0,
    expense: 0,
    accountName: "",
    userData: [],
  }),
  //getters 類似 computed
  //沒有this
  getters: {
    //本身就是一個變數
    // locationInfo: (state) => {
    //   return `現在的位置是: ${state.location}`;
    // },
    balance: (state) => {
      return state.income - state.expense;
    },
    // userTrackerList: (state) => {
    //   return
    // },
  },
  //actions 類似 methods
  //有this
  actions: {
    isLogin(router) {
      const nowLogin = localStorage.getItem("nowLogin");
      if (nowLogin) {
        router.push("/");
      } else {
        router.push("/login");
      }
    },
    onLogout(router) {
      localStorage.removeItem("nowLogin");
      this.accountName = "";
      router.push("/login");
    },
    setLocalStorageUserData() {
      const userDataStr = localStorage.getItem("userData");
      this.userData = userDataStr ? JSON.parse(userDataStr) : [];
    },
    setAccountName() {
      const nowLoginStr = localStorage.getItem("nowLogin");
      this.accountName = nowLoginStr ? nowLoginStr : "";
    },
    saveToLocalStorage(data) {
      localStorage.setItem("userData", JSON.stringify(data));
    },
    updateUserData(newList) {
      const { userData, accountName } = this;
      let newUserData = userData;
      const foundIndex = userData.findIndex((d) => d.account === accountName);
      newUserData[foundIndex].dataList = newList;
      //update LocalStorage & this.userData
      this.userData = newUserData;
      this.saveToLocalStorage(newUserData);
      // update income & expense
      let tempIncome = 0;
      let tempExpense = 0;
      newList.forEach((l) => {
        const { classValue, amount } = l;
        if (classValue === 0) {
          tempExpense += amount;
        }
        if (classValue === 1) {
          tempIncome += amount;
        }
      });
      this.income = tempIncome;
      this.expense = tempExpense;
    },
  },
});
