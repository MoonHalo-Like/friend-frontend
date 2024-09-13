<template>
  <div class="teamPage">
    <van-search v-model="teamName" placeholder="搜索队伍" @search="onSearch"/>
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="private"/>
    </van-tabs>

    <van-floating-bubble icon="plus" @click="doJoinTeam" v-model:offset="offset" axis="xy"/>
    <team-card-list :team-list="teamList"></team-card-list>
    <van-empty v-if="!teamList || teamList.length < 1" description="数据为空"/>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/teamCardList.vue";
import {onMounted, ref} from "vue";
import {getteam, select} from "../services/team.ts";
import {showFailToast} from "vant";
//气泡位置
const offset = ref({x: 300, y: 550});
const router = useRouter();
//跳转加入页面
const doJoinTeam = () => {
  router.push({
    path: '/team/add'
  })
}
const teamList = ref([])
onMounted(async () => {
  await getTeamList(0);
})

const getTeamList = async (status: number) => {
  const res = await getteam({
    params: {
      status,
    }
  });
  if (res.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast('加载队伍失败，请刷新重试');
  }
}

//搜索
const teamName = ref('');
const onSearch = async (name: string) => {
  const res = await select({
    params: {
      name
    },
  })
  if (res.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast('查询失败，请刷新重试');
  }
}

//选择队伍类型
const active = ref('public')

const onClickTab = async (name: string) => {
  if (active.value === 'public') {
    await getTeamList(0);
  } else {
    await getTeamList(2);
  }
}
</script>

<style scoped>

</style>