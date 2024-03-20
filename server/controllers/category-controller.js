import categoryModel from "../models/category-model.js";
const addNewCategory=async(req,res)=>{
   const{title} = req.body;
   try {
    if(title){
        const newCategory = new categoryModel({
            title:title
        })
        const savedCategory = await newCategory.save();
        if(savedCategory){
            return res.status(200).json({message:"category added successfully"})
        }
    }
    else{
        return res.status(404).json({message:"all fields are required"})
    }
   } 
   catch (error) {
    return res.status(404).json({message:error.message})
   }
}

const getAllCategories=async(req,res)=>{
    try {
        const fetchAllCategories = await categoryModel.find({})
        return res.status(200).json(fetchAllCategories)
    } 
    catch (error) {
        return res.status(404).json({message:error.message})    
    }
}


export {addNewCategory,getAllCategories};
