import { baseUrl } from '@/config/common/service';

// 预览图片
export function previewImage(urls) {
  uni.previewImage({
    urls,
    longPressActions: {
      itemList: ['发送给朋友', '保存图片', '收藏'],
      success: () => {},
      fail: () => {}
    }
  });
}

// 上传图片
export async function uploadImg(tempFilePaths) {
  return new Promise(resolve => {
    uni.uploadFile({
      url: `${baseUrl}/blade-system/upload/file`, // 仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'file',
      success: uploadFileRes => {
        const { statusCode } = uploadFileRes;
        if (uploadFileRes.data) {
          const response = JSON.parse(uploadFileRes.data);
          const { data, code } = response;
          if (code === 200) {
            const { url } = data;
            resolve(url);
          }
        }

        if (statusCode !== 200) {
          uni.showToast({
            title: '上传图片失败',
            icon: 'none'
          });
          resolve(false);
        }
      }
    });
  });
}
