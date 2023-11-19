<template>
  <div class="test">
    <div class="upload">
      <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove">
        <a-button>
          <!-- <upload-outlined></upload-outlined> -->
          Select File
        </a-button>
      </a-upload>
      <a-button type="primary" :disabled="fileList!.length === 0" :loading="uploading" style="margin-top: 16px"
        @click="handleUpload">
        {{ uploading ? 'Uploading' : 'Start Upload' }}
      </a-button>
    </div>
  </div>
</template>
  

<script lang="ts" setup>
import { http } from "@/service/http";
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';


function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

const fileList = ref<UploadProps['fileList']>([]);
const uploading = ref<boolean>(false);

const handleRemove: UploadProps['onRemove'] = file => {
  if (fileList.value) {
    const index = fileList.value.indexOf(file);
    const newFileList = fileList.value.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
  }
};

const beforeUpload: UploadProps['beforeUpload'] = file => {
  fileList.value = [...(fileList.value || []), file];
  return false;
};

const handleUpload = () => {
  if (!fileList.value) return;
  const formData = new FormData();
  fileList.value.forEach((file) => {
    formData.append('files[]', file as any);
  });
  uploading.value = true;
  console.log("dao zh");
  //延时600毫秒
  setTimeout(() => {
    fileList.value = [];
    uploading.value = false;
    message.success('upload successfully.');
  }, 600);


  // You can use any AJAX library you like
  // request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
  //   method: 'post',
  //   data: formData,
  // })
  //   .then(() => {
  //     fileList.value = [];
  //     uploading.value = false;
  //     message.success('upload successfully.');
  //   })
  //   .catch(() => {
  //     uploading.value = false;
  //     message.error('upload failed.');
  //   });
};


export type ReqChatModel = { content: string, cid: number };


//初始化的时候发起请求
onMounted(() => {
  console.log(`the component is now mounted.`)


})

// let s = http<ReqChatModel, any>({
//     method: 'GET',
//     url: `/Player/GetPlayerWareHouse`,
//     params: {
//       cid: 1,
//       content: "hello"
//     }
//   })


</script>