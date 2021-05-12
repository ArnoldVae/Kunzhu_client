<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input
          v-model="query.id"
          clearable
          placeholder="输入合作方名称"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
        <date-range-picker v-model="query.createTime" class="date-item" />
        <rrOperation />
      </div>
      <crudOperation :permission="permission" />
    </div>
    <!--表单组件-->
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      :title="crud.status.title"
      width="640px"
    >
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="名称" prop="username">
          <el-input v-model="form.username" style="width: 500px" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="form.realName" style="width: 500px" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="form.phone" style="width: 500px" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" style="width: 500px" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select style="width: 500px" v-model="form.gender" placeholder="请选择">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合作关系" prop="currentType">
          <el-radio-group v-model="form.currentType">
            <el-radio :label="'1'">合作方</el-radio>
            <el-radio :label="'2'">客户</el-radio>
            <el-radio :label="'3'">合作方/客户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            style="width: 500px"
            v-model="form.remark"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="userNo" label="用户编号" />
      <el-table-column prop="username" label="名称" />
      <el-table-column prop="realName" label="真实姓名" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="email" label="电子邮箱" />
      <el-table-column prop="currentType" label="合作关系">
        <template slot-scope="scope">
          <span v-if="scope.row.currentType === '1'">合作方</span>
          <span v-if="scope.row.currentType === '2'">客户</span>
          <span v-if="scope.row.currentType === '3'">合作方/客户</span>
        </template>
      </el-table-column>

      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="enabled" label="禁用状态">
        <template slot-scope="scope">
          <span v-if="scope.row.enabled">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>

      <el-table-column
        v-if="checkPer(['admin', 'serverDeploy:edit', 'serverDeploy:del'])"
        label="操作"
        width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <udOperation :data="scope.row" :permission="permission" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import crudServer from "@/api/partner";
import { testServerConnect } from "@/api/mnt/connect";
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
import pagination from "@crud/Pagination";
import DateRangePicker from "@/components/DateRangePicker";
const defaultForm = {
  username: null,
  realName: null,
  email: null,
  phone: null,
  gender: null,
};
export default {
  name: "Server",
  components: { pagination, crudOperation, rrOperation, udOperation, DateRangePicker },
  cruds() {
    return CRUD({
      title: "合作方",
      url: "api/projectPartner",
      crudMethod: { ...crudServer },
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      accountList: [],
      accountMap: {},
      loading: false,
      genderOptions: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        },
      ],
      permission: {
        add: ["admin", "projectPartner:add"],
        edit: ["admin", "projectPartner:edit"],
        del: ["admin", "projectPartner:del"],
      },
      rules: {
        username: [{ required: true, message: "请输入名称", trigger: "blur" }],
        realName: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur", type: "number" },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输选择性别", trigger: "blur" }],
        currentType: [{ required: true, message: "请选择", trigger: "blur" }],
        gender: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },
  methods: {
    testConnectServer() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          testServerConnect(this.form)
            .then((res) => {
              this.loading = false;
              this.$notify({
                title: res ? "连接成功" : "连接失败",
                type: res ? "success" : "error",
                duration: 2500,
              });
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
