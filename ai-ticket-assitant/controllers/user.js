import brcypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

import { inngest } from '../inngest/client.js';

export const signup = async (req, res) => {

    const { email, password,skills=[] } = req.body;
  try {
    
    const hashed=await brcypt.hash(password, 10);
   const user=await User.create({email,password:hashed,skills});
// FIRE inngest event
await inngest.send({
    name:"user/signup",
    data : {
        email  
    }
});

const token=jwt.sign({
    _id: user._id,
    role: user.role,

},process.env.JWT_SECRET);


res.json({user,token});
  

} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.error('Error during signup:', error);
}

}


export const login = async (req, res) => {
    const { email, password} = req.body;
    try{
    const user =User.findOne({ email });
    if(!user) return res.status(404).json({ error: 'User not found' }); 
   
    const isMatch = await brcypt.compare(password, user.password)
     
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
     }

    const token=jwt.sign({
    _id: user._id,
    role: user.role,

},process.env.JWT_SECRET);


res.json({user,token});
    
    
    }catch (error) {

 res.status(500).json({ error: 'Internal server error' });
    console.error('Error during LOGIN:', error);

    }
}


export const logout = async (req, res) => {
   
  try{
    const token=req.headers.authorization.split(" ")[1];
       if(!token) {
        return res.status(401).json({ error: 'Unauthorized' });
       }

       jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        return res.json({ message: 'Logged out successfully' });
         });
  }catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}


export const updateUser=async (req, res) => {
    const {skills=[],role,email}=req.body;

    try{
         if(req.user?.role !== 'admin' ) {
        return res.status(403).json({ error: 'Forbidden' });
         }

       const user=await User.findOne({email})
         if(!user) return res.status(401).json({ error: 'User not found' });

         await User.updateOne(
            { email },
            { skills: skills.length ? skills : user.skills, role }
         )
            return res.json({ message: 'User updated successfully' });
    }catch (error) {
  res.status(500).json({ error: 'Update failed',details:error.message });
    }

}


export const getUser=async (req, res) => {
    try{
        if(req.user?.role !== 'admin' ) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const user = await User.find().select('-password');
      return res.json(user);
    }catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }

}