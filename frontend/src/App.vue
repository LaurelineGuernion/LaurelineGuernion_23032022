<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Footer
  }
}
</script>

<style lang="scss">
body {
  background-image: url("../src/assets/groupomania_company_blue.jpg");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.form-custom-color-white {
    background: white;
}

.colorwhite {
  color: #fff;
  font-weight: lighter;
}

.linkwhite {
  color: white;
  &:hover {
      color : grey;
  }
}

a:link {
  text-decoration: none;
}

.principal {
  &--color {
    background: #182B49;
  }
}

.imagepageprofil {
  &--size {
	object-fit: cover;
	height: 11em;
  width: 11em;
  }
}
</style>
