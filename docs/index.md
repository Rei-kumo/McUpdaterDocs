---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "McUpdaterDocs"
  text: "基于CPP的文件更新系统"
  tagline: 轻量，便捷，快速，可自定义，不止局限于Mc
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 了解一下
      link: /guide/what-is-mcupdater
    - theme: alt
      text: 开发者文档
      link: /guide/developer-documentation

features:
  - title: 🔄 双模式更新
    details: 支持版本号模式与哈希模式，按需选择，精确同步文件。
  - title: 📦 增量包 + 全量包
    details: 自动计算文件差异，生成增量包，大幅减少下载量。同时保留全量包以备回退。
  - title: 📁 目录分包
    details: 为每个顶级目录独立打包，客户端可按需下载，节省带宽。
  - title: 🔐 哈希校验
    details: 支持 MD5 / SHA1 / SHA256，下载后自动验证文件完整性。
  - title: 🔄 自更新
    details: 启动器可自动检测并替换自身，更新过程无需用户干预。
  - title: 🌐 多语言设计
    details: 支持多国语言，核心逻辑基于标准 C++17 ，在未来版本计划将移植至 Linux / macOS。
---
