<template>
  <!--  搜索-->
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <!--    已选标签-->
  <van-divider content-position="center">已选标签</van-divider>
  <div v-if="tags.length === 0">请选择标签</div>
  <van-row gutter="10" style="padding: 0 10px">
    <van-col v-for="(tag,index) in tags" :key="index">
      <van-tag closeable size="medium" type="primary" @close="doClose(tag)">
        {{ tag.text }}
      </van-tag>
    </van-col>
  </van-row>

  <!--    选择标签-->
  <van-divider content-position="center">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
      @click-item="onClickItem"
  />

  <div style="margin: 12px">
    <van-button type="primary" @click="doSearchResult()" block>搜索</van-button>
  </div>

</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {getTag} from "../services/tag.ts";
import {showFailToast} from "vant";


const router = useRouter();
// 标签数据
let originTagList = [];
let tagList = ref([])
const children = ref([])
//获取标签列表
const getData = () => {
  const res = getTag();
  res.then(res => {
    originTagList = res.data
    // 赋值
    tagList.value = originTagList;

    for (let item of originTagList) {
      if (!item.children) {
        continue;
      }
      item.children.forEach(tag => {
        children.value.push(tag)
      })
    }
  }).catch(err => {
    showFailToast('加载标签失败，请刷新重试');
  })
}
getData()

//搜索
const searchText = ref('');
/**
 * 搜索过滤
 * @param val
 */
const onSearch = () => {
  tagList.value= originTagList.map(parentTag => {
    if (parentTag.children === null){
      return parentTag;
    }
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag}
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  })
};
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;

};
// 标签选择
const activeIds = ref([]);
const activeIndex = ref(0);
const tags = ref([])

const onClickItem = () => {
  tags.value = []
  activeIds.value.forEach((id: any) => {
    children.value.forEach((item: any) => {
      if (id === item.id) {
        tags.value.push(item)
      }
    })

  })
}

//删除标签
const doClose = (tag: any) => {
  tags.value = tags.value.filter(item => {
    return item !== tag
  })
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag.id
  })
}


const doSearchResult = () => {
  tags.value = tags.value.map(item => item.text)
  router.push({
    path: "/user/list",
    query: {
      tags: tags.value
    }
  })
}


</script>

<style scoped>

</style>