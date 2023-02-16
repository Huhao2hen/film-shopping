<template>
  <div class="container">
    <tagSelect></tagSelect>
    <movieSection v-model:movieList="movieList"></movieSection>
  </div>
</template>

<script setup>
import tagSelect from '../../components/tagSelect.vue'
import movieSection from '../../components/movieSection.vue'
import { ref } from 'vue'
import { getMovieTagList } from '@/api/movie.js'
import emitter from '../../util/mitt'
const movieList = ref([])
async function loadCurrent(movieTag = '') {
  let { data } = await getMovieTagList(movieTag)
  movieList.value = data.map(item => {
    return {
      id: item.id,
      movieName: item.movieName,
      moviePoster: item.moviePoster
    }
  })
}
loadCurrent()

emitter.on('tagList', value => {
  movieList.value = value
})
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
