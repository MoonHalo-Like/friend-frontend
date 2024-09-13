#该镜像是基于nginx:latest镜像构建的
FROM nginx
 #添加说明
MAINTAINER onesummer
#替换默认配置
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
 #将项目根目录下dist文件夹（构建之后才会生成）下的所有文件复制到镜像/usr/share/nginx/html/目录下
COPY dist/ /usr/share/nginx/html/

