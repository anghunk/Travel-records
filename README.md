## Travel records · 地图旅行记录

一个可以标记城市的地图小应用，用来记录个人旅行足迹。

网站：https://travel.zishu.me

### 功能

- 交互式中国地图，点击红旗查看城市详情弹窗  
- 支持多种底图样式：标准 / 灰色 / 卫星  
- 城市详情包含描述与照片画廊  
- 深色 / 浅色主题切换  

### 技术栈

- React + TypeScript + Vite  
- Leaflet / react-leaflet（地图与标记）  
- Tailwind CSS，shadcn/ui（UI 组件）  

### 本地运行

```bash
pnpm install   # 或 npm install / yarn
pnpm dev       # 本地开发
```

### 构建与其他脚本

```bash
pnpm build     # 构建产物
pnpm preview   # 预览构建结果
pnpm lint      # 代码检查
```