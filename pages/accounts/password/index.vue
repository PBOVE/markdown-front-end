/**
*
*  @author ZTiger
*
*/


<template>
  <div class="password-wrap">
    <public-header :search-hide="true" />
    <div class="pass-header">
      <div class="pass-header-content">
        <nuxt-link to="/user/security">
          <Icon type="md-arrow-round-back" class="pass-header-content-icon" />
        </nuxt-link>
        <div>密码</div>
      </div>
    </div>
    <div class="pass-main">
      <div class="pass-content">
        <div class="pass-content-title">请选择安全系数高的密码，并且不要将其用于其他帐号。</div>
        <div class="user-border pass-content-main scroll">
          <Form
            ref="updateData"
            class="user-from"
            label-position="top"
            :rules="rules"
            :model="updateData"
          >
            <FormItem prop="srcPassword">
              <Input
                placeholder="原密码"
                v-model="updateData.srcPassword"
                size="large"
                type="password"
                :password="true"
              />
            </FormItem>
            <FormItem prop="password">
              <Input placeholder="新密码" v-model="updateData.password" size="large" type="password" />
            </FormItem>
            <div class="tip">
              <div>
                密码强度：
                <span :style="{color:strokeColor}" style="font-weight:bold">{{strength}}</span>
              </div>
              <div class="tip-content">请至少输入 6 个字符。请不要使用容易被猜到的密码。</div>
            </div>
            <FormItem label prop="again">
              <Input
                placeholder="新密码（重复）"
                v-model="updateData.again "
                size="large"
                type="password"
              />
            </FormItem>
          </Form>
          <div class="from-floor">
            <Button
              type="primary"
              size="large"
              :loading="loading"
              @click="handleButton('updateData')"
            >更改密码</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import publicHeader from "@/components/publicHeader/index.vue";

export default {
  transition: "fade",
  components: { publicHeader },

  data() {
    const validatePass = (rule, value, callback) => {
      if (this.updateData.again) {
        this.$refs.updateData.validateField("again");
      }
      callback();
    };
    return {
      // 设置按钮为加载中状态
      loading: false,
      // 数据
      updateData: {
        // 新密码
        password: "",
        // 原密码
        srcPassword: "",
        // 确认密码
        again: "",
      },
      // 强度
      strength: "",
      // 颜色
      strokeColor: "",
      // 规则
      rules: {
        srcPassword: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
          {
            pattern: /^.{6,}$/,
            message: "请至少输入 6 个字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        again: [
          {
            required: true,
            message: "请输入新密码（重复）",
            trigger: "blur",
          },
          {
            type: "string",
            message: "两次输入的新密码必须相同",
            trigger: "blur",
            validator: (rule, value) => {
              const { password } = this.updateData;
              if (!password) return true;
              return value === password;
            },
          },
        ],
      },
    };
  },
  head() {
    return {
      title: "密码 ● Freedom",
    };
  },
  watch: {
    "updateData.password": {
      handler(val) {
        if (val.length === 0) {
          this.strength = "";
        } else if (val.length < 6) {
          this.strength = "低";
          this.strokeColor = "#ed4014";
        } else if (val.length < 20) {
          this.strength = "中";
          this.strokeColor = "#ff9900";
        } else {
          this.strength = "高";
          this.strokeColor = "#19be6b";
        }
      },
    },
  },
  methods: {
    // 发送验证
    async handleButton(name) {
      this.$refs[name].validate(async val => {
        if (!val) return;
        this.loading = true;
        const { srcPassword, password } = this.updateData;
        try {
          const data = await this.$request.password({ srcPassword, password });
          this.$Message.success({ content: "密码修改成功", duration: 5 });
          this.updateData = { srcPassword: "", password: "", again: "" };
        } catch (err) {}
        this.loading = false;
      });
    },
  },
};
</script>


<style scoped>
.password-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.pass-main {
  padding: 0 18px;
  height: 0;
  flex: auto;
  overflow: auto;
}
.pass-content,
.pass-header-content {
  margin: 0 auto;
  max-width: 780px;
}
.pass-header {
  padding: 0 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.pass-header-content {
  display: flex;
  align-items: center;
  padding: 0 0 5px 0;
  font-size: 23px;
  color: #202124;
}
.pass-header-content-icon {
  margin: 0 10px 0 0;
  cursor: pointer;
  height: 34px;
  width: 34px;
  text-align: center;
  line-height: 34px;
  font-size: 24px;
  color: #000;
}
.pass-header-content-icon:active {
  border-radius: 50%;
  background: #dcdee2;
}
.pass-content-title {
  padding: 24px 0;
  color: rgba(0, 0, 0, 0.65);
}
.pass-content-main {
  padding: 40px 24px 24px;
}
.user-from {
  max-width: 300px;
  margin: 0 0 50px 0;
}
.tip {
  margin: 0 0 10px 0;
}
.tip-content {
  margin: 3px 0 0 0;
  font-size: 12px;
  color: rgb(81, 90, 110);
  letter-spacing: 0.1em;
}
.from-floor {
  width: 120px;
  text-align: center;
}
</style>
