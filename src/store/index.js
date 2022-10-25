/*
 * @Date: 2022-08-25 14:13:11
 * @LastEditors: StavinLi 495727881@qq.com
 * @LastEditTime: 2022-09-21 14:37:09
 * @FilePath: /Workflow-Vue3/src/store/index.js
 */
import { createStore } from 'vuex'

export default createStore({
  state: {
    tableId: '',
    isTried: false,
    promoterDrawer: false,
    flowPermission1: {},
    approverDrawer: false,
    approverConfig1: {},
    copyerDrawer: false,
    copyerConfig1: {},
    conditionDrawer: false,
    conditionsConfig1: {
      conditionNodes: [],
    },
  },
  mutations: {
    setTableId(status, payload) {
      status.tableId = payload
    },
    setIsTried(status, payload) {
      status.isTried = payload
    },
    setPromoter(status, payload) {
      status.promoterDrawer = payload
    },
    setFlowPermission(status, payload) {
      status.flowPermission1 = payload
    },
    setApprover(status, payload) {
      status.approverDrawer = payload
    },
    setApproverConfig(status, payload) {
      status.approverConfig1 = payload
    },
    setCopyer(status, payload) {
      status.copyerDrawer = payload
    },
    setCopyerConfig(status, payload) {
      status.copyerConfig1 = payload
    },
    setCondition(status, payload) {
      status.conditionDrawer = payload
    },
    setConditionsConfig(status, payload) {
      status.conditionsConfig1 = payload
    },
  },
  actions: {},
  modules: {
  }
})
