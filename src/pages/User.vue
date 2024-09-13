<template>
  <div class="head">
    <van-image
        round
        width="7rem"
        height="7rem"
        :src="user.avatarUrl"
    />
  </div>
  <div class="title">
    <div class="name">{{ user.username }}</div>
    <div class="desc">{{ user.profile }}</div>
    <div class="tags-container">
      <van-tag style="text-align: center" plain type="primary" v-for="tag in tags">{{ tag }}</van-tag>
    </div>
  </div>
  <van-cell v-if="!flag" title="签到" value="点击签到" is-link @click="sign"/>
  <van-cell v-else title="连续签到天数" :value="signSum"/>
  <van-cell title="修改个人信息" is-link to="/user/update"/>
  <van-cell title="我的队伍" is-link to="/user/myTeam"/>
  <van-cell v-if="user.userRole === 1" title="标签管理" is-link to="/tag"/>
  <div class="logout">
    <van-button round type="primary" @click="getLogout" block>退出登录</van-button>
  </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser, getSign, getSignSum, isSign, logout} from "../services/user.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter();
//签到天数显示flag
const flag = ref(false);
//退出登录
const getLogout = async () => {
  const res = await logout();
  if (res.code === 0) {
    showSuccessToast('退出成功');
    await router.push({
      path: '/login'
    })
  } else {
    showFailToast('退出失败');
  }
}

//获取当前用户
const tags = ref([]);
const user = ref({})
onMounted(async () => {
  const res = await getCurrentUser();
  user.value = res?.data;
  const obj = JSON.parse(user.value.tags)
  for (let i in obj) {
    tags.value.push(obj [i])
  }
  const isSignRes = await isSign();
  if (isSignRes.code === 0) {
    flag.value = isSignRes.data;
    await getsignCount();
  }
})
//签到
const sign = async () => {
  const res = await getSign();
  if (res.code === 0) {
    showSuccessToast("签到成功")
    flag.value = true;
    await getsignCount()
  } else {
    showFailToast('签到失败');
  }
}
//获取连续签到天数
const signSum = ref()
const getsignCount = async () => {
  const res = await getSignSum();
  if (res.code === 0) {
    signSum.value = res.data;
  } else {
    signSum.value = 1;
  }
}
</script>

<style scoped>
.head {
  margin-top: 45px;
  display: flex;
  justify-content: center; /* 水平居中 */
}

.name, .desc {
  margin-top: 20px;
  text-align: center;
  font-size: 25px;
}

.desc {
  margin-top: 0;
  font-size: 15px;
  padding: 0 40px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}

/* 可选：设置标签之间的间距 */
.van-tag + .van-tag {
  margin-left: 8px; /* 根据实际需求调整间距 */
}

.van-tag--primary.van-tag--plain {
  margin: 5px 5px;
}
</style>