<template>
  <el-dialog title="选择成员" v-model="visibleDialog" width="600px" append-to-body custom-class="promoter_person">
      <div class="person_body clear">
          <div class="person_tree l">
              <input type="text" placeholder="搜索成员" v-model="searchVal" @input="getDebounceData($event,activeName)">
              <el-tabs v-model="activeName" @tab-change="handleClick">
                  <el-tab-pane label="组织架构" name="1"></el-tab-pane>
                  <el-tab-pane label="角色列表" name="2"></el-tab-pane>
              </el-tabs>
              <p class="ellipsis tree_nav" v-if="activeName === '1' && !searchVal">
                  <span @click="getDepartmentList(0)" class="ellipsis">天下</span>
                  <span v-for="(item,index) in departments.titleDepartments" class="ellipsis" 
                  :key="index+'a'" @click="getDepartmentList(item.id)">{{item.departmentName}}</span>   
              </p>
              <selectBox :list="list" style="height: 360px;"/>
          </div>
          <selectResult :total="total" @del="delList" :list="resList"/>
      </div>
      <template #footer>
          <el-button @click="$emit('update:visible',false)">取 消</el-button>
          <el-button type="primary" @click="saveDialog">确 定</el-button>
      </template>
  </el-dialog>
</template>

<script setup>
import selectBox from '../selectBox.vue';
import selectResult from '../selectResult.vue';
import { computed, watch, ref } from 'vue'
import $func from '@/plugins/preload.js'
import { departments, roles, getDebounceData, getRoleList, getDepartmentList, searchVal } from './common'
let props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data:{
    type: Array,
    default: ()=> []
  },
  isDepartment: {
    type: Boolean,
    default: false
  },
});
let emits = defineEmits(['update:visible', 'change'])
let visibleDialog = computed({
  get(){
    return props.visible
  },
  set(){
    closeDialog()
  }
})
let checkedRoleList = ref([])
let checkedEmployessList = ref([])
let checkedDepartmentList = ref([])
let activeName = ref('1')
let list = computed(()=> {
  if(activeName.value === '2'){
    return [{
      type: 'role', 
      not: false,
      data: roles.value, 
      isActiveItem: (item)=> $func.toggleClass(checkedRoleList.value, item, 'roleId'),
      change: (item)=> $func.toChecked(checkedRoleList.value, item, 'roleId')
    }]
  }else{
    return [{
      isDepartment: props.isDepartment,
      type: 'department', 
      data: departments.value.childDepartments, 
      isActive: (item)=> $func.toggleClass(checkedDepartmentList.value, item),
      change: (item)=> $func.toChecked(checkedDepartmentList.value, item),
      next: (item)=> getDepartmentList(item.id)
    },{
      type: 'employee', 
      data: departments.value.employees, 
      isActive: (item)=> $func.toggleClass(checkedEmployessList.value, item),
      change: (item)=> $func.toChecked(checkedEmployessList.value, item),
    }]
  }
})
let resList = computed(()=>{
  let data = [{
    type: 'role', 
    data: checkedRoleList.value, 
    cancel: (item)=> $func.removeEle(checkedRoleList.value, item, 'roleId')
  },{
    type: 'employee', 
    data: checkedEmployessList.value, 
    cancel: (item)=> $func.removeEle(checkedEmployessList.value, item)
  }]
  if(props.isDepartment){
    data.splice(1, 0, {
      type: 'department',
      data: checkedDepartmentList.value,
      cancel: (item)=> $func.removeEle(checkedDepartmentList.value, item)
    })
  }
  return data
})
watch(()=> props.visible, (val)=>{
  if(val){
    activeName.value = "1";
    getDepartmentList();
    searchVal.value = "";
    checkedEmployessList.value = props.data.filter(item=>item.type===1).map(({name,targetId})=>({
      employeeName: name,
      id: targetId
    }));
    checkedRoleList.value = props.data.filter(item=>item.type===2).map(({name,targetId})=>({
      roleName: name,
      roleId: targetId
    }));
    checkedDepartmentList.value = props.data.filter(item=>item.type===3).map(({name,targetId})=>({
      departmentName: name,
      id: targetId
    }));
  }
});
let total = computed(()=> {
  return checkedEmployessList.value.length 
    + checkedRoleList.value.length 
    + checkedDepartmentList.value.length
})

const handleClick = ()=> {
  searchVal.value = "";
  if (activeName.value === '1') {
      getDepartmentList();
  } else {
      getRoleList();
  }
}
const saveDialog = ()=> {
  let checkedList = [
    ...checkedRoleList.value, 
    ...checkedEmployessList.value,
    ...checkedDepartmentList.value
  ].map(item=>({
    type: item.employeeName?1:(item.roleName?2:3),
    targetId: item.id || item.roleId,
    name: item.employeeName || item.roleName || item.departmentName
  }))
  emits('change',checkedList)
}
const delList = ()=> {
  checkedEmployessList.value = [];
  checkedRoleList.value = [];
  checkedDepartmentList.value = [];
}
const closeDialog = ()=> {
  emits('update:visible', false)
}
</script>

<style>
@import "@/css/dialog.css";
</style>