<script>
// pinia
import { mapState, mapActions } from "pinia";
import trackerStore from "../store/trackerStore";

import ButtonMain from "../components/ButtonMain.vue";

export default {
  components: {
    ButtonMain,
  },
  data() {
    return {
      account: "",
      password: "",
      repeatPassword: "",
      nullText: "",
      sameAccountText: "",
      rpText: "",
    };
  },
  watch: {
    account() {
      this.checkSameAccount();
      this.nullText = "";
    },
    password() {
      this.nullText = "";
    },
    repeatPassword() {
      this.repeatPasswordCheck();
    },
  },
  computed: {
    ...mapState(trackerStore, ["userData"]),
  },
  methods: {
    ...mapActions(trackerStore, [
      "isLogin",
      "saveToLocalStorage",
      "setAccountName",
    ]),
    onSubmit() {
      if (
        this.checkSameAccount() &&
        this.accountCheck() &&
        this.passwordCheck() &&
        this.repeatPasswordCheck()
      ) {
        // console.log("ALL OK");
        this.saveUserData();
        localStorage.setItem("nowLogin", this.account);
        this.setAccountName();
        this.$router.push("/");
      }
    },
    saveUserData() {
      const { account, password, userData, saveToLocalStorage } = this;
      const userObj = {
        account,
        password,
        dataList: [],
      };
      if (userData) {
        userData.push(userObj);
        saveToLocalStorage(userData);
      } else {
        saveToLocalStorage([userObj]);
      }
    },
    checkSameAccount() {
      const { userData } = this;
      // const userDataStr = localStorage.getItem("userData");
      if (userData) {
        // let userData = JSON.parse(userDataStr);

        const isSameAccount = userData.some((d) => d.account === this.account);
        if (isSameAccount) {
          this.sameAccountText = "同じアカウント存在しています。";
        } else {
          this.sameAccountText = "";
        }
        return !isSameAccount;
      }
      return true;
    },
    checkNull(v) {
      if (v === "") {
        this.nullText = "ご入力ください。";
      } else {
        this.nullText = "";
      }
      return v !== "";
    },
    accountCheck() {
      return this.checkNull(this.account);
    },
    passwordCheck() {
      return this.checkNull(this.password);
    },
    repeatPasswordCheck() {
      if (this.repeatPassword === this.password) {
        this.rpText = "";
      } else {
        this.rpText = "パスワードが一致しません。";
      }
      return this.repeatPassword === this.password;
    },
  },
  mounted() {
    //now is login
    // this.isLogin(this.$router);
  },
};
</script>
<template>
  <div
    class="flex justify-center items-center absolute top-0 bottom-0 w-screen"
  >
    <div class="w-2/6">
      <!-- account -->
      <div class="mb-6">
        <label
          for="account"
          class="block mb-2 text-sm font-medium text-gray-900"
          >アカウント</label
        >
        <input
          type="text"
          id="account"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="JohDone"
          required
          v-model="account"
        />
        <p class="text-red-500">{{ account ? "" : nullText }}</p>
        <p class="text-red-500">{{ sameAccountText }}</p>
      </div>
      <!-- password -->
      <div class="mb-6">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900"
          >パスワード</label
        >
        <input
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="•••••••••"
          required
          v-model="password"
        />
        <p class="text-red-500">{{ password ? "" : nullText }}</p>
      </div>
      <!-- repeat password -->
      <div class="mb-6">
        <label
          for="repeatPassword"
          class="block mb-2 text-sm font-medium text-gray-900"
          >パスワード （確認）</label
        >
        <input
          type="password"
          id="repeatPassword"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="•••••••••"
          required
          v-model.lazy="repeatPassword"
        />
        <p class="text-red-500">{{ rpText }}</p>
      </div>

      <!-- button area -->
      <div class="flex justify-between">
        <RouterLink
          to="/login"
          class="text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          ログインはこちら
        </RouterLink>
        <ButtonMain @click="onSubmit" :text="'新規登録する'" />
      </div>
    </div>
  </div>
</template>
