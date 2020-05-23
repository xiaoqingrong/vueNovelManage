<template>
<div>
  <a-button type="primary" @click="() => showAddBookBox()" style="float:right;position:absolute;top:16px;right:100px">添加书籍</a-button>
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
              <a-menu-item key="1" @click="()=>this.choludAddBook(1)">
                <router-link to="/allBooks">
                  全部
                </router-link>                
              </a-menu-item>
              <a-menu-item key="2" @click="()=>this.choludAddBook(2)">
                <router-link to="/boyBooks">
                  男生
                </router-link>
                
              </a-menu-item>
              <a-menu-item key="3" @click="()=>this.choludAddBook(3)">
                <router-link to="/girlbooks">
                  女生
                </router-link>
              </a-menu-item>
              <a-menu-item key="4" @click="()=>this.choludAddBook(4)">
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
  </a-layout>
  <button class="outLogin" style="font-size:20px;color:blue;float:right;margin-top:14px" @click="()=>out()">
         退出
  </button>
  
  <div id="allbooksDiv" v-if="allbooksDivIsShow == true">
    <div>
      <a-table 
    :columns="allcolumns" 
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    :data-source="this.getData" bordered>
      <template slot="xuaho" slot-scope="text, record, index">
        {{ text }}
      </template>
      <template
        v-for="col in ['book_name', 'book_author', 'book_introduction','book_img']"
        :slot="col"
        slot-scope="text, record, index"
      >
        <div :key="col">
          <template>
            {{ text }}
          </template>
        </div>
      </template>
    </a-table>
    </div>
    <div class="ationHandle">
          <a-button @click="e => createBookcancel()">取消</a-button><a-button type="primary" @click="e => confirm()">确定</a-button>
      </div>
  </div>
</div>
</template>

<script>
import {allcolumns} from '../config/allbookSet.js'
import { allbooks, addBook, classfyType, addBoyBook, classfyGrilType, addGirlBook, classfyPublishType, addPublishBook } from '../api/index';
export default {
  name: "Home",
  data(){
    return{
      msg:'00',
      allcolumns,
      getData:[],
      selectedRowKeys: [],
      allbooksDivIsShow:false,
      couildAddBook:1
    }
  },
  mounted(){
    this.$router.push('/allBooks');
    this.getAllData()
  },
  methods:{
    choludAddBook(status){
      if(status ===1){
        this.couildAddBook = 1;
      }else if(status ===2){
        this.couildAddBook = 2;
      }else if(status ===3){
        this.couildAddBook = 3;
      }else if(status ===4){
        this.couildAddBook = 4;
      }
    },
    out(){
      localStorage.setItem('login',"");
      this.$router.push('/login');
    },
    getAllData(){
      let data  =[]
      allbooks('').then(res=>{
        for (let i = 0; i < res.data.length; i++) {
          data.push({
            key: res.data[i].id,
            xuaho: i+1,
            book_name: res.data[i].book_name,
            book_author: res.data[i].book_author,
            book_introduction:res.data[i].book_introduction,
            book_img:res.data[i].book_img,
            action:`${i}`
          });
        }
        this.getData = data.map(item => ({ ...item }));
      }).catch(err=>{
        console.log(err)
      })
    },
    showAddBookBox(){
      if(this.couildAddBook !== 1){
        this.allbooksDivIsShow = true
      }      
    },
    createBookcancel(){
      this.allbooksDivIsShow = false
    },
    onSelectChange(e) {
      this.selectedRowKeys = e;
    },
    confirm(){
      let addData = this.getData;
      let addParams  =[];
      let addBookType = [];
      let id = null;
      let label_name = null;
      let label_img = null;
      for (let i = 0; i < addData.length; i++) {
        if(addData[i].key==this.selectedRowKeys[0]){
          addParams = addData[i]
        }
      }
      if(this.couildAddBook === 2){
        classfyType({bookid:this.selectedRowKeys[0]}).then(res=>{
          addBookType = res.data;
          if(res.data.length !==0 ){
            id = res.data[0].id;
            label_name = res.data[0].label_name;
            label_img = res.data[0].label_img;
          }
          let config = {
            id:id,
            bookId:addParams.key,
            labelName:label_name,
            labelImg:label_img,
            lableList:addParams.book_introduction,
            lableListName:addParams.book_name,
            labelListImg:addParams.book_img,
          }
          addBoyBook(config).then(res=>{
            this.allbooksDivIsShow = false
          }).catch(err=>{
            console.log(err)
          })
        })
      }else if(this.couildAddBook === 3){
        classfyGrilType({bookid:this.selectedRowKeys[0]}).then(res=>{
          addBookType = res.data;
          if(res.data.length !==0 ){
            id = res.data[0].id;
            label_name = res.data[0].label_name;
            label_img = res.data[0].label_img;
          }
          let config = {
            id:id,
            bookId:addParams.key,
            labelName:label_name,
            labelImg:label_img,
            lableList:addParams.book_introduction,
            lableListName:addParams.book_name,
            labelListImg:addParams.book_img,
          }
          addGirlBook(config).then(res=>{
            this.allbooksDivIsShow = false
          }).catch(err=>{
            console.log(err)
          })
        })
      }else if(this.couildAddBook === 4){
        classfyPublishType({bookid:this.selectedRowKeys[0]}).then(res=>{
          addBookType = res.data;
          if(res.data.length !==0 ){
            id = res.data[0].id;
            label_name = res.data[0].label_name;
            label_img = res.data[0].label_img;
          }
          let config = {
            id:id,
            bookId:addParams.key,
            labelName:label_name,
            labelImg:label_img,
            lableList:addParams.book_introduction,
            lableListName:addParams.book_name,
            labelListImg:addParams.book_img,
          }
          addPublishBook(config).then(res=>{
            this.allbooksDivIsShow = false
          }).catch(err=>{
            console.log(err)
          })
        })
      }
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
  height: 100%;
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
#allbooksDiv{
  position: absolute;
  top: 10%;
  left: 10%;
  
  padding: 10px;
  border: 4px solid #ddd;
  background-color: aliceblue;
}
#allbooksDiv>div:first-child{
  width: 1000px;
  height: 500px;
  overflow: auto;
}
#allbooksDiv>div{
  padding: 10px;
}
#allbooksDiv td{
  height: 100px!important;
  overflow: hidden;
}
#allbooksDiv button{
  margin-left: 20px;
}
</style>