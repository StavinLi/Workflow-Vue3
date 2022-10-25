<!--
 * @Date: 2022-08-25 14:05:59
 * @LastEditors: StavinLi 495727881@qq.com
 * @LastEditTime: 2022-09-21 14:36:45
 * @FilePath: /Workflow-Vue3/src/components/drawer/copyerDrawer.vue
-->
<template>
    <el-drawer :append-to-body="true" title="抄送人设置" v-model="visible" direction="rtl" custom-class="set_copyer" size="550px" :before-close="saveCopyer"> 
        <div class="demo-drawer__content">
            <div class="copyer_content drawer_content">
                <el-button type="primary" @click="addCopyer">添加成员</el-button>
                <p class="selected_list">
                    <span v-for="(item,index) in copyerConfig.nodeUserList" :key="index">{{item.name}}
                        <img src="@/assets/images/add-close1.png" @click="$func.removeEle(copyerConfig.nodeUserList,item,'targetId')">
                    </span>
                    <a v-if="copyerConfig.nodeUserList&&copyerConfig.nodeUserList.length!=0" @click="copyerConfig.nodeUserList=[]">清除</a>
                </p>
                <el-checkbox-group v-model="ccSelfSelectFlag" class="clear">
                    <el-checkbox :label="1">允许发起人自选抄送人</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="demo-drawer__footer clear">
                <el-button type="primary" @click="saveCopyer">确 定</el-button>
                <el-button @click="closeDrawer">取 消</el-button>
            </div>
            <employees-role-dialog 
                v-model:visible="copyerVisible"
                v-model:data="checkedList"
                @change="sureCopyer"
            />
        </div>
    </el-drawer>
</template>
<script setup>
import employeesRoleDialog from '../dialog/employeesRoleDialog.vue'
import $func from '@/plugins/preload'
import { mapState, mapMutations } from '@/plugins/lib.js'
import { ref, watch, computed } from 'vue'
let copyerConfig = ref({})
let ccSelfSelectFlag = ref([])
let copyerVisible = ref(false)
let checkedList = ref([])
let { copyerDrawer, copyerConfig1 } = mapState()
let visible = computed({
    get() {
        return copyerDrawer.value
    },
    set() {
        closeDrawer()
    }
})
let { setCopyerConfig, setCopyer } = mapMutations()
watch(copyerConfig1, (val) => {
    copyerConfig.value = val.value;
    ccSelfSelectFlag.value = copyerConfig.value.ccSelfSelectFlag == 0 ? [] : [copyerConfig.value.ccSelfSelectFlag]
})

const addCopyer = () => {
    copyerVisible.value = true;
    checkedList.value = copyerConfig.value.nodeUserList
}
const sureCopyer = (data) => {
    copyerConfig.value.nodeUserList = data;
    copyerVisible.value = false;
}
const saveCopyer = () => {
    copyerConfig.value.ccSelfSelectFlag = ccSelfSelectFlag.value.length == 0 ? 0 : 1;
    copyerConfig.value.error = !$func.copyerStr(copyerConfig.value);
    setCopyerConfig({
        value: copyerConfig.value,
        flag: true,
        id: copyerConfig1.value.id
    })
    closeDrawer();
}
const closeDrawer = () => {
    setCopyer(false)
}    
</script>

<style lang="less">
.set_copyer {
    .copyer_content {
        padding: 20px 20px 0;

        .el-button {
            margin-bottom: 20px;
        }

        .el-checkbox {
            margin-bottom: 20px;
        }
    }
}
</style>