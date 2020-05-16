<template>
  <div class="allbooks">
    <a-table :columns="boyColumns" :data-source="this.data" bordered>
    <template
      v-for="col in ['xuaho', 'book_name', 'book_type', 'book_desc']"
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
          <a @click="() => save(record.key)">保存</a>
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
import {girlbooks} from '../api/index'

export default {
  name:'GirlBooks',
  data() {
    
    return {
      data:[],
      boyColumns,
      editingKey: '',
    };
  },
  beforeMount(){
    this.getAllData();
  },
  methods: {
    getAllData(){
        girlbooks('').then((res)=>{
            console.log(res)
            for (let i = 0; i < res.data.length; i++) {
                this.data.push({
                key: i+1,
                xuaho: i+1,
                book_name: res.data[i].lable_list_name,
                book_type: res.data[i].lable_name,
                book_desc:res.data[i].lable_list,
                book_img:res.data[i].label_list_img,
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
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.key)[0];
      const targetCache = newCacheData.filter(item => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target); 
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = '';
      console.log(this.data)
      if (target) {
        // console.log(target)
        // Object.assign(target,[0]);
        delete target.editable;
        this.data =  this.cacheData.filter(item => key !== item.key);
        // console.log(newData)
      }
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
