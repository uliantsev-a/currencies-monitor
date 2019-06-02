<template lang="pug">
  .content
    .title
      h1 Currency list
      p with last prices
    table.base-table
      tr
       th Name
       th Date
       th Values
      tr(v-for="currency in currencyList" v-bind:name="currency.name" @click.stop="currencyClickHandler")
        td {{ currency.name }}
        td {{ currency.last_price.created }}
        td {{ currency.last_price.value }}
</template>

<script src="./home.js"></script>
<style scoped lang="scss" src="./home.scss"></style>
