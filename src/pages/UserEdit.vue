<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <!--性别-->
      <van-field
          v-if="editUser.editKey === 'gender'"
          v-model="sex"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
      <!--图片-->
      <van-field v-else-if="editUser.editKey === 'avatarUrl'" name="uploader" label="图片上传">
        <template #input>
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" :max-size="1024 * 1024" reupload
                        @oversize="onOversize"/>
        </template>
      </van-field>
      <div v-else-if="editUser.editKey === 'tags'">
        <van-divider>我的标签</van-divider>
        <van-tag v-for="tag in tags" closeable size="medium" type="primary" @close="close(tag)"
                 style="margin: 5px 5px">
          {{ tag }}
        </van-tag>
        <van-divider>选择标签</van-divider>
        <van-tag v-for="tag in TagList" size="medium" type="primary"
                 style="margin: 5px 5px" @click="addTag(tag.text)">
          {{ tag.text }}
        </van-tag>
      </div>
      <van-field
          v-else
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <!--    添加标签-->
      <van-cell center title="添加标签">
        <template #right-icon>
          <van-switch v-model="checked" @click="onChecked"/>
        </template>
      </van-cell>
      <van-button v-if="!checked" round type="primary" block native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <div v-if="checked" style="margin: 16px;">
    <van-field
        v-model="result.text"
        is-link
        readonly
        name="parentTag"
        label="标签分类"
        placeholder="选择标签分类"
        @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
          :columns-field-names="customFieldName"
      />
    </van-popup>
    <van-field v-model="tagName" label="标签名称" placeholder="请输入标签名称"
               :rules="[{ required: true, message: '请填写标签名称' }]"/>

    <van-button round type="primary" block native-type="submit" @click="AddTags">
      添加标签
    </van-button>
  </div>
</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {showFailToast, showSuccessToast, showToast} from 'vant';
import {getCurrentUserState} from "../states/user.ts";
import {updateUser} from "../services/user.ts"
import {userGenderEnum} from "../constamts/user.ts";
import {upload} from "../services/file.ts";
import {AddTag, getTag} from "../services/tag.ts";


const route = useRoute();
const router = useRouter();
const sex = ref()
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,  // 对参数进行解码
  currentValue: route.query.currentValue // 对参数进行解码
})
sex.value = userGenderEnum[editUser.value.currentValue]
const onSubmit = async () => {
  if (editUser.value.editKey === 'gender') {
    editUser.value.currentValue = getValuebyKet(sex.value);
  }
  if (editUser.value.editKey === 'tags') {
    editUser.value.currentValue = JSON.stringify(tags.value)
  }

  const res = await updateUser({
    'id': getCurrentUserState().data.id,
    [editUser.value.editKey as string]: editUser.value.currentValue
  })
  if (res.code === 0 && res.data) {
    showSuccessToast('修改成功');
    router.back();
  } else {
    showFailToast('修改失败');
  }
};

const getValuebyKet = (sex: any) => {
  for (const [key, val] of Object.entries(userGenderEnum)) {
    if (val === sex) {
      return key;
    }
  }
  return null;
}

//图片上传
const fileList = ref([{url: `${editUser.value.currentValue}`}]);
const afterRead = async (userAvatar: any) => {
  const formData = new FormData()
  formData.append('file', userAvatar.file)
  const res = await upload(formData)
  if (res.code === 0) {
    editUser.value.currentValue = res.data.url
    fileList.value[0] = res.data
  }
}
const onOversize = (file: any) => {
  showToast('文件大小不能超过  1M');
};


//标签
const tags = ref([]);
let obj = '';
if (editUser.value.editKey === 'tags'){
  obj = JSON.parse(editUser.value.currentValue)
}
for (let i in obj) {
  tags.value.push(obj [i])
}

const close = (tag: any) => {
  tags.value = tags.value.filter(item => {
    return item != tag
  })
};
//获取标签
const TagList = ref([]);
const getTagList = async () => {
  const res = await getTag()
  if (res.code === 0) {
    const tempTL = res.data
    tempTL.forEach((parentTag: any) => {
      if (parentTag.children !== null) {
        parentTag.children.forEach((tag: any) => {
          TagList.value.push(tag)
        })
      }
    })
  } else {
    showFailToast("获取标签失败");
  }
}
getTagList()

const addTag = (tag: any) => {
  if (tags.value.indexOf(tag) == -1) {
    tags.value.push(tag)
  }
}
//todo: 添加标签
const result = ref([]);
const showPicker = ref(false);
const checked = ref(false)
const columns = ref([])
const tagName = ref('')
const customFieldName = {
  text: 'text',
  value: 'id',
  children: 'children',
};
const getTaglist = async () => {
  const res = await getTag()
  if (res.code === 0) {
    columns.value = res.data.map(item => {
      item.children = null
      return item
    })
  } else {
    showFailToast("获取标签失败")
  }
}


const onConfirm = ({selectedOptions}) => {
  result.value = selectedOptions[0];
  showPicker.value = false;
};

const onChecked = () => {
  !checked.value
  getTaglist()
}

const AddTags = async () => {
  if (tagName.value === '') {
    showFailToast("请输入标签名称")
    return;
  }
  tags.value.push(tagName.value)
  const res = await AddTag({
    "isParent": 0,
    "parentId": result.value.id,
    "tagName": tagName.value,
  })
  if (res.code === 0) {
    showSuccessToast("添加成功")
    await onSubmit();
  } else {
    showFailToast("添加失败")
  }
}
</script>

<style scoped>

</style>