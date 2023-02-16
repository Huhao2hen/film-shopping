<template>
  <section class="tags">
    <div class="movieType">
      <span class="method">类型:</span>
      <div class="tag_list" @click="handleTag">
        <el-button round style="margin: 2px" :autofocus="true">全部</el-button>
        <el-button round style="margin: 2px" v-for="item in tags" :key="item.id">{{ item.tag }}</el-button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getMovieTagList } from '../api/movie'
import emitter from '@/util/mitt'

// defineProps({})
let emit = defineEmits(['tagList'])

const tags = [
  {
    id: '1',
    tag: '爱情'
  },
  {
    id: '2',
    tag: '喜剧'
  },
  {
    id: '3',
    tag: '动画'
  },
  {
    id: '4',
    tag: '剧情'
  },
  {
    id: '5',
    tag: '惊悚'
  },
  {
    id: '6',
    tag: '科幻'
  },
  {
    id: '7',
    tag: '动作'
  },
  {
    id: '8',
    tag: '悬疑'
  },
  {
    id: '9',
    tag: '奇幻'
  },
  {
    id: '10',
    tag: '武侠'
  },
  {
    id: '11',
    tag: '历史'
  },
  {
    id: '12',
    tag: '恐怖'
  },
  {
    id: '13',
    tag: '战争'
  },
  {
    id: '14',
    tag: '冒险'
  },
  {
    id: '15',
    tag: '犯罪'
  },
  {
    id: '16',
    tag: '纪录片'
  }
]
const handleTag = async e => {
  let movieTag = e.target.innerText
  if (movieTag == '全部') {
    movieTag = ''
  }
  if (movieTag.length > 3) {
    return
  }
  let { data } = await getMovieTagList(movieTag)
  let list = data.map(item => {
    return {
      id: item.id,
      movieName: item.movieName,
      moviePoster: item.moviePoster
    }
  })
  emitter.emit('tagList', list)
}
</script>

<style lang="less">
.tags {
  width: 100%;
  border: 1px solid #dcdfe6;
  margin: 10px;
  .movieType {
    width: 100%;
    margin: 5px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    .method {
      height: 5%;
      margin-top: 5px;
      color: #606266;
      text-align: center;
    }
    .tag_list {
      width: 90%;
    }
  }
}
</style>
