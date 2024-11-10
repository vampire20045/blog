import mongoose from 'mongoose';

const categorySchema=new mongoose.Schema({
  title:{type:String, required:true},
  Image:{type:String,require:true},
  posts:[{type:mongoose.Schema.Types.ObjectId,ref:'BlogPost'}]
})
const Category = mongoose.model('Category', categorySchema);
const BlogSchema=new mongoose.Schema({
  title:{type:String,required:true},
  dis:{type:String,required:true},
  link:{type:String}
})
const BlogPost=mongoose.model('BlogPost',BlogSchema);

export { BlogPost, Category };
