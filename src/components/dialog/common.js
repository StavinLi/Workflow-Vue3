/*
 * @Date: 2022-08-29 14:00:42
 * @LastEditors: StavinLi 495727881@qq.com
 * @LastEditTime: 2023-03-29 15:53:05
 * @FilePath: /Workflow-Vue3/src/components/dialog/common.js
 */

import { getRoles, getDepartments, getEmployees } from '@/api/index.js'
import $func from '@/utils/index.js'
import { ref } from 'vue'
export let searchVal = ref('')
export let departments = ref({
  titleDepartments: [],
  childDepartments: [],
  employees: [],
})
export let roles = ref({})
export let getRoleList = async () => {
  let { data: { list } } = await getRoles()
  roles.value = list;
}
export let getDepartmentList = async (parentId = 0) => {
  let { data } = await getDepartments({ parentId })
  departments.value = data;
}
export let getDebounceData = (event, type = 1) => {
  $func.debounce(async () => {
    if (event.target.value) {
      let data = {
        searchName: event.target.value,
        pageNum: 1,
        pageSize: 30
      }
      if (type == 1) {
        departments.value.childDepartments = [];
        let res = await getEmployees(data)
        departments.value.employees = res.data.list
      } else {
        let res = await getRoles(data)
        roles.value = res.data.list
      }
    } else {
      type == 1 ? await getDepartmentList() : await getRoleList();
    }
  })()
}