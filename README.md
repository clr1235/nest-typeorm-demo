## 初始化项目
- 安装依赖
  ```bash
  npm i -g @nestjs/cli
  nest new project-name (也可将 project-name 换成 . 表示在当前已有的目录下创建项目)

  ```
- [nest-cli 用法](https://docs.nestjs.cn/cli/usages)
  ```bash
  nest generate|g <schematic> [name] [options] # 生成模块、控制器、服务等
  nest build [options]                        # 构建项目
  nest start [options]                        # 启动项目
  nest info                                   # 查看环境信息
  ```