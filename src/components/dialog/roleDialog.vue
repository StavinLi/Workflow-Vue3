<!--
 * @Date: 2022-08-25 14:05:59
 * @LastEditors: StavinLi 495727881@qq.com
 * @LastEditTime: 2022-09-21 14:35:49
 * @FilePath: /Workflow-Vue3/src/components/dialog/roleDialog.vue
-->
<template>
   <el-dialog title="选择角色" v-model="visibleDialog" width="600px" append-to-body custom-class="promoter_person">
      <div class="person_body clear">
          <div class="person_tree l">
              <input type="text" placeholder="搜索角色" v-model="searchVal" @input="getDebounceData($event,2)">
              <selectBox :list="list" />
          </div>
          <selectResult :total="total" @del="delList" :list="resList"/>
      </div>
      <template #footer>
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="saveDialog">确 定</el-button>
      </template>
  </el-dialog>
</template>
<script setup>
import selectBox from '../selectBox.vue';
import selectResult from '../selectResult.vue';
import { computed, watch, ref } from 'vue'
import $func from '@/plugins/preload.js'
import { roles, getDebounceData, getRoleList, searchVal } from './common'
let props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default: () => []
  }
});
let checkedRoleList = ref([])
let emits = defineEmits(['update:visible', 'change'])
let list = computed(() => {
  return [{
    type: 'role',
    not: true,
    data: roles.value,
    isActive: (item) => $func.toggleClass(checkedRoleList.value, item, 'roleId'),
    change: (item) => {
      checkedRoleList.value = [item]
    }
  }]
})
let resList = computed(() => {
  return [{
    type: 'role',
    data: checkedRoleList.value,
    cancel: (item) => $func.removeEle(checkedRoleList.value, item, 'roleId')
  }]
})
let visibleDialog = computed({
  get() {
    return props.visible
  },
  set(val) {
    closeDialog()
  }
})
watch(() => props.visible, (val) => {
  if (val) {
    getRoleList();
    searchVal.value = "";
    checkedRoleList.value = props.data.map(({ name, targetId }) => ({
      roleName: name,
      roleId: targetId
    }));
  }
})
let total = computed(() => checkedRoleList.value.length)
const saveDialog = () => {
  let checkedList = checkedRoleList.value.map(item => ({
    type: 2,
    targetId: item.roleId,
    name: item.roleName
  }))
  emits('change', checkedList)
}
const delList = () => {
  checkedRoleList.value = [];
}

const closeDialog = () => {
  emits('update:visible', false)
}
</script>

<style>
@import "@/css/dialog.css";
</style>