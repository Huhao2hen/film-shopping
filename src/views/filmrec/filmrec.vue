<template>
  <div class="container">
    <el-row>
      <el-col :span="17" class="list">
        <movieSection title="推荐电影" :movieList="movieRecList"></movieSection>
        <movieSection title="热映电影" :movieList="movieList"></movieSection>
      </el-col>
      <el-col :span="6" :offset="1">
        <section class="rec_list">
          <div class="list_title">
            <h2>热映榜单</h2>
            <h3>TODO</h3>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import movieSection from '../../components/movieSection.vue'
import { ref } from 'vue'
import { getMovieList } from '@/api/movie.js'

const movieList = ref([])
const movieRecList = ref([])
async function loadCurrentPage(pageNum = 1, pageSize = 20, movieName = '') {
  let { data } = await getMovieList(pageNum, pageSize, movieName)
  movieList.value = data.records
    .map(item => {
      return {
        id: item.id,
        movieName: item.movieName,
        moviePoster: item.moviePoster
      }
    })
    .slice(0, 10)
  movieRecList.value = data.records.map(item => {
    return {
      id: item.id,
      movieName: item.movieName,
      moviePoster: item.moviePoster
    }
  })
  movieRecList.value.sort(() => 0.5 - Math.random())
  movieRecList.value = movieRecList.value.slice(0, 10)
}
loadCurrentPage()
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.list {
  display: flex;
  flex-direction: column;
}
</style>
