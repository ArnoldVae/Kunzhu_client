<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      style="margin-top: 6px"
      size="small"
      label-width="100px"
    >
      <el-form-item label="项目标题" prop="title">
        <el-input v-model="form.title" style="width: 646px" />
      </el-form-item>
      <el-form-item label="项目周期" prop="title">
        <date-range-picker v-model="form.createTime" class="date-item" />
      </el-form-item>

      <el-form-item label="项目内容"> </el-form-item>

      <div ref="editor" class="editor" />
    </el-form>
  </div>
</template>

<script>
import { edit } from "@/api/project";
import { upload } from "@/utils/upload";
import { mapGetters } from "vuex";
import DateRangePicker from "@/components/DateRangePicker";
import E from "wangeditor";
export default {
  name: "add",
  components: {
    DateRangePicker,
  },
  props: {
    selectItem: {
      type: [Object],
    },
  },
  data() {
    return {
      loading: false,
      form: { title: "", content: "", createTime: "" },
      rules: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["imagesUploadApi"]),
  },
  mounted() {
    const _this = this;
    var editor = new E(this.$refs.editor);
    // 自定义菜单配置
    editor.customConfig.zIndex = 10;
    // 文件上传
    editor.customConfig.customUploadImg = function (files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      files.forEach((image) => {
        files.forEach((image) => {
          upload(_this.imagesUploadApi, image).then((data) => {
            insert(data.data.url);
          });
        });
      });
    };
    editor.customConfig.onchange = (html) => {
      this.form.content = html;
    };
    editor.create();
  },
  methods: {
    removeDomain(item) {
      var index = this.tos.indexOf(item);
      if (index !== -1 && this.tos.length !== 1) {
        this.tos.splice(index, 1);
      } else {
        this.$message({
          message: "请至少保留一位联系人",
          type: "warning",
        });
      }
    },
    addDomain() {
      this.tos.push({
        value: "",
        key: Date.now(),
      });
    },
    initPage(item) {
      this.form = item;
      this.form.createTime = [item.startTime, item.endTime];
      var editor = new E(this.$refs.editor);
      editor.customConfig.zIndex = 10;
      // 文件上传
      editor.customConfig.customUploadImg = function (files, insert) {
        // files 是 input 中选中的文件列表
        // insert 是获取图片 url 后，插入到编辑器的方法
        files.forEach((image) => {
          files.forEach((image) => {
            upload(_this.imagesUploadApi, image).then((data) => {
              insert(data.data.url);
            });
          });
        });
      };
      editor.customConfig.onchange = (html) => {
        this.form.content = html;
      };
      editor.create();
      editor.txt.html(item.content);
    },
    doSubmit() {
      const _this = this;
      console.log(this.form);
      this.$refs["form"].validate((valid) => {
        this.form.tos = [];
        if (valid) {
          this.loading = true;
          edit(this.form)
            .then((res) => {
              this.$notify({
                title: "修改成功",
                type: "success",
                duration: 2500,
              });
              this.loading = false;
              (this.form = { title: "", content: "", createTime: "" }),
                this.$emit("closeDia");
            })
            .catch((err) => {
              this.loading = false;
              console.log(err.response.data.message);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.editor {
  text-align: left;
  margin: 20px;
  width: 730px;
}
::v-deep .w-e-text-container {
  height: 360px !important;
}
</style>
