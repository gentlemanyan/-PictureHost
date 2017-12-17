## 开发是遇到的问题记录，2017/12/17 Night 24:00开始
1、mongodb数据插入时，有些字段只有具有唯一性，当违反唯一约束条件报错时如何更友好的显示错误信息。   
解决办法：安装mongoose-beautiful-unique-validation包，在mongoose定义scheme时，添加unique属性，值为错误的提示  
例如：
<pre>
const userSchema = mongoose.Schema({
  name: { 
    type: String,
    unique: '名称已被使用'
  }
})

</pre>