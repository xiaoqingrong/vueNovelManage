<template>
    <div id="login_root">
        <div>
            账号:<input type="text" v-model="username" name="" id="username">
        </div>
        <div>
            密码:<input type="password" v-model="password" id="password">
        </div>
        <div>
            <a-button type="primary" @click="login">登录</a-button>
        </div>
        <ShowWeakErr class="active == true?'active:''" v-if="isShowWeakErr==true" :msg="msg"/>
    </div>
</template>
<script>
import {login} from '../api/index';
import ShowWeakErr from '../components/ShowWeakErr'
export default {
    name:'Login',
    components:{
        ShowWeakErr
    },
    data:function(){
        return{
            username:'',
            password:'',
            msg:"",
            isShowWeakErr:false,
            active:true
        }
    },    
    methods:{
        login:function(){
            let _this = this;
            login({username:this.username,password:this.password}).then((res)=>{
                if(res.data[0].nickname === '管理员'){
                    console.log("222")
                    localStorage.setItem('login',true);
                    _this.$router.push('/');
                }else if(res.data[0].nickname !== '管理员'){
                    localStorage.setItem('login',"");
                    _this.msg = "你不是管理员"
                    _this.isShowWeakErr = true;                    
                    setTimeout((e)=>{
                        _this.isShowWeakErr = false;
                        _this.msg = "1"
                    },2000)
                } else if(res.data.lengh===0){
                    localStorage.setItem('login',"");
                    _this.msg = "账号或密码出错"
                    _this.isShowWeakErr = true;                    
                    setTimeout((e)=>{
                        _this.isShowWeakErr = false;
                        _this.msg = "1"
                    },2000)
                }                   
            }).catch((err)=>{
                localStorage.setItem('login',"");
                    _this.msg = "账号或密码出错"
                    _this.isShowWeakErr = true;                    
                    setTimeout((e)=>{
                        _this.isShowWeakErr = false;
                        _this.msg = "1"
                    },2000)
            })
        }
    }
}
</script>
<style lang="less">
#login_root{
    width: 100%;
    height: 100vh;
    background: url("../assets/beijing.png") no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    padding-top: 200px;
    div{
        margin: 30px 0;
        color: #fff;
        input{
            width: 360px;
            height: 40px;
            border-radius: 10px;
            padding-left: 10px;
            border: none;
            outline: none;
            color: #000;
        }
    }
}
.active{
    animation: aaa 2s forwards;
}
@keyframes aaa{
    0%{opacity:0}
    34%{opacity:0.3}
    70%{opacity:0.7}
    100%{opacity:1}
    0%{opacity:1}
    34%{opacity:0.7}
    70%{opacity:0.3}
    100%{opacity:0}
}
</style>