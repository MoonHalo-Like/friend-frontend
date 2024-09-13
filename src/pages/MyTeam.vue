<template>
  <van-tabs v-model:active="active" @click-tab="onClickTab">
    <van-tab title="我创建的队伍" name="create"/>
    <van-tab title="我加入的队伍" name="join"/>
    <team-card-list :team-list="teamList"></team-card-list>
  </van-tabs>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

import TeamCardList from "../components/teamCardList.vue";
import {getMyCreateTeam, getMyJoinTeam} from "../services/team.ts";
import {showFailToast} from "vant";

const teamList = ref([])
const active = ref('create');

const createTeamList = ref([])
const joinTeamList = ref([])

const getMyCreateTeams = async () => {
  const res = await getMyCreateTeam();
  if (res.code === 0) {
    createTeamList.value = res.data;
    teamList.value = createTeamList.value;
  } else {
    showFailToast('加载队伍失败，请刷新重试');
  }
}

const getMyJoinTeams = async () => {
  const res = await getMyJoinTeam();
  if (res.code === 0) {
    joinTeamList.value = res.data;
  } else {
    showFailToast('加载队伍失败，请刷新重试');
  }
}

onMounted(async () => {
  await getMyCreateTeams();
  await getMyJoinTeams();
})

const onClickTab = () => {
  if (active.value == 'create') {
    teamList.value = createTeamList.value;
  } else {
    teamList.value = joinTeamList.value;
  }
}
</script>

<style scoped>

</style>