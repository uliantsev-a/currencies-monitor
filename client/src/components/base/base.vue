<template name="base" lang="pug">
  div.container
    .bg
    header.header
      ul.nav
        li.nav__item
          a(href='/') Home
    .panel
      router-view
    footer.footer
      span © CurrenciesMonitor
</template>

<style scoped lang="scss" src="./base.scss"></style>
