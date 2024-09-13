<template>
  <div class="teamAdd">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="updateTeamData.name"
            name="name"
            label="队伍名称"
            placeholder="请输入队伍名称"
            :rules="[{ required: true, message: '请填写队伍名称' }]"
        />
        <van-field name="uploader" label="图片上传">
          <template #input>
            <van-uploader v-model="fileList" :max-size="1024 * 1024" :max-count="1" :after-read="afterRead" reupload @oversize="onOversize"/>
          </template>
        </van-field>
        <van-field
            v-model="updateTeamData.description"
            rows="1"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            v-model="updateTeamData.expireTime"
            is-link
            readonly
            name="datetimePicker"
            label="过期时间"
            placeholder="点击选择时间"
            @click="showPicker = true"

        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              @confirm="onConfirm"
              @cancel="showPicker = false"
              :min-date="minDate"
          />
        </van-popup>
        <van-popup v-model:show="flag" position="bottom">
          <van-time-picker
              v-model="currentTime"
              title="选择时间"
              @cancel="flag = false"
              @confirm="isTime"
              :columns-type="columnsType"
          />
        </van-popup>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="updateTeamData.status" direction="horizontal">
              <van-radio name='0'>公开</van-radio>
              <van-radio name='1'>私有</van-radio>
              <van-radio name='2'>加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="updateTeamData.status === '2'"
            v-model="updateTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填密码' }]"
        />

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getTeamById, teamUpdate} from "../services/team.ts";
import router from "../config/router.ts";
import {showFailToast, showSuccessToast, showToast} from "vant";
import {useRoute} from "vue-router";
import {upload} from "../services/file.ts";

const route = useRoute()

const id = route.query.id;
const fileList = ref([]);
//获取队伍信息
const updateTeamData = ref({})
onMounted(async () => {
  if (id <= 0) {
    showFailToast('加载失败请重试');
    return;
  }
  const res = await getTeamById({
    params: {
      id,
    }
  });
  if (res.code === 0) {
    updateTeamData.value = res.data
    fileList.value[0] = {url: `${updateTeamData.value.avatarUrl}`}
  } else {
    showFailToast('加载失败请重试');
  }
})

//图片上传
const afterRead = async (userAvatar: any) => {
  const formData = new FormData()
  formData.append('file', userAvatar.file)
  const res = await upload(formData)
  if (res.code === 0){
    updateTeamData.value.avatarUrl = res.data.url
    fileList.value[0] = res.data
  }
}

const onOversize = (file:any) => {
  showToast('文件大小不能超过  1M');
};

//时间选择
const flag = ref(false);
const columnsType = ['hour', 'minute', 'second'];
const currentTime = ref();

//转时间
function getDate() {
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second = date.getSeconds();
  second = second < 10 ? ('0' + second) : second;
  var data = [y, m, d, h, minute, second]
  return data;

}

const date = getDate();
updateTeamData.value.expireTime = date[0] + '-' + date[1] + '-' + date[2] + ' ' + date[3] + ':' + date[4] + ':' + date[5];
const minDate = new Date(date[0], date[1], date[2])

const showPicker = ref(false);
const onConfirm = ({selectedValues}) => {
  updateTeamData.value.expireTime = selectedValues.join('-');
  flag.value = true
  showPicker.value = false;
};

const isTime = ({selectedValues}) => {
  const olddate = updateTeamData.value.expireTime
  updateTeamData.value.expireTime = updateTeamData.value.expireTime + ' ' + selectedValues.join(':')
  flag.value = false
}

const onSubmit = async () => {
  const res = await teamUpdate(updateTeamData.value)
  if (res.code === 0 && res.data) {
    showSuccessToast('更新成功');
    await router.push({
      path: '/team',
      replace: true
    })
  } else {
    showFailToast('修改失败');
  }
}


</script>


<style scoped>

</style>