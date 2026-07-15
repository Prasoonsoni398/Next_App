import { db } from "@/config/db"
import { RowDataPacket } from "mysql2";

interface Doctor extends RowDataPacket {
  doctor_id: number;
  first_name: string;
}

const StaticPage = async () => {
   const [doctors] = await db.execute<Doctor[]>("SELECT * FROM doctors");
    // console.log(doctors);

    return (
        <>
            <ul>
                {doctors.map((doctor)=>{
                    return<li key = {doctor.doctor_id}> {doctor.first_name}</li>})
                }
            </ul>
        </>
    );
};

export default StaticPage;