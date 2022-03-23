<template>
  <div class="feed">
    <BarreNav />
    <CreatePost />
    <Post />
  </div>
</template>

<script>
import BarreNav from "@/components/BarreNav";
import CreatePost from '@/components/CreatePost.vue';
import Post from '@/components/Post.vue';
import router from '../router';

export default {
  name: 'Posts',
  components: {
    BarreNav, CreatePost, Post
  },
  
  mounted() {
    if (localStorage.token === undefined) {
      router.push({ path : '/'});
    }
  }
}
</script>