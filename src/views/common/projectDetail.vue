<template>
  <div class="detail_main">
    <div class="title">
      <span style="font-size: 24px">{{ projectInfo.title }}</span>
      <span style="float: right; margin-right: 20px; font-size: 16px">
        <span style="margin-right: 20px">提交人:{{ projectInfo.createBy }}</span>
        <span>提交时间:{{ projectInfo.createTime }}</span>
      </span>
    </div>
    <hr style="border: 0.5px solid #ccc; width: 96%">
    <div class="content">
      <p v-html="projectInfo.content" />
    </div>
    <hr style="border: 0.5px solid #ccc; width: 96%">
    <div class="flooter">
      <span v-if="projectInfo.attachments.length>0" style="font-size: 16px">相关附件：</span>
      <span
        v-for="a in projectInfo.attachments"
        :key="a.projectAttachmentId"
        style="margin: 16px"
      >
        {{ a.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  components: {},

  data() {
    return {
      projectInfo: {
        attachments:[]
      }
    }
  },

  computed: {},
  mounted() {},
  methods: {
    initEditPage(item) {
      if (item.content.indexOf('table') > -1) {
        item.content = item.content.replace(/border="0"/, "border='1'")
      }
      this.projectInfo = item
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail_main {
  border: 1px solid #ccc;
  .title {
    height: 45px;
    margin-left: 20px;
    line-height: 45px;
  }
  .content {
    padding: 16px;
    min-height: 300px;
    table{
      border: 1px soold #666666;
    }
  }
  .flooter {
    padding: 20px;
  }
}
::v-deep .w-e-text-container {
  height: 360px !important;
}
</style>
