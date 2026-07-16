import { db } from "@/config/db"
import { RowDataPacket } from "mysql2";
import { cache } from "react"


interface Doctor extends RowDataPacket {
    doctor_id: number;
    first_name: string;
}
interface DoctorListsProps {
    doctors: Doctor[];
}

export const dynamic = "force-dynamic";

const DynamicPage = async () => {

    const doctors = await getAllDoctors()

    return (
        <>
            <p>Total Doctors:{doctors.length}</p>
            <DoctorLists />
        </>
    );
};

export default DynamicPage;

const DoctorLists = async () => {
    const doctors = await getAllDoctors()
    return (
        <>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.doctor_id}>
                        {doctor.first_name}
                    </li>
                ))}
            </ul>
        </>
    )

}

const getAllDoctors = cache(async () => {
    const [doctors] = await db.execute<Doctor[]>("SELECT * FROM doctors");
    console.log("fetching doctors");
    return doctors; 
})