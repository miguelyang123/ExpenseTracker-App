<script>
export default {
  props: ["openAddDialog"],
};
</script>

<template>
  <button
    type="button"
    @click="openAddDialog"
    class="fixed right-14 bottom-14 h-16 w-16 bg-[#717aa2] hover:bg-slate-600 rounded-full text-2xl text-white hover:scale-105 active:scale-95 transition duration-200"
  >
    <i class="fa-solid fa-pen"></i>
  </button>
</template>
