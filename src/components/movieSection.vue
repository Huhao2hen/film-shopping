<template>
  <section class="rec_list">
    <div class="list_title">
      <h2 class="title">{{ title }}</h2>
    </div>
    <div class="list_body">
      <div class="movie_item" v-for="item in movieList" :key="item.id">
        <router-link :to="'/detail/' + item.id">
          <img :src="item.moviePoster" />
          <p class="movie_info">{{ item.movieName }}</p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: String,
  movieList: Array
})
</script>

<style lang="less">
.rec_list {
  width: 100%;
  margin: 10px 0;
  .list_title {
    border-bottom: 1px solid #dcdfe6;
    text-indent: 5px;
  }
  .list_body {
    // overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    .movie_item {
      height: 200px;
      width: 150px;
      position: relative;
      margin: 20px 7px;
      border-radius: 2px;
      border: 1px solid #dcdfe6;
      cursor: pointer;
      transition: box-shadow 0.4s, transform 0.4s;
      background-color: #ddd;
      img {
        width: 100%;
        height: 100%;
      }
      .movie_info {
        left: 0;
        bottom: 0;
        position: absolute;
        width: 100%;
        height: 30px;
        margin: 0;
        padding: 5px;
        color: #fff;
        font-size: 16px;
        text-indent: 2px;
        font-weight: 300;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; 
        background-color: rgba(128, 128, 128, 0.5);
      }
    }
    .movie_item:hover {
      transform: scale(1.2);
      box-shadow: 1px 4px 10px 2px #ccc;
      z-index: 2;
    }
  }
}
</style>
