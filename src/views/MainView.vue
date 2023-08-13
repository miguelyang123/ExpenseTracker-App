<script>
// pinia
import { mapState, mapActions } from "pinia";
import trackerStore from "../store/trackerStore";

import EditButton from "../components/EditButton.vue";
import AddDialog from "../components/AddDialog.vue";
import DeleteDialog from "../components/DeleteDialog.vue";

export default {
  components: {
    EditButton,
    AddDialog,
    DeleteDialog,
  },
  data() {
    return {
      userTrackerList: [],
      isOpenAdd: false,
      isOpenDelete: false,
      isEdit: false,
      deleteIndex: null,
    };
  },
  computed: {
    ...mapState(trackerStore, ["income", "expense", "userData", "accountName"]),
  },
  methods: {
    ...mapActions(trackerStore, ["updateUserData"]),
    setUserTrackerList() {
      const { userData, accountName } = this;
      this.userTrackerList = userData.find(
        (d) => d.account === accountName
      ).dataList;
    },
    onEditMode() {
      this.isEdit = !this.isEdit;
    },
    openAddDialog() {
      this.isOpenAdd = !this.isOpenAdd;
    },
    openDeleteDialog(index) {
      this.deleteIndex = typeof index === "number" ? index : null;
      this.isOpenDelete = !this.isOpenDelete;
    },
    addNewItem(obj) {
      this.userTrackerList.push(obj);
    },
    deleteWithIndex() {
      this.isOpenDelete = false;
      if (this.deleteIndex !== null) {
        this.userTrackerList.splice(this.deleteIndex, 1);
      }
      this.deleteIndex = null;
    },
    classBorderColor(value) {
      let classValue = ["border-l-4"];
      if (value === 0) {
        classValue.push("border-l-red-600");
      }
      if (value === 1) {
        classValue.push("border-l-emerald-600");
      }
      return classValue;
    },
    classTextColor(value) {
      return value === 0 ? "text-red-500" : "text-green-500";
    },
  },
  mounted() {
    this.setUserTrackerList();
  },
  watch: {
    //watch userTrackerList
    userTrackerList: {
      handler(newList) {
        this.updateUserData(newList);
      },
      deep: true,
    },
  },
};
</script>

<template>
  <div class="absolute right-0 top-20 bottom-0 flex justify-center">
    <div class="w-3/5">
      <!-- 収入 支出 -->
      <div class="flex mt-28 mb-16 font-bold">
        <div class="w-1/2 px-5 text-green-500">
          <p class="text-xl">収入</p>
          <p class="text-center text-3xl">¥{{ income }}</p>
        </div>
        <div class="w-1/2 px-5 text-red-500">
          <p class="text-xl">支出</p>
          <p class="text-center text-3xl">¥{{ expense }}</p>
        </div>
      </div>
      <!-- All list -->

      <div class="w-full flex justify-between mb-2 border-b-2">
        <p>履歴</p>
        <button
          type="button"
          @click="onEditMode"
          class="w-8 h-8 rounded-full hover:bg-slate-200 hover:scale-105 active:scale-95 transition duration-200"
        >
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
      <p
        v-if="userTrackerList.length === 0"
        class="text-center text-lg text-gray-500"
      >
        また収支を登録していません。
      </p>
      <div
        v-for="(row, index) in userTrackerList.reverse()"
        :key="index"
        class="flex justify-between p-3 mb-2 border-2 rounded-md"
      >
        <div
          class="flex justify-between items-center w-full h-[30px] px-3"
          :class="classBorderColor(row.classValue)"
        >
          <p>{{ row.itemName }}</p>
          <p class="font-bold" :class="classTextColor(row.classValue)">
            ¥ {{ row.amount }}
          </p>
        </div>
        <div class="w-28" v-if="isEdit">
          <button
            type="button"
            @click="openDeleteDialog(index)"
            class="bg-red-600 hover:bg-red-700 text-white rounded-md px-2 py-[3px] ml-2 hover:scale-105 active:scale-95 transition duration-200"
          >
            <i class="fa-solid fa-eraser"></i>
            <span> 削除 </span>
          </button>
        </div>
      </div>
      <div class="h-20"></div>
    </div>
    <!-- edit Button -->
    <EditButton :openAddDialog="openAddDialog" />
    <!-- Dialog -->
    <AddDialog
      v-show="isOpenAdd"
      :openAddDialog="openAddDialog"
      :addNewItem="addNewItem"
    />
    <DeleteDialog
      v-if="isOpenDelete"
      :openDeleteDialog="openDeleteDialog"
      :userTrackerList="userTrackerList"
      :deleteIndex="deleteIndex"
      :deleteWithIndex="deleteWithIndex"
    />
  </div>
</template>
