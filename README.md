<h1>vue-pure-admin精简版（非国际化版本）</h1>

[![license](https://img.shields.io/github/license/pure-admin/vue-pure-admin.svg)](LICENSE)

**中文** | [English](./README.en-US.md)

## 介绍

基于 pure-admin 的 vue3 + ts + element plus 快速业务开发管理后台

## 模块开发说明

### 登录和路由模块

- 登录后获取 token 和用户信息，然后获取动态路由
- 默认使用 静态路由 + 动态路由的组合方式（页面权限的最优解）
- 静态路由和动态路由 `遵从同一套路由定义`

### 接口模块

- 手动接口在 api 文件夹下（低保）
- mock 接口在 mock 文件夹下
- 切换到生产接口，只需要将对应 mock 删除即可

## 许可证

[MIT © 2020-present, pure-admin](./LICENSE)
