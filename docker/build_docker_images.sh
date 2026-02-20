#!/bin/bash
# 构建镜像并推送到远程Docker（手动输密码）
# 说明：
# 1. 本脚本用于构建镜像并推送到远程Docker服务器。
# 2. 脚本会提示用户输入远程服务器的IP、用户名。
# 3. 脚本会自动构建Docker镜像，然后输入远程服务器密码，并将其推送到远程服务器的Docker仓库中。
# 4. 如果在构建过程中遇到错误，脚本会立即退出并提示用户。
# 注意事项
# 1. 请确保Windows环境下已安装Docker和Maven。
# 2. 请确保远程服务器已开启Docker服务，且用户有推送镜像的权限。
# 3. 请确保本地网络可以访问远程服务器，且没有防火墙等网络问题。特别是SSH端口（默认22）是否开放。
# 4. 请确保该脚本文件有执行权限（chmod +x build_docker_images.sh）。否则会提示权限不足，无法执行。

# 先切换到项目根目录
cd "$(dirname "$0")/.." || {
  echo "❌ 无法切换到项目根目录！"
  exit 1
}

# ====================== 交互输入远程服务器信息 ======================
echo "===== 远程服务器配置 ====="
read -p "请输入远程服务器IP: " REMOTE_IP
read -p "请输入远程服务器用户名: " REMOTE_USER
echo -e "\n"

# ====================== 固定配置（按需修改） ======================
# 镜像名称
IMAGE="shuyx-admin-ui-image:latest"
# Dockerfile路径
DOCKERFILE_PATH="docker/Dockerfile"


# ====================== 核心功能：构建+推送镜像 ======================
echo "===== 开始构建并推送镜像 ====="

# 1. 构建镜像
echo "📦 构建Docker镜像：$IMAGE"
echo "📁 使用Dockerfile：$DOCKERFILE_PATH"
docker build -f "$DOCKERFILE_PATH" -t "$IMAGE" .

if [ $? -ne 0 ]; then
  echo "❌ 镜像构建失败！"
  exit 1
fi

# 2. 检查镜像是否存在
echo "🔍 检查镜像是否构建成功..."
# 使用 docker inspect 更可靠地检查镜像是否存在
docker inspect "$IMAGE" > /dev/null 2>&1
 
if [ $? -ne 0 ]; then
  echo "❌ 镜像不存在，请检查构建过程！"
  echo "💡 尝试手动检查镜像：docker images"
  exit 1
fi
 
# 显示构建的镜像信息
echo "📋 构建的镜像信息："
docker images | grep "$IMAGE"
 
echo "✅ 镜像构建成功！"



# 3. 推送镜像到远程（自动使用输入的密码，无需手动输）
echo "🚀 推送镜像到 $REMOTE_USER@$REMOTE_IP"
docker save "$IMAGE" | ssh "$REMOTE_USER@$REMOTE_IP" "docker load"

if [ $? -eq 0 ]; then
  echo "✅ 镜像推送成功！"
  echo "📌 镜像名称：$IMAGE"
  echo "🌐 远程服务器：$REMOTE_USER@$REMOTE_IP"
else
  echo "❌ 镜像推送失败（密码错误/网络问题）！"
  echo "💡 请检查："
  echo "   1. 远程服务器密码是否正确"
  echo "   2. 网络连接是否正常"
  echo "   3. SSH服务是否运行"
  exit 1
fi
 
echo "🎉 构建和推送完成！"