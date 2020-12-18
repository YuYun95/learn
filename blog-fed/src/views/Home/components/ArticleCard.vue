<template>
  <div class="article-card">
    <div class="article-cover">
      <router-link to="">
        <img src="@/assets/cover.jpg" alt="">
      </router-link>
    </div>
    <div class="article-info">
      <div class="article-time">2020 11 10</div>
      <div class="article-title">
        <router-link to="/">文章标题</router-link>
      </div>
      <div class="article-description">我们领略了城市的白天和夜晚，夜晚比白天可爱，特别是夏天的夜晚尤其可爱。
        心情不好、压力大的时候，试试在风中跑一圈，或者在夏天的晚风里走一走。我们领略了城市的白天和夜晚，夜晚比白天可爱，特别是夏天的夜晚尤其可爱。 心情不好、压力大的时候，试试在风中跑一圈，或者在夏天的晚风里走一走。
      </div>
      <div class="article-stuff">
        <div>字数</div>
        <div>查看</div>
        <div>喜欢</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ArticleCard'
})
</script>

<style lang="scss" scoped>
.article-card {
  display: flex;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);

  .article-cover {
    flex: 1;
    padding: 24px;

    img {
      max-width: 100%;
      object-fit: cover;
    }
  }

  .article-info {
    position: relative;
    flex: 1;
    padding: 24px;

    .article-time {
      margin-bottom: 8px;
      font-size: 14px;
      color: #999;
    }

    .article-title {
      overflow: hidden;
      margin-bottom: 16px;
      word-break: break-all;
      font-size: 24px;
      line-height: 30px;

      a {
        display: inline-block;
        color: #000;
        text-decoration: none;
      }
    }

    .article-description {
      margin-bottom: 24px;
      word-break: break-all;
      font-size: 14px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      line-height: 24px;
    }

    .article-stuff {
      position: absolute;
      left: 6%;
      bottom: 9%;
      display: flex;
      width: 100%;

      > div {
        flex: 1;
      }
    }
  }
}
</style>
