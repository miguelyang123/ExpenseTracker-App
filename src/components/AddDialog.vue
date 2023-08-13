<script>
import ButtonMain from "../components/ButtonMain.vue";
export default {
  components: {
    ButtonMain,
  },
  props: ["openAddDialog", "addNewItem"],
  data() {
    return {
      openDropdown: false,
      textList: ["支出", "収入"],
      classValue: 0,
      itemName: "",
      amount: null,
    };
  },
  methods: {
    onOpenDropdown() {
      this.openDropdown = !this.openDropdown;
    },
    onFocusoutDropdown(bool) {
      setTimeout(() => {
        this.openDropdown = bool;
      }, 100);
    },
    changeSelect(i) {
      this.classValue = i;
      this.openDropdown = false;
    },
    onSubmit() {
      const { itemName, amount, classValue, openAddDialog } = this;
      this.addNewItem({
        itemName,
        amount,
        classValue,
      });
      openAddDialog();
      this.itemName = "";
      this.amount = null;
    },
  },
};
</script>

<template>
  <div
    class="fixed h-full w-full top-0 left-0 flex justify-center items-center"
  >
    <div class="bg-white rounded-xl w-2/6 z-30 p-10 relative">
      <!-- close button -->
      <button
        type="button"
        @click="openAddDialog"
        class="absolute top-4 right-4 rounded-full hover:bg-slate-100 w-8 h-8"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
      <!-- input number -->
      <label
        for="inputAmount"
        class="block mb-2 text-xl font-medium text-gray-900"
      >
        <i class="fa-solid fa-yen-sign"></i>
        金額
      </label>
      <div class="flex mb-8">
        <div class="relative flex-shrink-0 inline-flex">
          <button
            @click="onOpenDropdown"
            @focusout="onFocusoutDropdown(false)"
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            class="flex-shrink-0 inline-flex items-center z-10 py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg focus:ring-4 focus:outline-none focus:ring-gray-300"
            type="button"
          >
            {{ textList[classValue] }}
            <svg
              class="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            v-if="openDropdown"
            id="dropdown"
            class="z-30 bg-white rounded-lg shadow-lg absolute w-full top-11"
          >
            <ul
              class="py-2 text-sm text-gray-700"
              aria-labelledby="dropdown-button"
            >
              <li>
                <button
                  @click="changeSelect(0)"
                  class="block px-4 py-2 hover:bg-gray-100 w-full border-b-2"
                >
                  支出
                </button>
              </li>
              <li>
                <button
                  @click="changeSelect(1)"
                  class="block px-4 py-2 hover:bg-gray-100 w-full"
                >
                  収入
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="relative w-full">
          <input
            type="number"
            id="inputAmount"
            v-model="amount"
            class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="1000"
            required
          />
        </div>
      </div>
      <!-- input item text -->
      <div class="mb-6">
        <label
          for="itemText"
          class="block mb-2 text-xl font-medium text-gray-900"
        >
          <i class="fa-solid fa-bag-shopping"></i>
          費目
        </label>
        <input
          type="text"
          id="itemText"
          v-model="itemName"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <!-- add button -->
      <div class="flex justify-center">
        <ButtonMain @click="onSubmit" :text="'登録'" />
      </div>
    </div>
    <div
      @click="openAddDialog"
      class="fixed h-full w-full top-0 left-0 z-0 bg-[#70707085]"
    ></div>
  </div>
</template>
