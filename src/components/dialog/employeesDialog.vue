<template>
   <el-dialog title="选择成员" v-model="visibleDialog" width="600px" append-to-body custom-class="promoter_person">
      <div class="person_body clear">
          <div class="person_tree l">
              <input type="text" placeholder="搜索成员" v-model="searchVal" @input="getDebounceData($event)">
              <p class="ellipsis tree_nav" v-if="!searchVal">
                  <span @click="getDepartmentList(0)" class="ellipsis">天下</span>
                  <span v-for="(item,index) in departments.titleDepartments" class="ellipsis" 
                  :key="index+'a'" @click="getDepartmentList(item.id)">{{item.departmentName}}</span>   
              </p>
              <selectBox :list="list"/>
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
import { computed, watch, ref } from 'vue';
import { departments, getDebounceData, getDepartmentList, searchVal } from './common'
import $func from '@/plugins/preload.js'
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
});
let checkedDepartmentList = ref([])
let checkedEmployessList = ref([])
let list = computed(()=> {
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
})
let resList = computed(()=>{
  let data = [{
    type: 'employee', 
    data: checkedEmployessList.value, 
    cancel: (item)=> $func.removeEle(checkedEmployessList.value, item)
  }]
  if(props.isDepartment){
    data.unshift({
      type: 'department',
      data: checkedDepartmentList.value,
      cancel: (item)=> $func.removeEle(checkedDepartmentList.value, item)
    })
  }
  return data
})
watch(()=> props.visible, (val)=>{
  if(val){
    getDepartmentList();
    searchVal.value = "";
    checkedEmployessList.value = props.data.filter(item=>item.type===1).map(({name,targetId})=>({
      employeeName: name,
      id: targetId
    }));
    checkedDepartmentList.value = props.data.filter(item=>item.type===3).map(({name,targetId})=>({
      departmentName: name,
      id: targetId
    }));
  }
})

const closeDialog = ()=> {
  emits('update:visible', false)
}

let total = computed(()=> checkedDepartmentList.value.length + checkedEmployessList.value.length)

let saveDialog = ()=> {
  let checkedList = [
    ...checkedDepartmentList.value,
    ...checkedEmployessList.value
  ].map(item=>({
    type: item.employeeName ? 1: 3,
    targetId: item.id,
    name: item.employeeName || item.departmentName
  }))
  emits('change',checkedList)
}
const delList = ()=> {
  checkedDepartmentList.value = [];
  checkedEmployessList.value = []
}
</script>
<style>
@import "@/css/dialog.css";
</style>