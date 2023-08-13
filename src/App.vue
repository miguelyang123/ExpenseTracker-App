<script>
import { RouterLink, RouterView } from "vue-router";
import HeaderView from "./components/HeaderView.vue";

// pinia
import { mapActions } from "pinia";
import trackerStore from "./store/trackerStore";

export default {
  components: {
    HeaderView,
  },
  methods: {
    ...mapActions(trackerStore, ["setLocalStorageUserData", "setAccountName"]),
  },
  mounted() {
    //set UserData with LocalStorage
    this.setLocalStorageUserData();
    this.setAccountName();
  },
};
</script>

<template>
  <HeaderView />
  <RouterView class="pt-20" />
</template>
