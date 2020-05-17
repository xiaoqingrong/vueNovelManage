<template>
  <div class="allbooks">
    <a-table :columns="userColumns" :data-source="this.data" bordered>
    <template slot="xuhao" slot-scope="text, record, index">
       {{ text }}
    </template>
    <template
      v-for="col in ['username', 'password']"
      :slot="col"
      slot-scope="text, record, index"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="action" slot-scope="text, record, index">
      <div class="editable-row-operations">
        <span>
          <a @click="() => save(record)">保存</a>
          <a-popconfirm title="是否确定删除?" @confirm="() => cancel(record.key)">
            <a>删除</a>
          </a-popconfirm>
        </span>
        <span>
          <a :disabled="editingKey !== ''" @click="() => edit(record.key)">编辑</a>
        </span>
      </div>
    </template>
  </a-table>
    <div @click="() => add()" >
            <a-button type="primary" style="float:left">添加管理员</a-button>
    </div>
    <div class="addManage" v-if="addIsShow === true?true:false">
        <div>            
            <span>账号</span><input placeholder="请输入账号"  ref="user"/>
        </div>
       <div>
            <span>密码</span><input placeholder="请输入密码"  ref="pass"/>
       </div>
       <a-button type="default" @click="() => not()">取消</a-button><a-button type="primary" @click="() => Ok()">确定</a-button>
    </div>
  </div>
</template>
<script>
import {userColumns} from '../config/allbookSet.js'
import {user,edituser,deleteuser, insertuser} from '../api/index'

export default {
  name:'GirlBooks',
  data() {
    
    return {
      data:[],
      userColumns,
      editingKey: '',
      msg:"",
      isShowWeakErr:false,
      active:true,
      addIsShow:false
    };
  },
  beforeMount(){
    this.getAllData();
  },
  methods: {
    getAllData(){
        user('').then((res)=>{
            
            this.data = [];
            for (let i = 0; i < res.data.length; i++) {
                this.data.push({
                key: res.data[i].id,
                xuhao: i+1,
                username: res.data[i].username,
                password: res.data[i].password,
                action:`${i}`
                });
            }
            this.cacheData = this.data.map(item => ({ ...item }));
            }).catch((err)=>{
                console.log(err)
        })
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(record) {
      let _this = this;      
      edituser({id:record.key,username:record.username,password:record.password}).then((res)=>{
         _this.getAllData();
          _this.msg = "修改成功!";
          _this.editingKey = ''
          _this.isShowWeakErr = true;                    
          setTimeout((e)=>{
              _this.isShowWeakErr = false;
              _this.msg = "1"
          },2000)
      }).catch((err)=>{
          _this.msg = "修改失败!"
          _this.isShowWeakErr = true;                    
          setTimeout((e)=>{
              _this.isShowWeakErr = false;
              _this.msg = "1"
          },2000)
      })
    },
    cancel(key) {
      let _this = this;
      deleteuser({id:key}).then((res)=>{
         this.getAllData();
          _this.msg = "删除成功!"
          _this.isShowWeakErr = true;                    
          setTimeout((e)=>{
              _this.isShowWeakErr = false;
              _this.msg = "1"
          },2000)
      }).catch((err)=>{
          _this.msg = "删除失败!"
          _this.isShowWeakErr = true;                    
          setTimeout((e)=>{
              _this.isShowWeakErr = false;
              _this.msg = "1"
          },2000)
      })
    },
    add(){
        this.addIsShow  = true;
    },
    not(){
        this.addIsShow  = false;
    },
    Ok(){
        let _this = this;
        let username = this.$refs.user.value;
        let password = this.$refs.pass.value;
        insertuser({username:username,password:password}).then((res)=>{
         _this.getAllData();
          _this.msg = "添加成功!";
          _this.editingKey = ''
          _this.isShowWeakErr = true;    
          this.addIsShow  = false;                
          setTimeout((e)=>{
              _this.isShowWeakErr = false;
              _this.msg = "1"
          },2000)
      }).catch((err)=>{
          _this.msg = "添加失败!"
          _this.isShowWeakErr = true;                    
          setTimeout((e)=>{
              _this.isShowWeakErr = false;
              _this.msg = "1"
          },2000)
      })
    }
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.allbooks{
  height: 100%;
}
.bookImg{
  width: 80px;
  height: 100px;
}
.addManage{
    position: absolute;
    top: 40%;
    left: 40%;
    width: 300px;
    padding: 20px;
    padding-top: 0px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ccc;
}
.addManage div{
    display: flex;
    margin-top: 20px;
}
.addManage span{
    display: inline-block;
    width: 70px;
    padding: 6px;
    margin-right: 10px;
}
.addManage button{
    margin-right: 20px;
    margin-top: 10px;
}
.addManage button:last-child{
    margin-right: 0px;
}
</style>
