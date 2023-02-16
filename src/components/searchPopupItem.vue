<template>
  <router-link :to="'/detail/' + props.searchItem.id">
    <section class="toMovieDetail">
      <img class="moviePoster" :src="props.searchItem.moviePoster" alt="" />
      <h4 class="title">{{ props.searchItem.movieName }}</h4>
    </section>
  </router-link>
</template>

<script setup>
const props = defineProps({
  searchItem: Object
})
</script>

<style lang="less" scoped>
.toMovieDetail {
  width: 100%;
  height: 75px;
  margin-top: 5px;
  .moviePoster {
    width: 50px;
    height: 70px;
    float: left;
    margin: auto 0;
  }
  .title {
    margin-top: 0;
    text-indent: 1em;
  }
}
.toMovieDetail:hover {
  background-color: rgba(233, 233, 233, 0.692);
}
</style>
