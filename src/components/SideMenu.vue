<template>
    <div 
        class="sidenav"
        :class="visible && 'visible'"
    >
        <a class="closebtn" @click="$emit('hide-menu')">&times;</a>
        <a>About</a>
        <a>Services</a>
        <a>Clients</a>
        <a>Contact</a>
    </div>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
      visible: Boolean
  }
}
</script>

<style scoped>
.sidenav {
  width: 0;  
  height: 100%; 
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.5s;
}

.visible {
    width: 250px
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}


</style>
