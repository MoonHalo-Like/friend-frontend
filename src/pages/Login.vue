<template>
  <van-tabs v-model:active="active">
    <van-tab title="登录" name="login"/>
    <van-tab title="注册" name="register"/>
  </van-tabs>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请输入账号' },{ validator: (val) => val.length >= 4, message: '账号至少4位'}]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' },{ validator: (val) => val.length >= 8, message: '密码最少8位'}]"
      />
      <van-field
          v-if="active === 'register'"
          v-model="checkPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请输入密码' },{ validator: (val) => val === userPassword, message: '两次密码不一致'}]"
      />
    </van-cell-group>
    <div v-if="active==='login'" style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
    <div v-else style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>

</template>

<script lang="ts" setup>
import {ref} from "vue";
import Axios from "../plugins/Axios.ts";
import {showSuccessToast, showFailToast} from 'vant';
import {useRoute, useRouter} from "vue-router";
import {register} from "../services/user.ts";

const router = useRouter();
const route = useRoute();
const active = ref('login');

const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const onSubmit = async () => {
  if (active.value === 'login') {
    await getLogin()
  } else {
    await getRegister()
  }
};
const getLogin = async () => {
  const res = await Axios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  })
  if (res.code === 0 && res.data) {
    showSuccessToast('登录成功');
    await router.replace('/');
  } else {
    showFailToast('登录失败');
  }
}
const getRegister = async () => {
  const res = await register({
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value
  })
  if (res.code === 0){
    showSuccessToast('注册成功');
    active.value = 'login'
  }
  else {
    showFailToast('注册失败');
  }
}

</script>

<style scoped>

</style>