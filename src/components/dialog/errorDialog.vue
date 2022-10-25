<!--
 * @Date: 2022-08-25 14:05:59
 * @LastEditors: StavinLi 495727881@qq.com
 * @LastEditTime: 2022-09-21 14:36:40
 * @FilePath: /Workflow-Vue3/src/components/dialog/errorDialog.vue
-->
<template>
  <el-dialog title="提示" v-model="visibleDialog">
    <div class="ant-confirm-body">
      <i class="anticon anticon-close-circle" style="color: #f00;"></i>
      <span class="ant-confirm-title">当前无法发布</span>
      <div class="ant-confirm-content">
        <div>
          <p class="error-modal-desc">以下内容不完善，需进行修改</p>
          <div class="error-modal-list">
            <div class="error-modal-item" v-for="(item,index) in list" :key="index">
              <div class="error-modal-item-label">流程设计</div>
              <div class="error-modal-item-content">{{item.name}} 未选择{{item.type}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button @click="visibleDialog = false">我知道了</el-button>
      <el-button type="primary" @click="visibleDialog = false">前往修改</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'
let props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  visible: {
    type: Boolean,
    default: false
  }
})
let emits = defineEmits(['update:visible'])

let visibleDialog = computed({
  get() {
    return props.visible
  },
  set(val) {
    emits('update:visible', val)
  }
})
</script>

<style scoped>
.ant-confirm-body .ant-confirm-title {
  color: rgba(0, 0, 0, .85);
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  display: block;
  overflow: hidden
}

.ant-confirm-body .ant-confirm-content {
  margin-left: 38px;
  font-size: 14px;
  color: rgba(0, 0, 0, .65);
  margin-top: 8px
}

.ant-confirm-body>.anticon {
  font-size: 22px;
  margin-right: 16px;
  float: left
}
</style>