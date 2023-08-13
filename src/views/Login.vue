<script>
import { RouterLink } from "vue-router";

// pinia
import { mapActions } from "pinia";
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
      errAccount: false,
      errPassword: false,
    };
  },
  methods: {
    ...mapActions(trackerStore, ["isLogin", "setAccountName"]),
    onLogin() {
      const userDataStr = localStorage.getItem("userData");
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        const findAccount = userData.find((d) => d.account === this.account);
        if (!findAccount) {
          // errAccount
          this.errAccount = true;
        } else {
          this.errAccount = false;
          if (findAccount.password !== this.password) {
            // errPassword
            this.errPassword = true;
          } else {
            // console.log("All OK");
            this.errPassword = false;
            localStorage.setItem("nowLogin", this.account);
            this.setAccountName();
            this.$router.push("/");
          }
        }
      }
    },
  },
  mounted() {
    //now is login
    this.isLogin(this.$router);
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
        <p class="text-red-500">
          {{ errAccount ? "アカウントが正しくありません。" : "" }}
        </p>
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
        <p class="text-red-500">
          {{ errPassword ? "パスワードが正しくありません。" : "" }}
        </p>
      </div>
      <!-- button area -->
      <div class="flex justify-between">
        <RouterLink
          to="/sign-up"
          class="text-black bg-white hover:bg-gray-100 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          新規登録
        </RouterLink>
        <ButtonMain @click="onLogin" :text="'ログイン'" />
      </div>
    </div>
  </div>
</template>
