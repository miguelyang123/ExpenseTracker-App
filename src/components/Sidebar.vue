<script>
// pinia
import { mapState, mapActions } from "pinia";
import trackerStore from "../store/trackerStore";

export default {
  computed: {
    ...mapState(trackerStore, ["accountName", "balance"]),
  },
  methods: {
    ...mapActions(trackerStore, ["onLogout"]),
    // onLogout(router) {
    //   localStorage.removeItem("nowLogin");
    //   this.$router.push("/login");
    // },
  },
};
</script>

<template>
  <div
    class="bg-[#99a2c9] text-white fixed top-20 bottom-0 flex flex-col justify-between items-center"
  >
    <div class="flex flex-col items-center mt-40">
      <h3 class="text-3xl font-bold mb-10">{{ accountName }}</h3>
      <div>
        <p class="text-2xl mb-3">残金</p>
        <p class="text-4xl">¥ {{ balance }}</p>
      </div>
    </div>

    <div class="mb-10 flex flex-col items-center">
      <div class="bg-gray-100 shadow-md rounded-lg w-60 px-2 py-8">
        <p class="text-black text-center text-lg">
          こんにちは，{{ accountName }}
        </p>
      </div>
      <button type="button" @click="onLogout($router)">
        <p class="mt-4 mx-auto hover:underline">ログアウト</p>
      </button>
    </div>
  </div>
</template>
