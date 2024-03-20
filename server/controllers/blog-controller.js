import blogmodel from "../models/blog-model.js"
const addNewblog=async(req,res)=>{
    const{title,category,description}= req.body
    try {
        if(title && category && description && req.file && req.userId){
            const addBlog = new blogmodel({
                title:title,
                category:category,
                description:description,
                thumbnail:req.file.filename,
                user:req.userId
            })

            const savedBlog = await  addBlog.save();
            if(savedBlog){
                return res.status(200).json({message:"blog added successfully"})  
            }
            else{
                return res.status(200).json({message:"missing required fields"})
            }
        }
       
    } 
    catch (error) {
        return res.status(404).json({message:error.message})  
    }   
}


const getSingleblog=async(req,res)=>{
    const {id} = req.params;
    try {
        if(id){
            const fetchBlogById = await blogmodel.findById(id);
            return res.status(200).json(fetchBlogById)  
        }
        
        else{
            return res.status(404).json({message:"Invalid URL"})  
        }
        
    } 
    catch (error) {
        return res.status(404).json({message:error.message})  
         
    }
}


const getAllblogs=async(req,res)=>{
    try {
        const fetchAllBlogs = await blogmodel.find({user:req.userId})
        return res.status(200).json(fetchAllBlogs)
    } 
    catch (error) {
        return res.status(404).json({message:error.message})    
    }
}

export  { getAllblogs , addNewblog,getSingleblog};
