<template>
<div>
  <a-layout id="components-layout-demo-top-side">
    <a-layout-header class="header">
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1" style="font-size:30px">
         小说后台管理系统
        </a-menu-item>
        
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            style="height: 100%"
          >
            <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" />小说管理</span>
              <a-menu-item key="1">
                <router-link to="/allBooks">
                  全部
                </router-link>                
              </a-menu-item>
              <a-menu-item key="2">
                <router-link to="/boyBooks">
                  男生
                </router-link>
                
              </a-menu-item>
              <a-menu-item key="3">
                <router-link to="/girlbooks">
                  女生
                </router-link>
              </a-menu-item>
              <a-menu-item key="4">
                <router-link to="/publishbooks">
                  出版
                </router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"><a-icon type="laptop" />用户管理</span>
              <a-menu-item key="5">
                <router-link to="/user">
                  普通用户
                </router-link>
              </a-menu-item>
              <a-menu-item key="6">
                <router-link to="/manage">
                  管理员
                </router-link>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
  <button class="outLogin" style="font-size:20px;color:blue;float:right;margin-top:14px" @click="()=>out()">
         退出
  </button>
</div>
</template>

<script>

export default {
  name: "Home",
  components:{
    
  },
  data(){
    return{
      msg:'00'
    }
  },
  methods:{
    out(){
      this.$router.push('/login');
      localStorage.setItem('login',false);
    }
  }
};
</script>
<style lang="less" scoped>
#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
section{
  height: 100%;
}
.ant-layout-content{
  height: 90%;
}
.ant-layout-content{
  padding: 0!important;
}
.outLogin{
  position: absolute;
  top: 0;
  padding: 0 10px;
  right: 10px;
}
</style>