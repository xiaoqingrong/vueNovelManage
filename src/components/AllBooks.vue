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
      </div>
    </template>
  </a-table>
  <ShowWeakErr class="active == true?'active:''" v-if="isShowWeakErr==true" :msg="msg"/>
  </div>
</template>
<script>
import {columns} from '../config/allbookSet.js'
import {allbooks, deleteBooks, editBooks} from '../api/index';
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
      active:true
    };
  },
  beforeMount(){
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
</style>
