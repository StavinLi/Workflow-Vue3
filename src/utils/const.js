/*
 * @Date: 2023-03-29 15:25:37
 * @LastEditors: StavinLi 495727881@qq.com
 * @LastEditTime: 2023-03-29 15:52:38
 * @FilePath: /Workflow-Vue3/src/utils/const.js
 */

export let bgColors = ['87, 106, 149', '255, 148, 62', '50, 150, 250']
export let placeholderList = ["发起人", "审核人", "抄送人"];

export let setTypes = [
  {value: 1, label: '指定成员'},
  {value: 2, label: '主管'},
  {value: 4, label: '发起人自选'},
  {value: 5, label: '发起人自己'},
  {value: 7, label: '连续多级主管'},
]

export let selectModes = [
  {value: 1, label: '选一个人'},
  {value: 2, label: '选多个人'},
]

export let selectRanges = [
  {value: 1, label: '全公司'},
  {value: 2, label: '指定成员'},
  {value: 3, label: '指定角色'},
]

export let optTypes = [
  {value: '1', label: '小于'},
  {value: '2', label: '大于'},
  {value: '3', label: '小于等于'},
  {value: '4', label: '等于'},
  {value: '5', label: '大于等于'},
  {value: '6', label: '介于两个数之间'},
]

export let opt1s = [
  {value: '<', label: '<'},
  {value: '≤', label: '≤'},
]
