<script>
export default {
  props: ["text"],
};
</script>

<template>
  <button
    type="button"
    class="text-white bg-[#5d6176] border border-gray-300 focus:outline-none hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5"
  >
    {{ text }}
  </button>
</template>
