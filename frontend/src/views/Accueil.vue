<template>
  <div class="accueil">
    <SliderHome />
  </div>
</template>

<script>
  import SliderHome from '@/components/SliderHome.vue'
  import router from '../router';

  export default {
    name: 'Accueil',
    components: {
      SliderHome
    },

    created() {
      if (localStorage.prenom) {
        router.push({ path : '/posts'});
      }
    }
  }
</script>