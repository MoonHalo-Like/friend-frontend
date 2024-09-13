<template>
  <div>
    <van-card
        v-for="(team,index) in props.teamList"
        :key="index"
        :desc="team.description"
        :title="team.name"
        :thumb="team.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin: 2px 3px">
          {{ teamStaticEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ '队伍人数：' + team.joinUserNum+'/'+team.maxNum }}
        </div>
      </template>
      <template #footer>
        <van-button size="mini" plain type="primary" @click="showDetail(team)">查看详情</van-button>
      </template>
    </van-card>

    <div class="content" ref="flagtent" v-show="showDetailFlag">
      <van-floating-panel ref="floatingPanelRef">
        <div class="flex-center">
          <van-image
              round
              width="6rem"
              height="6rem"
              :src="selectedTeam.avatarUrl"
          />
        </div>
        <van-cell center title="队伍名称" :value="selectedTeam.name"/>
        <van-cell center title="队伍描述" :value="selectedTeam.description"/>
        <van-cell center title="队伍过期时间" :value="selectedTeam.expireTime"/>
        <van-cell center title="队伍总人数" :value="selectedTeam.joinUserNum"/>
        <van-cell center title="队伍最大人数" :value="selectedTeam.maxNum"/>
        <van-cell center title="队伍状态" :value="teamStaticEnum[selectedTeam.status]"/>
        <van-cell center title="队伍创建时间" :value="selectedTeam.createTime"/>
        <van-button
            v-if="flag"
            type="primary"
            block @click="()=>{
              if(selectedTeam.status===0){
                 doJoinTeam(selectedTeam.id)
              }else {
                 showPasswordDialog = true;
              }
            }"
        >
          加入队伍
        </van-button>
        <van-button v-if="selectedTeam.userId == currentUser?.id" type="primary" block
                    @click="doUpdateTeam(selectedTeam.id)">
          更新队伍
        </van-button>
        <van-button v-if="!flag" type="primary" block
                    @click="doQuitTeam(selectedTeam.id)">
          退出队伍
        </van-button>
        <van-button v-if="selectedTeam.userId == currentUser?.id" type="primary" block
                    @click="doDeleteTeam(selectedTeam.id)">
          解散队伍
        </van-button>
      </van-floating-panel>

      <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam(selectedTeam.id,password)" @cancel="doClear">
        <van-field v-model="password" placeholder="请输入密码"  type="password"/>
      </van-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStaticEnum} from "../constamts/team.ts";
import {ref, onUnmounted, watch, onMounted} from 'vue';
import {jointeam, teamDelete, teamQuit} from "../services/team.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import router from "../config/router.ts";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  //@ts-ignore
  teamList: [],
})
//获取当前用户
const currentUser = ref();
onMounted(async () => {
  const res = await getCurrentUser();
  currentUser.value = res?.data;
})

//查看详细弹窗
const showDetailFlag = ref(false);
const flagtent = ref(null);
const checkClick = (event) => {
  const dom = flagtent.value;
  if (!dom.contains(event.target)) {
    // 不在菜单范围，隐藏即可
    if (showDetailFlag.value) {
      showDetailFlag.value = false;
      document.removeEventListener('click', checkClick);
    }
  }
}

watch(
    () => showDetailFlag.value,
    (n) => {
      if (n) {
        setTimeout(() => {
          document.addEventListener('click', checkClick);
        }, 0);
      } else {
        document.removeEventListener('click', checkClick);
      }
    },
);
onUnmounted(() => {
  document.removeEventListener('click', checkClick);
});
//数据传递
//队伍信息
const selectedTeam = ref({});
const floatingPanelRef = ref(null);
const userVOList = ref([])
const flag = ref(true)

const showDetail = (team:any) => {
  selectedTeam.value = team;
  showDetailFlag.value = true;
  userVOList.value = selectedTeam.value.userVOList
  //判断是否展示
  userVOList.value.forEach(item => {
    if (item.id === currentUser.value.id) {
      flag.value = false
    }
  })
};

//密码输入框
const showPasswordDialog = ref(false);
const password = ref()
//加入队伍
const doJoinTeam = async (teamId: number, password?: string) => {
  const res = await jointeam({teamId, password});
  if (res.code == 0) {
    showSuccessToast('加入队伍成功');
    window.location.reload();
  } else {
    showFailToast('加入队伍失败' + res.description ? `${res.description}` : '');
    doClear()
  }
}
const doClear = () =>{
  password.value = ''
}
//更新队伍
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    },
    replace: true
  })
}
//退出队伍
const doQuitTeam = async (teamId: number) => {
  const res = await teamQuit({
    teamId
  })
  if (res.code == 0) {
    showSuccessToast('退出队伍成功');
    window.location.reload();
  } else {
    showFailToast('退出队伍成功');
  }
}

//解散队伍
const doDeleteTeam = async (teamId: number) => {
  const res = await teamDelete({
    teamId
  })
  if (res.code == 0) {
    showSuccessToast('解散队伍成功');
    window.location.reload();
  } else {
    showFailToast('解散队伍成功');
  }
}


</script>


<style scoped>
.flex-center {
  display: flex;
  justify-content: center; /* 水平居中 */
}
</style>