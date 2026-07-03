import bcrypt from "bcryptjs";

const hashPass = await bcrypt.hash("password@123", 10);  //10 is a cost factor and common value //8 is also common but less secure. 12 is more secure but slower. //12 is default

console.log(hashPass);