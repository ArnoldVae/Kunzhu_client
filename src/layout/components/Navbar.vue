<template>
  <div class="navbar" :class="$store.getters.currentUserType === '1' ? 'bg_red' : 'bg_blue'">
    <div class="right-menu">
      <div class="my_roles">
        <el-button v-if="$store.getters.userType === '3'" @click="changeRole" plain size="small">切换身份</el-button>
        <span v-if="$store.getters.currentUserType === '2'" style="color: #fff">合作方：{{ $store.getters.user.username
          }}</span>
        <span v-if="$store.getters.currentUserType === '1'" style="color: #fff">客户：{{ $store.getters.user.username
          }}</span><span class="logout" @click="open">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import Breadcrumb from "@/components/Breadcrumb";
  import Hamburger from "@/components/Hamburger";
  import Doc from "@/components/Doc";
  import Screenfull from "@/components/Screenfull";
  import SizeSelect from "@/components/SizeSelect";
  import Search from "@/components/HeaderSearch";
  import Avatar from "@/assets/images/avatar.png";
  import {
    changeUserRole
  } from "@/api/home";
  export default {
    components: {
      Breadcrumb,
      Hamburger,
      Screenfull,
      SizeSelect,
      Search,
      Doc,
    },
    data() {
      return {
        Avatar: Avatar,
        dialogVisible: false,
      };
    },
    computed: {
      ...mapGetters(["sidebar", "device", "user", "baseApi"]),
      show: {
        get() {
          return this.$store.state.settings.showSettings;
        },
        set(val) {
          this.$store.dispatch("settings/changeSetting", {
            key: "showSettings",
            value: val,
          });
        },
      },
    },
    mounted() {
      console.log(this.$store.getters);
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("app/toggleSideBar");
      },
      changeRole() {
        // const target =;
        changeUserRole(this.$store.getters.user.id).then(res => {
          this.$store.dispatch(
            "setCurrentUserType",
            this.$store.getters.currentUserType === "1" ? "2" : "1"
          );
        })

      },
      open() {
        this.$confirm("确定注销并退出系统吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.logout();
        });
      },
      logout() {
        this.$store.dispatch("LogOut").then(() => {
          location.reload();
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .bg_red {
    background: rgb(249, 81, 81);
  }

  .logout {
    cursor: pointer;
    margin-left: 20px;
    color: #fff;
  }

  .bg_blue {
    background: #409eff;
  }

  .navbar {
    height: 100px;
    overflow: hidden;
    position: relative;

    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    padding: 27px;

    .hamburger-container {
      line-height: 100px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;
      position: relative;

      .my_roles {}

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>