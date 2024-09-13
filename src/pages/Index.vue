<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="checked" @change="domatch"/>
    </template>
  </van-cell>
  <UserCardList :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>

</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {getMatch, getRecommend} from "../services/user.ts";
import UserCardList from "../components/userCardList.vue";


const userList = ref([]);
const loading = ref(true)

onMounted(async () => {
  await getUserListData()
})

const getUserListData = async () => {
  loading.value = true
  const userListData = await getRecommend({
    params: {
      pageNum: 1,
      pageSize: 8
    }
  }).then((res: any) => {
    return res.data.records;
  })
  if (userListData) {
    userListData.forEach((user: any) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData
  }
  loading.value = false
}


//跳转推荐
const checked = ref(false);
const domatch = async (value: any) => {
  if (value) {
    loading.value = false
    const userListData = await getMatch({
      params: {
        num: 15
      }
    }).then((res: any) => {
      return res.data;
    })
    if (userListData) {
      userListData.forEach((user: any) => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags)
        }
      })
      userList.value = userListData
    }
    loading.value = false
  } else {
    await getUserListData()
  }
}

</script>

<style scoped>

</style>