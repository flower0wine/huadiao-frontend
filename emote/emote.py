#
#   ______   __  __     ______   __  __     ______     __   __
#  /\  == \ /\ \_\ \   /\__  _\ /\ \_\ \   /\  __ \   /\ "-.\ \
#  \ \  _-/ \ \____ \  \/_/\ \/ \ \  __ \  \ \ \/\ \  \ \ \-.  \
#   \ \_\    \/\_____\    \ \_\  \ \_\ \_\  \ \_____\  \ \_\\"\_\
#    \/_/     \/_____/     \/_/   \/_/\/_/   \/_____/   \/_/ \/_/
#
# 这是用来将表情快速上传到服务器的 python 脚本

import os
import requests

# 服务器接口地址
url = 'http://114.55.41.107/huadiao/emote/upload/multiple'

# 图片文件所在的目录
image_directory = 'O:\\ai\\emotes\\emote'

# 遍历目录中的所有文件
files_to_upload = []
for filename in os.listdir(image_directory):
    if filename.endswith(('.png', '.jpg', '.jpeg', '.gif')):  # 根据需要调整文件类型
        file_path = os.path.join(image_directory, filename)

        file = open(file_path, 'rb')
        # 发送 POST 请求
        response = requests.post(url, data={
            'name': filename.split('.')[0],
            'type': 1,
            'gid': 1
        }, files={
            'file': (filename, file),
        }, cookies={
            "JSESSIONID": "B4CF769830E407B96040BA96E46C3C68",
            "User_ID": "huadiao_539926406667"
        })

        # 打印响应结果
        print(response.status_code)
        print(response.text)

        file.close()


