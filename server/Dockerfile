FROM node:20-alpine

WORKDIR /app

# 複製所有文件
COPY . .

# 安裝前端依賴並構建
WORKDIR /app/client
ENV HUSKY=0
ENV NODE_ENV=production
RUN npm install --legacy-peer-deps
RUN npm run build

# 安裝後端依賴
WORKDIR /app/server
RUN npm install --legacy-peer-deps

# 設置環境變量
ENV NODE_ENV=production
ENV PORT=8081

# 暴露端口
EXPOSE 8081

# 啟動應用
CMD ["node", "app.js"] 