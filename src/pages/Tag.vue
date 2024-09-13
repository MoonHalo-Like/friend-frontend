<template>
  <van-tabs v-model:active="active" @click-tab="onClickTab">
    <van-tab title="添加标签" name="add">
      <van-form @submit="onSubmit">
        <van-cell center title="父标签">
          <template #right-icon>
            <van-switch v-model="checked" @click="onChecked"/>
          </template>
        </van-cell>
        <van-field
            v-if="checked === false"
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

        <van-field
            v-model="tagName"
            name="tagName"
            label="标签名称"
            placeholder="标签名称"
            :rules="[{ required: true, message: '请填写标签名称' }]"
        />

        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            添加
          </van-button>
        </div>
      </van-form>
    </van-tab>
    <van-tab title="修改标签" name="update">
      <van-form @submit="onSubmit">
        <van-cell center title="子标签">
          <template #right-icon>
            <van-switch v-model="checkedUpdate" @click="onCheckedUpdate"/>
          </template>
        </van-cell>
        <van-field
            v-model="result.text"
            is-link
            readonly
            name="tag"
            label="选择标签"
            placeholder="选择修改标签"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker
              :columns="updateList"
              @confirm="onConfirm"
              @cancel="showPicker = false"
              :columns-field-names="customFieldName"
          />
        </van-popup>
        <div>
          <van-field
              v-if="checkedUpdate === true"
              v-model="resultP.text"
              is-link
              readonly
              name="parentTag"
              label="父标签"
              placeholder="选择修改父标签"
              @click="showP = true"
          />
          <van-popup v-model:show="showP" position="bottom">
            <van-picker
                :columns="UpdatetLP"
                @confirm="onConfirmP"
                @cancel="showPicker = false"
                :columns-field-names="customFieldName"
            />
          </van-popup>
        </div>

        <van-field
            v-model="tagName"
            name="tagName"
            label="标签名称"
            placeholder="标签名称"
            :rules="[{validator, message: '请输入标签名称'}]"
        />
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            修改
          </van-button>
        </div>
      </van-form>
    </van-tab>
    <van-tab title="删除标签" name="delete">
      <van-divider>父标签</van-divider>
      <van-swipe-cell v-for="item in deleteTagList">
        <van-cell :border="false" title="父标签" :value="item.text"/>
        <template #right>
          <van-button square type="danger" text="删除" @click="deleteTags(item)"/>
        </template>
      </van-swipe-cell>
      <van-divider>子标签</van-divider>
      <van-swipe-cell v-for="item in deleteTagChildList">
        <van-cell :border="false" title="子标签" :value="item.text"/>
        <template #right>
          <van-button square type="danger" text="删除" @click="deleteTags(item)"/>
        </template>
      </van-swipe-cell>
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {AddTag, deleteTag, getTag, updateTag} from "../services/tag.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";


const router = useRouter()

const active = ref('add')
const onClickTab = async (name: string) => {
  if (active.value === 'add') {

  } else if (active.value === 'update') {

  } else {

  }
}

//添加标签
const isParent = ref(0)
const checked = ref(false)
const onChecked = () => {
  !checked.value
  if (checked.value) {
    isParent.value = 1;
  } else {
    isParent.value = 0;
  }
}
const tagName = ref()
const customFieldName = {
  text: 'text',
  value: 'id',
  children: 'children',
};

const deleteTagList = ref([])
const deleteTagChildList = ref([])
const updateList = ref([])
const result = ref([]);
const showPicker = ref(false);
let columns = [];
let tagList = [];
const getTagList = async () => {
  const res = await getTag();
  if (res.code === 0) {
    tagList = JSON.parse(JSON.stringify(res.data))
    columns = JSON.parse(JSON.stringify(res.data))
    updateList.value = JSON.parse(JSON.stringify(res.data))
    deleteTagList.value = JSON.parse(JSON.stringify(tagList));
    columns = columns.map(item => {
      item.children = null;
      return item
    })
    updateList.value = updateList.value.map(item => {
      item.children = null;
      return item
    })
    deleteTagList.value.forEach(item => {
      if (item.children !== null) {
        item.children.forEach(tag => {
          deleteTagChildList.value.push(tag)
        })
      }
    })
  } else {
    showFailToast("标签获取失败")
  }
}
getTagList()

const onConfirm = ({selectedOptions}) => {
  result.value = selectedOptions[0];
  showPicker.value = false;
};
const addtag = async (values) => {
  const temp = tagList.filter(item => {
    return item.text === values.parentTag
  })
  let res;
  if (isParent.value === 1) {
    res = await AddTag({
      "isParent": isParent.value,
      "parentId": 0,
      "tagName": tagName.value,
    })
  } else {
    res = await AddTag({
      "isParent": isParent.value,
      "parentId": temp[0].id,
      "tagName": tagName.value,
    })
  }
  if (res.code === 0) {
    showSuccessToast("添加成功")
    await router.push('/user')
  } else {
    showFailToast("添加失败")
  }
}

//修改标签
const validator = (val) => {
  if (!checkedUpdate.value && val === '') {
    return false;
  }
}
const showP = ref(false);
const UpdatetLP = ref([])
const checkedUpdate = ref(false)
const resultP = ref([]);

const onConfirmP = ({selectedOptions}) => {
  resultP.value = selectedOptions[0];
  showP.value = false;
};

const onCheckedUpdate = () => {
  !checkedUpdate.value
  UpdatetL(checkedUpdate.value)
}

const UpdatetL = (vlaue: Boolean) => {
  const temp = JSON.parse(JSON.stringify(tagList))
  UpdatetLP.value = JSON.parse(JSON.stringify(tagList))
  updateList.value = []
  if (!vlaue) {
    updateList.value = temp.map(item => {
      item.children = null
      return item
    })
  } else {
    UpdatetLP.value = UpdatetLP.value.map(item => {
      item.children = null
      return item
    })
    temp.forEach(item => {
      if (item.children !== null) {
        item.children.forEach(tag => {
          updateList.value.push(tag)
        })
      }
    })
  }
}

const UpdateTag = async (values) => {
  let res;
  if (checkedUpdate.value) {
    //子标签
    const id = result.value.id;
    const parentId = resultP.value.id;
    let tagName = values.tagName;
    if (tagName === '') {
      tagName = null;
    }
    res = await updateTag({
      "id": id,
      "parentId": parentId,
      "tagName": tagName
    })
  } else {
    //父标签
    res = await updateTag({
      "id": result.value.id,
      "tagName": values.tagName
    })
  }

  if (res.code === 0) {
    showSuccessToast("修改成功")
    await router.push('/user')
  } else {
    showFailToast("修改失败")
  }
}


//删除标签
const deleteTags = async (item) => {
  let tagId = item.id;
  if (deleteTagList.value.find(tag => tag.id === tagId)) {
    deleteTagList.value = deleteTagList.value.filter(tag => tag.id !== tagId)
    deleteTagChildList.value = deleteTagChildList.value.filter(tag => tag.parentId !== tagId)
  } else {
    deleteTagChildList.value = deleteTagChildList.value.filter(tag => tag.id !== tagId)
  }
  const res = await deleteTag(tagId)
  if (res.code === 0) {
    showSuccessToast("删除成功")
  } else {
    showFailToast("删除失败")
  }
}

//提交表单
const onSubmit = async (values) => {
  if (active.value === 'add') {
    //添加标签
    await addtag(values)
  } else if (active.value === 'update') {
    //修改标签
    await UpdateTag(values)
  }
};


</script>

<style scoped>

</style>