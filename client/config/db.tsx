import mysql from "mysql2/promise"

// mysql.createConnection()
export const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"StrongPassword_123",
    database:"hospital_db"
})


try{
    const connection = await db.getConnection()
    console.log("Database Connected Successfully");
    connection.release()
}
catch(err){
    console.log("Database connection failed:",err);
    process.exit(1)
    
}