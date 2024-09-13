<template>
  <van-skeleton title avatar avatar-size="88px" row="2" :loading="props.loading" v-for="(user,index) in props.userList" :key="index">
    <van-card
        :desc="user.profile"
        :title="user.username"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="danger" v-for="(tag,index1) in user.tags" :key="index1" style="margin: 2px 3px">{{
            tag
          }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>
</template>

<script lang="ts" setup>
import {UserType} from "../models/user";

interface UserCardListProps {
  loading
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {

  loading: true,
  //@ts-ignore
  userList: [],
})
</script>


<style scoped>

</style>