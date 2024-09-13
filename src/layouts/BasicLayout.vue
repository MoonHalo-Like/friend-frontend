<template>
  <!--  导航栏-->
  <van-nav-bar
      :title="title"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <!--  内容-->
  <div id="content">
    <router-view/>
  </div>
  <!--底栏-->
  <van-tabbar route>
    <van-tabbar-item icon="home-o" name="index" replace to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team" replace to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user" replace to="/user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup>
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";



const router = useRouter();
const route = useRoute();

const onClickLeft = () => {
  router.back()
};
const onClickRight = () => {
  router.push("/search")
};
//根据路由切换标题
const DEFAULT_TITLE = '友友';
const title = ref(DEFAULT_TITLE);

router.beforeEach((to,from)=>{
  const toPath = to.path;
  title.value = to.meta?.title ?? DEFAULT_TITLE;
})

</script>

<style scoped>
#content{
  padding-bottom: 50px;
}
</style>