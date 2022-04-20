<template>
  <div class="profil">
    <BarreNav />
    <MyProfil />
  </div>
</template>

<script>
  import BarreNav from "@/components/BarreNav";
  import MyProfil from "@/components/MyProfil";
  import router from '../router';

  export default {
    name: 'Posts',
    components: {
      BarreNav, MyProfil
    },
    
    mounted() {
      if (localStorage.token === undefined) {
        router.push({ path : '/'});
      }
    }
  }
</script>