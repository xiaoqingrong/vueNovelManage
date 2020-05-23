<template>
  <div>
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: "ShowWeakErr",
  props: {
    msg: String
  },
  data(){
    return{
      
    }
  }
};
</script>

<style scoped lang="less">
p{
  position: fixed;
  display: inline-block;
  padding: 10px;
  top: 40%;
  left: 40%;
  color: aqua;
  font-size: 36px;
  color:#000
}
</style>
