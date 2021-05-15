<template>
  <div class="dashboard-container">
    <el-container>
      <el-aside width="240px">
        <el-menu
          v-if="$store.getters.currentUserType === '2'"
          v-model="isCollapse"
          class="el-menu-vertical-demo"
          :default-openeds="openeds"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
        >
          <el-submenu index="0">
            <template slot="title">
              <el-badge
                v-if="pointMyAll || pointFollow || pointQusetions"
                is-dot
                class="item"
              >
                <span>我的项目</span>
              </el-badge>
              <span v-else>我的项目</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1">
                <el-badge
                  v-if="pointMyAll || pointFollow || pointQusetions"
                  is-dot
                  class="item"
                >
                  <span>全部项目</span>
                </el-badge>
                <span v-else>全部项目</span>
              </el-menu-item>
              <el-menu-item index="2">
                <el-badge v-if="pointQusetions" is-dot class="item">
                  <span>已提问项目</span>
                </el-badge>
                <span v-else>已提问项目</span>
              </el-menu-item>
              <el-menu-item index="3">
                <template slot="title">
                  <el-badge v-if="pointFollow" is-dot class="item">
                    <span>待反馈项目</span>
                  </el-badge>
                  <span v-else>待反馈项目</span>
                </template>
              </el-menu-item>
              <el-menu-item index="4">已合作项目</el-menu-item>
              <el-menu-item index="5">未合作项目</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <span>账户设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="modifyPwd">
                <template slot="title">
                  <span>修改密码</span>
                </template>
              </el-menu-item>
              <el-menu-item index="modifyInfo">个人信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <el-menu
          v-if="$store.getters.currentUserType === '1'"
          v-model="isCollapse"
          class="el-menu-vertical-demo"
          :default-openeds="openeds"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
        >
          <el-submenu index="0">
            <template slot="title">
              <el-badge
                v-if="pointMyAll || pointFollow || pointQusetions"
                is-dot
                class="item"
              >
                <span>我的项目</span>
              </el-badge>
              <span v-else>我的项目</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1">
                <el-badge
                  v-if="pointMyAll || pointFollow || pointQusetions"
                  is-dot
                  class="item"
                >
                  <span>全部项目</span>
                </el-badge>
                <span v-else>全部项目</span>
              </el-menu-item>
              <el-menu-item index="2">
                <el-badge v-if="pointQusetions" is-dot class="item">
                  <span>待审核项目</span>
                </el-badge>
                <span v-else>待审核项目</span>
              </el-menu-item>
              <el-menu-item index="3">
                <template slot="title">
                  <el-badge v-if="pointFollow" is-dot class="item">
                    <span>已发布项目</span>
                  </el-badge>
                  <span v-else>已发布项目</span>
                </template>
              </el-menu-item>
              <el-menu-item index="4">跟踪中项目</el-menu-item>
              <el-menu-item index="5">已结束项目</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <span>账户设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="modifyPwd">
                <template slot="title">
                  <span>修改密码</span>
                </template>
              </el-menu-item>
              <el-menu-item index="modifyInfo">个人信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div v-if="menuTarget === ''">
          <div v-if="projectStep === 1" class="home_content">
            <div style="height: 40px; line-height: 40px">我的项目</div>
            <div v-if="$store.getters.currentUserType === '1'" class="home_content_btn">
              <el-button
                type="danger"
                style="color: #fff; margin-bottom: 10px"
                @click="openAddDia"
              >创建项目</el-button>
            </div>
            <div v-if="$store.getters.currentUserType === '2'" class="content_th">
              <el-row>
                <el-col :span="9"> 项目名称 </el-col>
                <el-col :span="3"> 发布日期 </el-col>
                <el-col :span="3"> 截止日期 </el-col>
                <el-col :span="4"> 参与状态 </el-col>
                <el-col :span="5"> 参与操作 </el-col>
              </el-row>
            </div>
            <div v-if="$store.getters.currentUserType === '1'" class="content_th">
              <el-row>
                <el-col :span="7"> 项目名称 </el-col>
                <el-col :span="3"> 上次修改日期 </el-col>
                <el-col :span="3"> 提交日期 </el-col>
                <el-col :span="5"> 状态 </el-col>
                <el-col :span="6"> 参与操作 </el-col>
              </el-row>
            </div>
            <div v-for="p in projectOptions" :key="p.id" class="content_tr">
              <el-row v-if="$store.getters.currentUserType === '2'">
                <el-col :span="9" class="point">
                  <ul>
                    <li>
                      <span
                        v-if="p.readStatus === '0'"
                        style="font-size: 20px; font-weight: bold"
                        @click="showProDetail(p)"
                      >{{ p.projectTitle }}</span>
                      <span
                        v-if="p.readStatus !== '0'"
                        style="font-size: 20px"
                        @click="showProDetail(p)"
                      >{{ p.projectTitle }}</span>
                      <span
                        v-if="p.status === '1'"
                        style="color: forestgreen"
                      >【进行中】</span>
                      <span
                        v-if="p.status === '2'"
                        style="color: goldenrod"
                      >【跟踪中】</span>
                      <span
                        v-if="p.status === '3' || p.status === '4'"
                        style="color: red"
                      >【已结束】</span>
                      <span v-if="p.status === '3'" style="color: red">
                        <el-tag type="success">合作</el-tag>
                      </span>
                      <span v-if="p.status === '4'">
                        <el-tag type="primary">谢谢参与</el-tag>
                      </span>
                    </li>
                    <li>
                      <span
                        @click="showProDetail(p)"
                      >参考提问{{ p.questionCount }}个/已申请{{ p.applyCount }}人</span>
                    </li>
                  </ul>
                </el-col>
                <el-col :span="3">
                  <span v-if="p.readStatus === '0'" style="font-weight: bold">{{
                    p.createTime
                  }}</span>
                  <span v-if="p.readStatus !== '0'">{{ p.createTime }}</span>
                </el-col>
                <el-col :span="3">
                  <span v-if="p.readStatus === '0'" style="font-weight: bold">{{
                    p.endTime
                  }}</span>
                  <span v-if="p.readStatus !== '0'">{{ p.endTime }}</span>
                </el-col>
                <el-col :span="4" class="point">
                  <ul>
                    <li>
                      <span
                        v-if="p.readStatus === '0'"
                        @click="showProDetail(p)"
                      >未查看</span>
                      <span
                        v-if="p.readStatus === '1'"
                        @click="showProDetail(p)"
                      >已查看</span>
                    </li>
                    <li>
                      <span
                        v-if="p.applyStatus === '1'"
                        @click="showProDetail(p)"
                      >已发申请</span>
                      <span
                        v-if="p.applyStatus === '0'"
                        @click="showProDetail(p)"
                      >未发申请</span>
                    </li>
                    <li>
                      <span>已提问({{ p.questionCount }})</span>
                    </li>
                  </ul>

                  <br>
                </el-col>
                <el-col :span="5">
                  <el-button
                    v-if="p.status === '2'"
                    @click="goFllowApply(p)"
                  >进度反馈</el-button>
                </el-col>
              </el-row>
              <el-row v-if="$store.getters.currentUserType === '1'">
                <el-col :span="7" style="cursor: pointer">
                  <span @click="showDraftDetail(p)">{{ p.title }}</span>
                </el-col>
                <el-col :span="3"> {{ p.updateTime }} </el-col>
                <el-col :span="3"> {{ p.submitTime }} </el-col>
                <el-col :span="5">
                  <span v-if="p.status === '0'">未提交</span>
                  <span v-if="p.status === '1'">待审核</span>
                  <span v-if="p.status === '2'">已发布</span>
                  <span v-if="p.status === '3'">跟踪中</span>
                  <span v-if="p.status === '4'">已结束</span>
                </el-col>
                <el-col :span="6">
                  <el-button
                    v-if="p.status === '0'"
                    @click="showModifyDia(p)"
                  >修改项目</el-button>
                  <el-button
                    v-if="p.status === '0'"
                    @click="delThisProject(p)"
                  >删除项目</el-button>
                  <el-button
                    v-if="p.status === '0'"
                    @click="submitProject(p)"
                  >提交项目</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="block">
              <el-pagination
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="totalNum"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
            <!-- <el-pagination background style="magin-top: 20px" layout="total，prev, pager, next"
              :hide-on-single-page="true" :total="totalNum">
            </el-pagination> -->
          </div>
          <div v-if="projectStep === 2" class="home_content">
            <el-row>
              <el-col :span="18">
                <div class="project_detail">
                  <div v-if="selectRow.projectTitle" class="title">
                    {{ selectRow.projectTitle }}
                    <span
                      v-if="selectRow.status === '1'"
                      style="color: forestgreen"
                    >【进行中】</span>
                    <span
                      v-if="selectRow.status === '2'"
                      style="color: goldenrod"
                    >【跟踪中】</span>
                    <span
                      v-if="selectRow.status === '3' || selectRow.status === '4'"
                      style="color: red"
                    >【已结束】</span>
                    <span v-if="selectRow.status === '3'" style="color: red">
                      <el-tag type="success">合作</el-tag>
                    </span>
                    <span v-if="selectRow.status === '4'">
                      <el-tag type="primary">谢谢参与</el-tag>
                    </span>
                  </div>
                  <div v-if="selectRow.title" class="title">
                    {{ selectRow.title }}
                  </div>
                  <div class="content">
                    <div
                      v-if="$store.getters.currentUserType === '2'"
                      class="content_title"
                    >
                      参与提问{{ selectObj.questionPersonCount }}人 | 已申请{{
                        selectObj.applyPersonCount
                      }}人
                    </div>
                    <div
                      v-if="$store.getters.currentUserType === '1'"
                      class="content_title"
                    >
                      参与提问{{ selectObj.questionCount }}个 | 已申请{{
                        selectObj.applyPersonCount
                      }}人
                    </div>
                    <div class="content_main">
                      <p v-html="selectObj.content" />
                    </div>
                    <div class="content_bottom">
                      <span>相关附件:</span>
                      <span
                        v-for="f in selectObj.attachments"
                        :key="f.projectAttachmentId"
                        class="name"
                        style="cursor: pointer"
                        @click="showThisOne(f)"
                      >{{ f.title }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="$store.getters.currentUserType === '2'" class="project_detail">
                  <div class="title">参考提问</div>
                  <div class="content">
                    <div class="content_main">
                      <div
                        v-for="p in problemOptions"
                        :key="p.questionId"
                        class="content_main_problems"
                      >
                        <div class="content_main_problem">
                          <div class="content_main_problem_title">{{ p.content }}</div>
                          <div class="content_main_problem_content">
                            {{ p.createTime }}
                          </div>
                          <div class="content_main_problem_content">
                            相关附件：<span
                              v-for="f in p.attachments"
                              :key="f.questionAttachmentId"
                              style="color: #409eff; margin-right: 16px; cursor: pointer"
                              @click="showThisOne(f)"
                            >{{ f.title }}</span>
                            <span style="float: right">{{ p.createBy.alaisName }}</span>
                          </div>
                        </div>
                        <div
                          v-for="a in p.answers"
                          :key="a.answerId"
                          class="content_main_answer"
                        >
                          <div class="content_main_answer_title">
                            <span style="color: #000; margin-right: 16px">官方回复:</span>
                            {{ a.content }}
                          </div>
                          <div class="content_main_answer_content">
                            {{ a.createTime }}
                          </div>
                        </div>
                        <div />
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="project_sys">
                  <ul>
                    <li>
                      <el-button
                        v-if="
                          $store.getters.currentUserType === '2' &&
                            selectRow.status !== '4' &&
                            selectRow.status !== '3'
                        "
                        type="primary"
                        @click="setQuestions"
                      >提出问题</el-button>
                    </li>
                    <li>
                      <el-button
                        v-if="
                          selectRow.applyStatus === '0' &&
                            $store.getters.currentUserType === '2' &&
                            selectRow.status !== '4' &&
                            selectRow.status !== '3'
                        "
                        type="primary"
                        plain
                        @click="submitApply"
                      >提交申请
                      </el-button>
                    </li>
                    <li>
                      <el-button
                        v-if="
                          $store.getters.currentUserType === '2' &&
                            selectRow.status !== '4' &&
                            selectRow.status !== '3'
                        "
                        type="primary"
                        plain
                        @click="followApply"
                      >进度反馈</el-button>
                    </li>
                    <li>
                      <el-button
                        v-if="
                          $store.getters.currentUserType === '1' &&
                            selectRow.status === '0'
                        "
                        type="danger"
                        @click="submitProject(selectRow)"
                      >提交项目</el-button>
                    </li>
                    <li>
                      <el-button
                        v-if="
                          $store.getters.currentUserType === '1' &&
                            selectRow.status === '0'
                        "
                        type="danger"
                        plain
                        @click="showModifyDia(selectRow)"
                      >编辑项目</el-button>
                    </li>

                    <li>
                      <el-button
                        type="warning"
                        plain
                        @click="backItem"
                      >返回列表</el-button>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
          <div v-if="projectStep === 3" class="home_content">
            <div class="title">我的项目/提出问题</div>
            <div class="questions">
              <div class="questions_th">
                <el-row>
                  <el-col :span="6">项目信息</el-col>
                  <el-col :span="18">提出问题/疑惑</el-col>
                </el-row>
              </div>
              <div class="questions_td">
                <el-row>
                  <el-col :span="6">
                    <div class="content_left">{{ selectObj.title }}</div>
                  </el-col>
                  <el-col :span="18">
                    <div class="content_right_title">反馈内容:</div>
                    <div class="content_right_main">
                      <el-input
                        v-model="questionDetail"
                        type="textarea"
                        :rows="14"
                        placeholder="请输入内容"
                        maxlength="300"
                        show-word-limit
                      />
                    </div>
                    <div class="questions_file">
                      附件:
                      <el-upload
                        ref="upload"
                        :before-upload="beforeUpload"
                        :auto-upload="true"
                        :data="uploadData"
                        :headers="headers"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :action="annexUploadApi"
                      >
                        <div class="eladmin-upload">
                          <i class="el-icon-upload" /> 添加文件
                        </div>
                        <div slot="tip" class="el-upload__tip">
                          可上传任意格式文件，且不超过100M
                        </div>
                      </el-upload>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="submit_btn">
              <el-button type="primary" @click="questionSubmit">发表提问/疑惑</el-button>
            </div>
          </div>
          <div v-if="projectStep === 4" class="home_content">
            <div class="title">我的项目/反馈进度</div>
            <div class="follow">
              <div class="follow_main">
                <div class="follow_title">{{ selectObj.title }}</div>
                <div class="follow_txt">
                  <div class="follow_txt_title">项目进度反馈</div>
                  <el-input
                    v-model="followDetail"
                    type="textarea"
                    :rows="8"
                    maxlength="300"
                    show-word-limit
                    placeholder="请输入内容"
                  />

                  <!-- <div class="follow_txt_btn">
                    <el-checkbox-group v-model="noticeType">
                      <el-checkbox
                        v-for="n in noticeTypeOptions"
                        :label="n.code"
                        :key="n.code"
                        >{{ n.label }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </div> -->
                  <div class="follow_txt_btn">
                    <el-button @click="submitClientFollow">提交反馈</el-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="follow">
              <div class="follow_main">
                <div
                  style="
                    font-weight: bold;
                    border-bottom: 1px solid #ccc;
                    height: 40px;
                    line-height: 40px;
                  "
                >
                  跟踪记录
                </div>
                <div v-for="f in followOptions" :key="f.feedbackId" class="follow_item">
                  <div class="follow_item_title">
                    <span
                      v-if="f.accessType === '2'"
                      style="color: rgb(19, 136, 247); margin-right: 20px"
                    >进度反馈</span>
                    <span
                      v-if="f.accessType === '1'"
                      style="color: rgb(221, 115, 31); margin-right: 20px"
                    >跟踪询问</span>
                    {{ f.content }}
                  </div>
                  <div class="follow_item_content">
                    {{ f.createTime }}
                    <!-- <span v-if="f.noticeType.indexOf('1') > -1">邮件、</span>
                    <span v-if="f.noticeType.indexOf('2') > -1">短信、</span>
                    <span v-if="f.accessType === '1'">形式发出跟踪询问</span>
                    <span v-if="f.accessType === '2'">形式进行跟踪反馈</span> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="menuTarget === 'modifyPwd'" class="pwd">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="旧密码" prop="oldPass">
              <el-input v-model="ruleForm.oldPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="menuTarget === 'modifyInfo'" class="pwd">
          <el-form
            ref="ruleForm2"
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="编号">
              {{ $store.getters.user.userNo }}
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm2.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="真实姓名" prop="realName">
              <el-input v-model="ruleForm2.realName" autocomplete="off" disabled />
            </el-form-item>

            <el-form-item label="性别" prop="gender">
              <el-radio v-model="ruleForm2.gender" label="1">男</el-radio>
              <el-radio v-model="ruleForm2.gender" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="ruleForm2.phone" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm2.email" autocomplete="off" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="closeAdd"
      :visible.sync="addFlag"
      title="创建项目"
      width="48%"
    >
      <Add ref="add" @closeDia="closeDia" />
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="closeDia">取消</el-button>
        <el-button type="primary" @click="addPaojectSubmot('0')">确认</el-button>
        <el-button type="success" @click="addPaojectSubmot('1')">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="closeModify"
      :visible.sync="modifyFlag"
      title="项目修改"
      width="48%"
    >
      <Edit ref="edit" :select-item="selectItem" @closeDia="closeModify" />
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="closeModify">取消</el-button>
        <el-button type="primary" @click="editSubmit('0')">确认</el-button>
        <el-button type="success" @click="editSubmit('1')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RadarChart from '@/components/Echarts/RadarChart'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { encrypt } from '@/utils/rsaEncrypt'
import Add from './common/add'
import Edit from './common/edit'
import PieChart from '@/components/Echarts/PieChart'
import { getToken } from '@/utils/auth'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import BarChart from '@/components/Echarts/BarChart'
import { getProDetail, submitThisProject, removeThisProject } from '@/api/projectDraft'
import {
  getPartnerProject,
  getPartnerProjectDetail,
  getPartnerProjectDetail2,
  getProjectQuestions,
  setProjectQuestions,
  setProjectApply,
  getProjectFollow,
  setProjectFollow,
  getClientProjects
} from '@/api/home'
import { setUserPwd, setUserInfo } from '@/api/user'
const lineChartData = {}

export default {
  name: 'Dashboard',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RadarChart,
    PieChart,
    BarChart,
    Add,
    Edit
  },
  cruds() {
    return CRUD({ title: '文件', url: 'api/files', crudMethod: { ...crudFile }})
  },
  mixins: [crud()],

  computed: {
    ...mapGetters(['annexUploadApi', 'baseApi']),
    currentUserType: function() {
      return this.$store.getters.currentUserType
    }
  },
  watch: {
    currentUserType: {
      handler(val) {
        console.log(val + 'zhege')
        if (val === '1') {
          this.getClientsProjects()
        } else {
          this.getProjects()
        }
      }
    }
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      pageSize: 30,
      currentPage: 0,
      partnerTotal: 0,
      lineChartData: lineChartData.newVisitis,
      noticeTypeOptions: [
        {
          label: '邮件通知',
          code: '1'
        },
        {
          label: '短信通知',
          code: '2'
        }
      ],
      pointFollow: false,
      pointQusetions: false,
      pointMyAll: false,
      totalNum: 0,
      openeds: ['0', '6'],
      noticeType: [],
      isCollapse: true,
      addFlag: false,
      modifyFlag: false,
      showDetailFlag: false,
      followDetail: '',
      selectItem: {},
      flieSelectedList: [],
      selectRow: {},
      questionDetail: '',
      projectStep: 1,
      selectObj: {},
      menuTarget: '',
      problemOptions: [],
      projectOptions: [],
      headers: { Authorization: getToken() },

      uploadData: {
        uploadType: '2'
      },
      followOptions: [],

      ruleForm: {
        pass: '',
        checkPass: '',
        oldPass: ''
      },
      ruleForm2: {},
      rules: {
        oldPass: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        pass: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      },
      rules2: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        realName: [{ required: true, message: '请输入真实名字', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入电子邮箱', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    if (this.$store.getters.currentUserType === '1') {
      this.getClientsProjects()
    } else {
      this.getProjects()
    }

    this.subscribe('markers')
    this.ruleForm2 = this.$store.getters.user
    this.ruleForm2.gender = '1'
    this.$_mqtt.on('message', (topic, message) => {
      console.log('mqtt收到推送信息')
      const msgJson = JSON.parse(message.toString())
      console.log(msgJson)
      // msgJson = {
      //   functionCode: "0202",
      //   functionName: "进度反馈",
      //   parentFunctionCode: "",
      //   partnerId: 7,
      //   projectId: 40,
      //   remark: "",
      // };
      if (msgJson.partnerId === this.$store.getters.user.id) {
        if (msgJson.functionCode === '0202') {
          this.pointFollow = true
        }
        if (msgJson.functionCode === '0201') {
          this.pointQusetions = true
        }
        if (msgJson.functionCode === '0102') {
          this.pointMyAll = true
        }
      }
    })
  },
  methods: {
    backItem() {
      this.projectStep = 1
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      if (this.$store.getters.currentUserType === '1') {
        this.getClientsProjects(key)
      } else {
        this.getProjects(key)
      }
    },
    showThisOne(file) {
      const url = this.getCaption(file.url)

      console.log(url)
      window.open(this.baseApi + '/' + url)
    },
    async goProjectSubmit(id) {
      const res = await submitThisProject(id[0])
      this.$message({
        type: 'success',
        message: '提交成功!'
      })
      if (this.$store.getters.currentUserType === '1') {
        this.getClientsProjects()
      } else {
        this.getProjects()
      }
    },
    // 项目提交
    submitProject(item) {
      this.$confirm('提交这个项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.goProjectSubmit([item.draftId])
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    delThisProject(item) {
      this.$confirm('删除这个项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removeThisProject([item.draftId]).then((res) => {
            this.$message.success('操作成功!')
            this.getClientsProjects()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    async showModifyDia(item) {
      const res = await getProDetail({
        draftId: item.draftId
      })

      console.log(res)
      if (res) {
        if (res.attachments.length > 0) {
          res.attachments.forEach((f) => {
            f.name = f.title
          })
        }
        this.modifyFlag = true
        setTimeout(() => {
          this.$refs['edit'].initPage(res)
        }, 100)
      }
    },

    addPaojectSubmot(target) {
      this.$refs['add'].doSubmit(target)
    },
    editSubmit(target) {
      this.$refs['edit'].doSubmit(target)
    },

    openAddDia() {
      this.addFlag = true
      setTimeout(() => {
        this.$refs['add'].clearForm()
      })
    },
    closeAdd() {
      this.addFlag = false
    },
    closeDia() {
      this.addFlag = false
      if (this.$store.getters.currentUserType === '1') {
        this.getClientsProjects()
      } else {
        this.getProjects()
      }
    },
    closeModify() {
      this.modifyFlag = false
      if (this.$store.getters.currentUserType === '1') {
        this.getClientsProjects()
      } else {
        this.getProjects()
      }
    },
    // 订阅topic
    subscribe(topic) {
      this.$_mqtt.unsubscribe(topic, (err) => {
        if (err) {
          console.log('取消鲲烛订阅失败')
        } else {
          console.log('取消鲲烛订阅成功')
          this.$_mqtt.subscribe(topic, (err) => {
            if (err) {
              console.log('鲲烛订阅失败!')
            } else {
              console.log('鲲烛订阅成功!')
            }
          })
        }
      })
    },
    submitClientFollow() {
      const _data = {
        content: this.followDetail,
        dataSource: 'web',
        noticeType: [],
        projectId: this.selectRow.projectId,
        partnerId: this.selectRow.partnerId
      }
      setProjectFollow(_data).then((res) => {
        this.$message.success('操作成功!')
        this.followDetail = ''
        this.noticeType = []
        getProjectFollow({
          projectId: this.selectRow.projectId,
          partnerId: this.selectRow.partnerId
        }).then((res) => {
          this.followOptions = res.content
        })
      })
    },
    goFllowApply(item) {
      this.selectRow = item
      this.followDetail = ''
      this.followApply()
    },
    followApply() {
      this.followDetail = ''
      getProjectFollow({
        projectId: this.selectRow.projectId,
        partnerId: this.selectRow.partnerId
      }).then((res) => {
        this.followOptions = res.content
        this.projectStep = 4
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          if (this.menuTarget === 'modifyInfo') {
            setUserInfo({
              ...this.ruleForm2
            }).then((res) => {
              this.$message.success('操作成功!')
            })
          } else {
            setUserPwd({
              newPass: encrypt(this.ruleForm.pass),
              oldPass: encrypt(this.ruleForm.oldPass)
            }).then((res) => {
              this.$message.success('操作成功!')
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    questionSubmit() {
      console.log(this.flieSelectedList)
      const _data = {
        answers: [],
        attachments: [],
        content: 'string',
        dataSource: 'web',
        projectId: 0
      }

      this.flieSelectedList.forEach((item) => {
        _data.attachments.push({
          questionAttachmentId: item.response.fileId,
          title: item.name,
          uploadTime: item.uploadTime,
          url: item.response.fileUrl
        })
      })
      _data.content = this.questionDetail
      _data.dataSource = ''
      _data.projectId = this.selectObj.projectId
      setProjectQuestions(_data).then((res) => {
        this.$message.success('操作成功!')
        this.projectStep = 2
        this.getQuestions(this.selectRow)
        console.log(res)
      })
    },

    async getProjects(target) {
      target = target === '1' ? '' : target

      let _data = {}
      target = Number(target) - 1
      if (target === 1) {
        _data = {
          partnerId: this.$store.getters.user.id,
          page: this.currentPage - 1,
          size: this.pageSize,
          questionStatus: target + ''
        }
      } else {
        if (target === NaN || !target || target === -1) {
          target = ''
        }
        _data = {
          partnerId: this.$store.getters.user.id,
          page: this.currentPage - 1,
          size: this.pageSize,
          status: target
        }
      }
      const res = await getPartnerProject(_data)
      console.log(res)
      if (res) {
        this.projectStep = 1
        res.content.forEach((item) => {
          if (!item.updateTime) {
            item.updateTime = '---- --------  --:--:--'
          }
          if (!item.endTime) {
            item.endTime = '---- --------  --:--:--'
          }
        })
        this.projectOptions = res.content
        this.totalNum = res.totalElements
      }
    },
    async getClientsProjects(target) {
      target = target === '1' ? '' : target - 1
      target = !target ? '' : target
      const res = await getClientProjects({
        status: target,
        page: this.currentPage - 1,
        size: this.pageSize,
        sort: ['update_time,desc']
      })
      console.log(res)
      if (res) {
        res.content.forEach((item) => {
          if (!item.updateTime) {
            item.updateTime = '---- ---- --:--'
          }
          if (!item.submitTime) {
            item.submitTime = '---- ---- --:--'
          }
        })
        this.projectStep = 1
        this.projectOptions = res.content
        this.totalNum = res.totalElements
      }
    },
    async getQuestions(item) {
      const res = await getProjectQuestions({ projectId: item.projectId })
      if (res) {
        res.content.forEach((item) => {
          if (item.createBy) {
            if (item.createBy.username.length > 3) {
              item.createBy.alaisName =
                item.createBy.username.substring(0, 3) +
                '***' +
                item.createBy.username.substr(item.createBy.username.length - 1, 1)
            }
          }
        })
        this.problemOptions = res.content
        console.log(res)
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      if (key === '3') {
        this.pointFollow = false
      }
      if (key === '0') {
        this.pointMyAll = false
      }
      if (key === '1') {
        this.pointMyAll = false
      }
      if (key === '2') {
        this.pointQusetions = false
      }
      if (this.menuTarget === 'modifyPwd') {
        this.$refs['ruleForm'].resetFields()
      }

      this.menuTarget = key === 'modifyPwd' ? key : key === 'modifyInfo' ? key : ''
      if (key === '1' || key === '2' || key === '3' || key === '4' || key === '5') {
        if (this.$store.getters.currentUserType === '1') {
          this.getClientsProjects(key)
        } else {
          this.getProjects(key)
        }
      }
      this.projectStep = 1
    },
    async showProDetail(item) {
      this.selectRow = item
      const res = await getPartnerProjectDetail({
        projectId: item.projectId
      })
      this.getQuestions(item)
      console.log(res)
      this.selectObj = res
      if (res.content.indexOf('table') > -1) {
        res.content = res.content.replace(/border="0"/, "border='1'")
      }
      this.projectStep = 2
    },
    async showDraftDetail(item) {
      this.selectRow = item
      const res = await getPartnerProjectDetail2({
        draftId: item.draftId
      })
      this.getQuestions(item)
      console.log(res)
      if (res.content.indexOf('table') > -1) {
        res.content = res.content.replace(/border="0"/, "border='1'")
      }

      this.selectObj = res
      this.projectStep = 2
    },
    setQuestions() {
      this.questionDetail = ''
      this.projectStep = 3
    },
    beforeUpload(file) {
      let isLt2M = true
      isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.loading = false
        this.$message.error('上传文件大小不能超过 100MB!')
      }

      return isLt2M
    },
    handleSuccess(response, file, fileList) {
      this.flieSelectedList = JSON.parse(JSON.stringify(fileList))
      this.flieSelectedList.forEach((d) => {
        d.uploadTime = moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
      })
      this.$message.success('上传成功!')
      // this.$refs.upload.clearFiles();
      // this.crud.status.add = CRUD.STATUS.NORMAL;
      // this.crud.resetForm();
      // this.crud.toQuery();
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
      this.loading = false
    },
    async goApply(target) {
      const res = setProjectApply(this.selectRow.projectId)
      if (res) {
        this.$message.success('申请成功!')
        this.selectRow.applyStatus = '1'
      }
    },
    submitApply() {
      this.$confirm('确定提交申请这个项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.goApply()
          // this.goResetUserPwd([item.id]);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.point {
  cursor: pointer;
  line-height: 20px;
}

.dashboard-container {
  color: #606266;

  .el-container {
    padding: 40px;

    .el-aside {
      background: #fff;
      padding-top: 16px;
    }

    .el-main {
      .home_content {
        .home_content_btn {
          color: #fff;
        }

        .content_th {
          width: 100%;
          height: 80px;
          line-height: 80px;
          background: #dedee4;

          .el-row {
            .el-col {
              text-align: center;
            }
          }
        }

        .content_tr {
          height: 120px;
          width: 100%;
          margin-top: 16px;
          border: 1px solid #dedee4;
          line-height: 120px;

          .el-row {
            .el-col {
              text-align: center;

              ul {
                li {
                  line-height: 20px;
                  padding-left: 25%;
                  text-align: left;
                  list-style-type: none;
                  margin-bottom: 10px;
                }
              }
            }
          }
        }

        .project_detail {
          border: 1px solid #ccc;
          width: 100%;
          min-height: 20vh;
          margin-bottom: 20px;

          .title {
            height: 80px;
            line-height: 80px;
            border-bottom: 1px solid #ccc;
            text-align: left;
            padding-left: 20px;
          }

          .content {
            padding: 20px;

            .content_title {
              font-size: 14px;
              color: #515151;
            }

            position: relative;

            .content_main {
              min-height: 30vh;
              padding-top: 20px;

              .content_main_problems {
                border-bottom: 1px solid #dedee4;
                margin-bottom: 16px;

                .content_main_problem {
                  border-bottom: 1px dashed #ccc;

                  padding: 10px 16px;

                  .content_main_problem_title {
                    word-break: break-all;
                    min-height: 40px;
                    line-height: 40px;
                  }

                  .content_main_problem_content {
                    height: 40px;
                    line-height: 40px;
                  }
                }

                .content_main_answer {
                  padding: 4px 36px;

                  .content_main_answer_title {
                    word-break: break-all;
                    color: rgba(230, 15, 15, 1);
                    min-height: 32px;
                    line-height: 32px;
                  }

                  .content_main_answer_content {
                    height: 32px;
                    line-height: 32px;
                  }
                }
              }
            }

            .content_bottom {
              height: 50px;

              font-size: 14px;
              bottom: 1%;
              line-height: 50px;

              .name {
                color: #409eff;
                margin-right: 16px;
              }
            }
          }
        }

        .questions {
          margin-top: 20px;
          min-height: 60vh;
          width: 90%;
          border: 1px solid #dedee4;

          .questions_th {
            height: 8vh;
            width: 100%;
            line-height: 8vh;
            background: #dedee4;

            .el-row {
              .el-col {
                padding-left: 16px;
              }
            }
          }

          .questions_td {
            width: 100%;
            padding: 16px;

            .el-row {
              .el-col {
                .content_right_title {
                  width: 100%;
                  line-height: 20px;

                  margin-bottom: 16px;
                }

                .content_right_main {
                  line-height: normal;
                }
              }
            }
          }

          .questions_file {
            line-height: 50px;
          }
        }

        .submit_btn {
          height: 80px;
          width: 100%;
          text-align: center;
          line-height: 80px;

          button {
            width: 30%;
            height: 45px;
            font-size: 16px;
          }
        }

        .follow {
          padding: 24px 12px;
          margin-top: 16px;
          background: rgb(244, 243, 243);

          .follow_main {
            padding: 16px;
            min-height: 30vh;
            background: #fff;
            border: 1px solid #ccc;

            .follow_title {
              height: 48px;
              line-height: 48px;
              font-size: 24px;
              border-bottom: 1px solid #ccc;
            }

            .follow_txt {
              .follow_txt_title {
                height: 48px;
                line-height: 48px;
                font-weight: bold;
              }

              .follow_txt_btn {
                height: 40px;
                line-height: 40px;
              }
            }

            .follow_item {
              border-bottom: 1px dashed #ccc;

              .follow_item_title {
                height: 40px;
                line-height: 40px;
              }

              .follow_item_content {
                height: 40px;
                line-height: 40px;
              }
            }
          }
        }
      }

      .pwd {
        padding: 36px;
        width: 50%;
        margin: auto;
      }

      .project_sys {
        padding: 30px;

        ul {
          li {
            list-style-type: none;
          }
        }

        button {
          width: 90%;
          height: 32px;
          font-size: 14px;
          margin-bottom: 16px;
        }
      }
    }
  }
}

.el-menu-item {
  color: #606266;
}
</style>
