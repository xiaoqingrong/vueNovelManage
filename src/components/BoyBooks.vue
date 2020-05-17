<template>
  <div class="allbooks">
    <a-table :columns="boyColumns" :data-source="this.data" bordered>
    <template slot="xuaho" slot-scope="text, record, index">
      {{text}}
    </template>
    <template
      v-for="col in ['book_name', 'book_type', 'book_desc']"
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
  </div>
</template>
<script>
import {boyColumns} from '../config/allbookSet.js'
import {boybooks, deleteBoyBooks, editBoyBooks} from '../api/index';
import ShowWeakErr from './ShowWeakErr';

export default {
  name:'BoyBooks',
  components:{
    ShowWeakErr
  },
  data() {
    return {
      data:[],
      boyColumns,
      editingKey: '',
      msg:"",
      isShowWeakErr:false,
      active:true
    };
  },
  beforeMount(){
    this.getAllData();
  },
  
  methods: {
    getAllData(){
        let _this = this;
      boybooks('').then((res)=>{
        _this.data = []
        for (let i = 0; i < res.data.length; i++) {
            _this.data.push({
            key: res.data[i].label_id,
            xuaho: i+1,
            book_name: res.data[i].lable_list_name,
            book_type: res.data[i].label_name,
            book_desc:res.data[i].lable_list,
            book_img:res.data[i].label_list_img,
            action:`${i}`
            });
        }
        _this.cacheData = _this.data.map(item => ({ ...item }));
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
      editBoyBooks({
        id:record.key,
        novel_name:record.book_name,
        novel_type:record.book_type,
        novel_desc:record.book_desc
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
    cancel(id) {
      let _this = this;
      deleteBoyBooks({id:id}).then((res)=>{
         _this.getAllData();
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
