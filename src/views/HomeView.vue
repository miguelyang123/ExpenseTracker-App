<script>
import Sidebar from "../components/Sidebar.vue";
import MainView from "./MainView.vue";

// pinia
import { mapActions } from "pinia";
import trackerStore from "../store/trackerStore";

export default {
  components: {
    Sidebar,
    MainView,
  },
  methods: {
    ...mapActions(trackerStore, ["isLogin"]),
  },
  mounted() {
    //if not login
    this.isLogin(this.$router);
  },
};
</script>

<template>
  <div class="flex justify-between">
    <Sidebar class="w-[32%]" />
    <MainView class="w-[68%]" />
  </div>
</template>

<style lang="scss" scoped></style>
