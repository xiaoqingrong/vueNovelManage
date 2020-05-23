<template>
  <div class="allbooks">
    
    <a-table :columns="columns" :data-source="this.data" bordered>
    <template slot="xuaho" slot-scope="text, record, index">
      {{ text }}
    </template>
    <template
      v-for="col in ['book_name', 'book_author', 'book_isOver']"
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
    <template slot="book_img" slot-scope="text, record, index">
      <div class="editable-row-operations">
        <span>
          <img class="bookImg" :src=record.book_img alt="">
        </span>
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
        <span>
          <a :disabled="editingKey !== ''" @click="()=>createBook()">添加</a>
        </span>
        <span>
          <a :disabled="editingKey !== ''" @click="()=>createChapter(record)">添加章节</a>
        </span>
      </div>
    </template>
  </a-table>
  <ShowWeakErr class="active == true?'active:''" v-if="isShowWeakErr==true" :msg="msg"/>
    <div id="createBook" v-if="boxIsShow==true">
      <div>
          <span>书名:</span>
          <a-input
          style="margin: -5px 0"
          @change="e => handleChangeBookName(e.target.value)"
          />
      </div>
      <div>
          <span>作者:</span>
          <a-input
          style="margin: -5px 0"
          @change="e => handleChangeBookAuthor(e.target.value)"
          />
      </div>
      <div>
          <span>介绍：</span>
          <a-input
          style="margin: -5px 0"
          @change="e => handleChangeBookReduce(e.target.value)"
          />
      </div>
      <div>
          <span>图片地址:</span>
          <a-input
          style="margin: -5px 0"
          @change="e => handleChangeBookImg(e.target.value)"
          />
      </div>
      <div class="ationHandle">
          <a-button @click="e => createBookcancel()">取消</a-button><a-button type="primary" @click="e => confirm()">确定</a-button>
      </div>
    </div>
    <div id="addChapter" v-if="addChapterIsShow==true">
      <a-input type="text" placeholder="输入章节名称" style="margin:10px 0"
      @change="e => addChapterName(e.target.value)"
      />
      <textarea name="" id="addChapterval" cols="50" rows="12" placeholder="请输入章节内容"
      @change="e => addChapterContent(e.target.value)"
      />
      <div class="ationHandle" style="display:flex;justify-content: space-around;">
          <a-button @click="e => addChapterCancel()">取消</a-button><a-button type="primary" @click="e => addChapterConfirm()">确定</a-button>
      </div>
    </div>
  </div>
  
</template>
<script>
import {columns} from '../config/allbookSet.js'
import {allbooks, deleteBooks, editBooks, addBook, addChapter, haodema} from '../api/index';
import ShowWeakErr from './ShowWeakErr';

export default {
  name:'AllBooks',
  components:{
    ShowWeakErr
  },
  data() {
    return {
      data:[],
      columns,
      editingKey: '',
      msg:"",
      isShowWeakErr:false,
      active:true,
      boxIsShow:false,
      addChapterIsShow:false,
      book_name:'',
      book_author:'',
      book_introduction:'',
      book_img:'',
      createChapterparams:[],
      chaptercontent:'',
      chaptername:''
    };
  },
  mounted(){
    this.getAllData()
  },
  methods: {
    getAllData(){
      this.data = []
      allbooks('').then((res)=>{   
        for (let i = 0; i < res.data.length; i++) {
          this.data.push({
            key: res.data[i].id,
            xuaho: i+1,
            book_name: res.data[i].book_name,
            book_author: res.data[i].book_author,
            book_isOver:res.data[i].is_end == 'true'?'是':'否',
            book_img:res.data[i].book_img,
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
      editBooks({
        id:record.key,
        book_name:record.book_name,
        book_author:record.book_author,
        is_end:record.book_isOver=='是'?true:false
        }).then((res)=>{
         _this.getAllData();
          _this.msg = "修改成功!";
          this.editingKey = ''
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
      deleteBooks({id:key}).then((res)=>{
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
    createBook(){
      this.boxIsShow = true
    },
    handleChangeBookName(v){
        this.book_name = v;
    },
    handleChangeBookAuthor(v){
        this.book_author = v;
    },
    handleChangeBookReduce(v){
        this.book_introduction = v;
    },
    handleChangeBookImg(v){
        this.book_img = v;
    },
    createBookcancel(){
        this.boxIsShow = false
    },
    addChapterCancel(){
      this.addChapterIsShow = false
    },
    // 添加书籍
    confirm(){
        this.boxIsShow = false;
        let paramas = {
            book_name:this.book_name,
            book_author:this.book_author,
            book_introduction:this.book_introduction,
            book_img:this.book_img
            }
        addBook(paramas).then((res)=>{
            this.getAllData()
        }).catch((err)=>{
            console.log(err)
        })
    },
    addChapterName(v){
      this.chaptername = v
    },
    addChapterContent(v){
      this.chaptercontent = v
    },
    createChapter(e){
      this.addChapterIsShow = true
      this.createChapterparams = e
    },
    addChapterConfirm(){
      let _this =this;
      let paramas  = this.createChapterparams;
      haodema({bookid:paramas.key}).then((res)=>{
        addChapter({bookid:paramas.key,chapterid:res.data.length,chaptercontent:this.chaptercontent,chaptername:this.chaptername}).then((res)=>{
          this.addChapterIsShow = false
          _this.msg = "添加成功!"
          _this.isShowWeakErr = true;                    
          setTimeout((e)=>{
              _this.isShowWeakErr = false;
              _this.msg = "1"
          },2000)
        }).catch(err=>{
          console.log(err)
        })
      }).catch(err=>{
        console.log(err)
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

.addBook{
    position: absolute;
    top: 0;
    padding: 0 10px;
    left: 20%;
}
#addChapter{
    position:fixed;
    width: 400px;
    background-color: #ccc;
    left:30%;
    top:20%;
    padding: 0;
}
#createBook{
    position:fixed;
    width: 400px;
    background-color: #ccc;
    left:30%;
    top:20%;
    padding:0 20px;
    padding-bottom: 20px;
}
#createBook>div{
    display: flex;
    margin-top: 20px;
}
#createBook>div span{
    flex: 1;
    text-align: left;
}
#createBook>div input{
    flex: 3;
}
#createBook .ationHandle{
    display: flex;
    justify-content: space-around;
}
#createBook .ationHandle button{
    width: 30%;
}
</style>
