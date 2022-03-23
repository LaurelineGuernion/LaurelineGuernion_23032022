<template>
  <div class="Members">
    <BarreNav />
    <ListUsers />
  </div>
</template>

<script>
import BarreNav from "@/components/BarreNav";
import ListUsers from "@/components/ListUsers";
import router from '../router';

export default {
  name: 'Members',
  components: {
    BarreNav, ListUsers
  },
  
  mounted() {
    if (localStorage.token === undefined) {
      router.push({ path : '/'});
    }
  }
}
</script>