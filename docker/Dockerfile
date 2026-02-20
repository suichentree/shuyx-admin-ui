# 该dockerfile是以根目录为上下文构建的
# 阶段1：构建Vue3项目
FROM node:22-alpine as build-stage
WORKDIR /app

# 复制根目录下的依赖文件
COPY package.json package-lock.json ./
# 安装项目依赖（利用淘宝npm镜像）
RUN npm install --registry=https://registry.npm.taobao.org

# 复制根目录的全部源码
COPY . .

# 再项目根目录下，执行打包命令。打包生成静态文件（注意：Vue3项目打包命令通常是npm run build）
RUN npm run build

# 阶段2：Nginx运行阶段（轻量镜像）
FROM nginx:alpine as production-stage

# 容器内创建 SSL 证书目录
RUN mkdir -p /etc/nginx/ssl

# 将nginx配置文件复制到容器内
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# 将打包产物复制到Nginx容器的目录中
COPY --from=build-stage /app/dist /usr/share/nginx/html/dist

# 暴露端口（和Nginx配置、docker-compose保持一致）
EXPOSE 10086

# 启动Nginx服务
CMD ["nginx", "-g", "daemon off;"]