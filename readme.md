# 前端
- 路由配置
```javascript
    path: '/collectmanage',
    title: 'collectmanage',
    // redirect: "/user/list",
    meta: {
      title:'催收管理'
    },
    component: Layout,
    children: [{
      path: '/customerGroup', 
      name: 'collectCustomerGroup',  
      meta: {
        title: '客群管理',
        auth: true,
        userAuth: 'collectCustomerGroup,', // 如果不配置则是采用authMenuCode 或 name 的值 (页面menu_code，操作action)
        authMenuCode: '' // 如果没有则使用 name 值（兼容处理）
      },
    }]
```

- 路由控制
```javascript
import {hasAuth} from '@jyb/vue-common-userauth';

router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  const meta = to.meta || {}
  if(!meta.auth || (meta.auth && hasAuth(meta.userAuthModule || to.name, meta.userAuthAction, window.userAuth))) {
    next();
  } else {
    next({
      path: '/404'
    });
  }
});
```

- 页面按钮
```html

  <span v-if="props.row.reduction_state == 0 && hasAuth('collectreducelist', 'audit')" class="color-primary operateButton" @click="auditDialogShow(props.row, 0)">{{props.row.loan_number}}</span>
```

# node

```javascript
  // 设置权限  home.js
    this.ctx.session.passportUserAuth = userAuth.code == 0 && userAuth.data || {};
 
   // route
   const  {nodeHasAuth} = require('@jyb/vue-common-userauth/index.js');
  // 权限验证(中间件)
  app.router.post(routerPrefix + '/reduce/audit', nodeHasAuth('collectreducelist', 'audit'), controller[version].afterLoan.reduce.audit);


```
