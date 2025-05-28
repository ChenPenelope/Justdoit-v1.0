FROM node:20-alpine

WORKDIR /app

# 複製所有文件
COPY . .

# 安裝前端依賴並構建
WORKDIR /app/client
ENV HUSKY=0
ENV NODE_ENV=production

# 清理現有的 node_modules
RUN rm -rf node_modules package-lock.json

# 安裝依賴
RUN /usr/local/bin/npm install --prefix /app/client --legacy-peer-deps
RUN /usr/local/bin/npm install --prefix /app/client vite@5.1.4 --save-dev --legacy-peer-deps

# 構建
RUN cd /app/client && /usr/local/bin/npx vite build

# 安裝後端依賴
WORKDIR /app/server
RUN /usr/local/bin/npm install --prefix /app/server --legacy-peer-deps

# 設置環境變量
ENV NODE_ENV=production
ENV PORT=8081

# 暴露端口
EXPOSE 8081

# 啟動應用
CMD ["node", "app.js"] 