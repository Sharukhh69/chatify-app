import mongoose from 'mongoose';
export const connectDB = async () => {
    try{
        if(!MONGO_URI) throw new Error('MONGO URI is not set');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    }catch(err){
        console.error(err);
        process.exit(1);//1=fail, 0=sucess
    }
}