<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部项目" name="first"></el-tab-pane>
      <el-tab-pane>
        <el-badge slot="label" :value="12" class="item"> 已提问项目 </el-badge>
      </el-tab-pane>

      <el-tab-pane label="待反馈项目" name="third"></el-tab-pane>
      <el-tab-pane label="已合作项目" name="fourth"></el-tab-pane>
      <el-tab-pane label="未合作项目" name="fourth"></el-tab-pane>
    </el-tabs>
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input
          v-model="query.title"
          clearable
          placeholder="标题"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
        <el-input
          v-model="query.createBy"
          clearable
          placeholder="创建人"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
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
      width="38%"
    >
      <Send ref="send" @closeDia="closeDia" />
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="closeDia">取消</el-button>
        <el-button
          :loading="crud.status.cu === 2"
          type="primary"
          @click="testConnectServer"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="closeModify"
      :visible.sync="modifyFlag"
      title="项目修改"
      width="38%"
    >
      <Edit ref="edit" :selectItem="selectItem" @closeDia="closeModify" />
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="closeModify">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="editSubmit"
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
      <el-table-column prop="projectId" label="项目编号" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="createBy" label="创建人" />
      <el-table-column
        v-if="checkPer(['admin', 'project:edit', 'project:del'])"
        label="操作"
        width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="editItem(scope.row)"
            icon="el-icon-edit"
            circle
          ></el-button>
          <upOperaation
            style="float: right; margin-left: -38px"
            :data="scope.row"
            :permission="permission"
          />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import crudServer from "@/api/project";
import { validateIP } from "@/utils/validate";
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/PROJECT.operation";
import upOperaation from "@crud/PR.operation";
import pagination from "@crud/Pagination";
import DateRangePicker from "@/components/DateRangePicker";
import { queryDetail } from "@/api/project";
import Send from "./send";
import Edit from "./edit";
console.log(crudServer);
const defaultForm = {
  id: null,
  name: null,
  ip: null,
  port: 22,
  account: "root",
  password: null,
};
export default {
  name: "Server",
  components: {
    pagination,
    crudOperation,
    rrOperation,
    DateRangePicker,
    upOperaation,
    Send,
    Edit,
  },
  cruds() {
    return CRUD({
      title: "项目",
      url: "api/projectInfo",
      crudMethod: { ...crudServer },
     
      sort: ["project_id,desc"],
      idField: "project_id",
    });
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],

  data() {
    return {
      accountList: [],
      accountMap: {},
      loading: false,
      activeName: "first",
      modifyFlag: false,
      selectItem: null,
      permission: {
        add: ["admin", "projectInfo:add"],
        edit: ["admin", "projectInfo:edit"],
        del: ["admin", "projectInfo:del"],
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        ip: [
          { required: true, message: "请输入IP", trigger: "blur" },
          { validator: validateIP, trigger: "change" },
        ],
        port: [
          { required: true, message: "请输入端口", trigger: "blur", type: "number" },
        ],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    testConnectServer() {
      this.$refs["send"].doSubmit();
    },
    editSubmit() {
      this.$refs["edit"].doSubmit();
    },
    closeDia() {
      this.crud.cancelCU();
      this.crud.toQuery();
    },
    closeModify() {
      this.modifyFlag = false;
    },
    editItem(item) {
      this.modifyFlag = true;
      const _this = this;
      setTimeout(() => {
        _this.$refs["edit"].initPage(item);
      }, 100);
    },
  },
  mounted() {
    console.log(this.crud);
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
