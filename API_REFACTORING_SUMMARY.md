# API 重构总结

## 🎯 重构目标

将项目中所有使用 `connect` 函数的 API 请求抽象和复用到统一的 API 服务层中，提高代码的可维护性和一致性。

## 📁 新增文件结构

```
src/services/
├── api.ts          # 主要的 API 服务文件
└── types.ts        # API 相关的类型定义
```

## 🔧 重构内容

### 1. 创建统一的 API 服务层

#### `src/services/types.ts`
- 定义了所有 API 请求和响应的类型接口
- 包含分页参数、创建/更新参数、响应数据结构等

#### `src/services/api.ts`
- 创建了三个主要的 API 服务模块：
  - `userApi`: 用户相关 API
  - `mindMapApi`: 思维导图相关 API  
  - `publicApi`: 公共分享相关 API

### 2. API 服务功能

#### 用户相关 API (`userApi`)
- `getCurrentUser()`: 获取当前用户信息
- `logout()`: 用户登出
- `getProfile()`: 获取用户配置信息
- `updateProfile()`: 更新用户配置信息
- `getDesktopToken()`: 获取桌面登录token

#### 思维导图相关 API (`mindMapApi`)
- `getMapList()`: 获取思维导图列表
- `createMap()`: 创建新的思维导图
- `getMap()`: 获取特定思维导图
- `updateMap()`: 更新思维导图
- `deleteMap()`: 删除思维导图

#### 公共分享相关 API (`publicApi`)
- `getPublicMapList()`: 获取公共思维导图列表
- `getPublicMap()`: 获取特定公共思维导图

## 📝 更新的文件

### 1. 组件文件
- `src/providers/UserProvider.tsx`
- `src/components/CreateButton.tsx`

### 2. 页面文件
- `src/app/[locale]/list/[type]/page.tsx`
- `src/app/[locale]/edit/[id]/page.tsx`
- `src/app/[locale]/profile/page.tsx`
- `src/app/[locale]/desktop-login/page.tsx`

### 3. Hook 文件
- `src/app/[locale]/share/[id]/hooks/useSharePage.ts`

## ✅ 重构收益

### 1. 代码一致性
- 所有 API 调用都通过统一的服务层进行
- 统一的错误处理和响应格式
- 类型安全的 API 调用

### 2. 可维护性
- API 逻辑集中管理，易于修改和扩展
- 清晰的接口定义，便于理解和使用
- 减少重复代码，提高代码复用性

### 3. 开发体验
- 更好的 TypeScript 支持和智能提示
- 统一的 API 调用方式，降低学习成本
- 便于进行单元测试和 Mock

### 4. 扩展性
- 新增 API 只需在服务层添加，无需修改多个文件
- 便于添加缓存、重试、拦截器等功能
- 支持不同环境的 API 配置

## 🔄 使用方式

### 导入 API 服务
```typescript
import { api } from '@/services/api'
```

### 调用示例
```typescript
// 用户相关
const user = await api.user.getCurrentUser()
await api.user.logout()

// 思维导图相关
const maps = await api.mindMap.getMapList({ page: 1, pageSize: 20 })
const newMap = await api.mindMap.createMap({ name: 'New Map' })

// 公共分享相关
const publicMaps = await api.public.getPublicMapList({ page: 1, pageSize: 20 })
```

## 🚀 后续优化建议

1. **错误处理**: 添加统一的错误处理机制
2. **缓存策略**: 实现 API 响应缓存
3. **重试机制**: 添加网络请求重试功能
4. **Loading 状态**: 统一管理 API 调用的 loading 状态
5. **Mock 数据**: 为开发和测试提供 Mock API 服务

## 📊 重构前后对比

### 重构前
- API 调用分散在各个组件中
- 直接使用 `connect` 函数
- 缺乏统一的类型定义
- 重复的错误处理逻辑

### 重构后
- 统一的 API 服务层
- 类型安全的 API 调用
- 集中的错误处理
- 更好的代码组织和可维护性

## 🎉 总结

通过这次重构，我们成功地将所有 API 调用抽象到了统一的服务层中，大大提高了代码的可维护性和一致性。新的 API 服务层不仅提供了更好的类型安全，还为未来的功能扩展奠定了良好的基础。
