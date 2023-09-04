// register user function
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/users";
import { jwtSecret } from "../server";

export const registerUser = async (email: string, phoneNumber: number, password: string, temporaryHash: string) => {
  let newUserCreated;

  // hash password for storage
  let userpassword = await bcrypt.hash(password, 4);
  
  const newUser = new User({
    email: email,
    phoneNumber: phoneNumber,
    password: userpassword,
    tempHash: temporaryHash
  })

  // check if email and password exist before adding new user
     const takenEmail = await User.findOne({email: email});
     if (takenEmail){
      console.log("user already exists");
      const result = {
        success: false,
        alreadyExists: true,
        message: "A USER WITH THAT EMAIL ALREADY EXISTS"
      };
      return result;
     } else {
      try {
        // save new user
        newUserCreated = await newUser.save();;

        // if new user is added, send 'user created' response, and create and send token 
         if(newUserCreated){ 
          // create payload and token
          const payload = {
            id: newUser._id,
            email: newUser.email,
          };
          const token = jwt.sign(payload, jwtSecret, { expiresIn: 86400 });

          //successful registration message
          const result = {
            success: true,
            message: "REGISTRATION SUCCESSFUL",
            token: token
          };
          
          return result;

         }else {
          const result = {
            success: false,
            message: "THERE WAS A PROBLEM SETTING YOUR DETAILS. PLEASE TRY AGAIN"
          };
          return result;
         }
      } catch (error) {
        console.log(error);
        const result = {
          success: false,
          message: "THERE WAS A PROBLEM SETTING YOUR DETAILS. PLEASE TRY AGAIN"
        };
        return result;
      }
     }
}

// app.post("/register", async (req, res) => {
//     let newUserCreated;
//     let token;
//     let userCreationError;
//     const {email, phoneNumber, password} = req.body;
//     // hash password and create new user
//     let userpassword = await bcrypt.hash(password, 4);
//     const newUser = new User({
//       email: email,
//       phoneNumber: phoneNumber,
//       password : userpassword
//     });
    
//     // check if email and password exist before adding new user
//     const takenEmail = await User.findOne({email: email});
  
//     if(takenEmail) {
//       console.log("Username or email already exists");
//     } else {
//       try { 
//         newUser.save();
//         console.log("User successfully added");
//         newUserCreated = true;
//       } catch (error) {
//         userCreationError = error;
//         console.log(error);
//       }
  
//       if(newUserCreated){
//         try {
//           const payload = {
//             id: newUser.id,
//             email: newUser.email
//           }
//           token = jwt.sign(payload,
//           jwtSecret,
//           {expiresIn: 43200});
//         } catch (error) {
//           userCreationError = error;
//           console.log(error);
//         }
//       }
      
//     }
//     if(token){
//       sendConfirmationEmail();
//       res.status(201)
//       .json({
//         success: true,
//         data: {
//           token : token
//         }
//       });
//     }else if (userCreationError){
//       res.status(500)
//       .json({
//         success: false,
//         data: {
//           error: userCreationError    
//         }
//       });
//     }
//   })

  