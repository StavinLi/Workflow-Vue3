/*
 * @Date: 2022-08-25 15:35:18
 * @LastEditors: StavinLi 495727881@qq.com
 * @LastEditTime: 2022-09-21 14:37:04
 * @FilePath: /Workflow-Vue3/src/plugins/lib.js
 */
import { computed } from 'vue'
import { useStore } from 'vuex'

const mapState = () => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store.state).map(
      key => [key, computed(() => store.state[key])]
    )
  )
}

const mapGetters = () => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store.getters).map(
      getter => [getter, computed(() => store.getters[getter])]
    )
  )
}

const mapMutations = () => {
  const store = useStore()
  return Object.fromEntries(

    Object.keys(store._mutations).map(
      mutation => [mutation, value => store.commit(mutation, value)]
    )
  )
}

const mapActions = () => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store._actions).map(
      action => [action, value => store.dispatch(action, value)]
    )
  )
}

export { mapState, mapGetters, mapMutations, mapActions }