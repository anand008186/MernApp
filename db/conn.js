const mongoose =require('mongoose');
const DB = process.env.DATABASE;

mongoose.connect(DB ).then(()=>{console.log('connection successful to remote database');
}).catch((err)=>{console.log(err);})
