<template>
  <UserCardList :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"/>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import qs from 'qs'
import {searchUserList} from "../services/user.ts";
import UserCardList from "../components/userCardList.vue";


const route = useRoute();

let {tags} = route.query;

const userList = ref([]);
const loading = ref(false);
onMounted(async () => {
  // const userListData = await Axios.get('/user/search/tags', {
  loading.value = true;
  const userListData = await searchUserList({
    params: {
      tagNameList: tags
    },
    paramsSerializer: (params: any) => {
      return qs.stringify(params, {indices: false})
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
    loading.value = false;
  }
})


</script>

<style scoped>

</style>