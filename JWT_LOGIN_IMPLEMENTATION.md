# JWT 登录实现说明

## 概述

本项目已从基于 Cookie 的 OAuth 登录改为基于 JWT Token 的登录方式。第三方登录完成后，后端会在 query 参数中带着 token 重定向到前端的 `/login` 页面。

## 实现细节

### 1. 登录流程

#### 普通登录流程
1. 用户点击登录按钮（GitHub 或 Google）
2. 重定向到后端 OAuth 端点，并携带前端 `/login` 页面的重定向 URL
3. 用户完成第三方认证
4. 后端生成 JWT token，重定向到前端 `/login?token=xxx`
5. 前端 `/login` 页面接收 token，存储到 localStorage
6. 自动刷新用户信息并跳转到首页

#### 桌面应用登录流程
1. 用户点击登录按钮（GitHub 或 Google）
2. 重定向到后端 OAuth 端点，并携带前端 `/login` 页面的重定向 URL
3. 用户完成第三方认证
4. 后端生成 JWT token，重定向到前端 `/login?token=xxx&type=desktop&port=xxxx`
5. 前端 `/login` 页面检测到 `type=desktop` 参数，存储 token 后跳转到 `/desktop-login`
6. `/desktop-login` 页面从 localStorage 读取 token，发送给本地桌面应用

### 2. 修改的文件

#### 新增文件
- `src/app/[locale]/login/page.tsx` - JWT 登录处理页面

#### 修改文件
- `src/connect.ts` - 添加 JWT token 请求拦截器，移除 withCredentials
- `src/providers/UserProvider.tsx` - 支持 JWT token 认证和本地存储管理
- `src/components/LoginButton.tsx` - 修改 OAuth 重定向 URL
- `src/app/[locale]/login/page.tsx` - 添加桌面登录类型检测和跳转逻辑
- `src/app/[locale]/(needNavbar)/desktop-login/page.tsx` - 修改为从 localStorage 读取 token

### 3. JWT Token 处理

#### 存储
- Token 存储在 `localStorage` 中，key 为 `auth_token`

#### 自动添加到请求头
- 所有 API 请求自动在 `Authorization` 头中添加 `Bearer {token}`

#### 过期处理
- 401 响应时自动清除 token 并重定向到首页
- 用户登出时清除 token
- 用户信息获取失败时清除 token

### 4. 安全考虑

- Token 存储在 localStorage 中，页面刷新后仍然有效
- 401 错误时自动清除无效 token
- 登出时确保清除本地 token

### 5. 后端要求

后端需要支持以下功能：

1. **OAuth 重定向参数**
   - 接受 `redirect` 参数指定登录成功后的重定向 URL
   - 示例：`/oauth/github/login?redirect=http://localhost:3000/login`

2. **JWT Token 生成**
   - 登录成功后生成 JWT token
   - 重定向到前端时在 query 参数中携带 token
   - 普通登录示例：`http://localhost:3000/login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - 桌面登录示例：`http://localhost:3000/login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&type=desktop&port=8080`

3. **API 认证**
   - 支持 `Authorization: Bearer {token}` 头认证
   - Token 无效时返回 401 状态码

### 6. 使用方法

#### 前端开发者
- 无需额外配置，登录流程自动处理
- Token 管理完全透明
- 用户状态通过 `useUser()` hook 获取

#### 后端开发者
- 确保 OAuth 端点支持 `redirect` 参数
- 登录成功后重定向到指定 URL 并携带 token
- API 端点支持 JWT Bearer token 认证

## 测试

1. 访问应用首页
2. 点击登录按钮选择 GitHub 或 Google
3. 完成第三方认证
4. 应该自动跳转到 `/login` 页面显示登录进度
5. 登录成功后自动跳转到首页
6. 用户信息应该正确显示
7. 登出功能应该正常工作

## 故障排除

- 如果登录失败，检查浏览器控制台错误信息
- 确认后端 OAuth 端点正确配置
- 检查 JWT token 格式是否正确
- 验证 API 端点是否支持 Bearer token 认证