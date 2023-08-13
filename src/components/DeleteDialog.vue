<script>
import ButtonMain from "../components/ButtonMain.vue";
export default {
  components: {
    ButtonMain,
  },
  props: [
    "openDeleteDialog",
    "userTrackerList",
    "deleteIndex",
    "deleteWithIndex",
  ],
};
</script>

<template>
  <div
    class="fixed h-full w-full top-0 left-0 flex justify-center items-center"
  >
    <div class="bg-white rounded-xl w-5/12 z-30 p-10 relative">
      <!-- close button -->
      <button
        type="button"
        @click="openDeleteDialog"
        class="absolute top-4 right-4 rounded-full hover:bg-slate-100 w-8 h-8"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
      <!-- text -->
      <div class="mb-5">
        <p class="text-xl">費目:</p>
        <p class="text-center text-3xl">
          {{ userTrackerList[deleteIndex].itemName }}
        </p>
      </div>
      <div class="mb-10">
        <p class="text-xl">金額:</p>
        <p
          class="text-center text-3xl"
          :class="{
            'text-red-500': userTrackerList[deleteIndex].classValue === 0,
            'text-green-500': userTrackerList[deleteIndex].classValue === 1,
          }"
        >
          ¥{{ userTrackerList[deleteIndex].amount }}
        </p>
      </div>

      <p class="text-xl mb-4">を削除よろしですか？</p>
      <!-- button area -->
      <div class="z-20 flex justify-end">
        <button
          type="button"
          @click="openDeleteDialog"
          class="px-3 py-1 border rounded-md border-gray-300 hover:bg-gray-400 hover:text-white"
        >
          いいえ
        </button>
        <button
          type="button"
          @click="deleteWithIndex"
          class="ml-4 px-3 py-1 border rounded-md border-gray-300 text-white bg-red-400 hover:bg-red-600"
        >
          削除
        </button>
      </div>
    </div>

    <div
      @click="openDeleteDialog"
      class="fixed h-full w-full top-0 left-0 z-0 bg-[#70707085]"
    ></div>
  </div>
</template>
