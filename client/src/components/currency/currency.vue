<template lang="pug">
  .content
    .title
      h1(v-if="rStatus == 404") Current is not found
      h1(v-else) Rate list by {{currentCurrency}}
    table.base-table
      tr
       th Date
       th Value
      tr(v-for="rate in rateList")
        td {{ rate.created }}
        td {{ rate.value }}
</template>

<script src="./currency.js"></script>
<style scoped lang="scss" src="./currency.scss"></style>
