import mongoose from 'mongoose';
const categorySchema=new mongoose.Schema({
  title:{type:String, required:true},
  dis:{type:String},
  Image:{type:String,require:true},
  posts:[{type:mongoose.Schema.Types.ObjectId,ref:'Blog'}]
})
const Category = mongoose.model('Category', categorySchema);
const BlogSchema=new mongoose.Schema({
  title:{type:String,required:true},
  dis:{type:String},
  link:{type:String},
  author:{type:String},
  User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

})
const Blog=mongoose.model('Blog',BlogSchema);

export { Blog, Category };
