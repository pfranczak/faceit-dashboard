<template>
  <div class="header">
      <router-link to="/">
          <img src="../assets/logo.png" class="logo"/>
      </router-link>
      <img src="../assets/hamburger.png" class="hamburger"/>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
  background-color: #F0F1F3;
  font-size: 30px;
  border-bottom: 2px black solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px
}
.logo, .hamburger {
    align-self: center;
}
.logo {
    width: 62px;
    height: 66px;
}
</style>
