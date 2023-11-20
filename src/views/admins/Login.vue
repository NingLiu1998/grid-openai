<template>
  <div class="login-block">
    <a-card title="🥵登录噻" :bordered="false" class="login-card">
      <template #extra><a href="#" @click="forgetPassword">忘记密码</a></template>
      <div class="login">
        <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
          @finish="onFinish" @finishFailed="onFinishFailed">
          <a-form-item label="😳邮箱/ID" name="username"
            :rules="[{ required: true, message: '😡眼瞎？你踏马不输入账号我踏马怎么给你登录啊？ 啊？' }]">
            <a-input v-model:value="formState.username" placeholder="🥰不可能有中文喔😛" />
          </a-form-item>

          <a-form-item label="👀密码" name="password"
            :rules="[{ required: true, message: '😡好好好，不输密码是吧？ 弱智？' }]">
            <a-input-password v-model:value="formState.password" placeholder="😨不会忘了吧" />
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">🙄走个形式</a-checkbox>
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">👉🤡🤣我是小丑</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

const forgetPassword = () => {
  alert("😡你就是个傻逼")
};

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<style>
.login-block {
  background: #ececec;
  padding: 30px;
  display: flex;
  justify-items: center;
  align-items: center;
  min-height: 100vh;
}

.login-card {
  max-width: 100vh;
  margin: 0 auto;
}

/* 水平垂直居中 */
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  min-width: 250px;
}
</style>

