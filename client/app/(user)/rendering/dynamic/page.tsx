import { db } from "@/config/db"
import { RowDataPacket } from "mysql2";

interface Doctor extends RowDataPacket {
    doctor_id: number;
    first_name: string;
}
interface DoctorListsProps {
    doctors: Doctor[];
}

export const dynamic = "force-dynamic";

const DynamicPage = async () => {
    const [doctors] = await db.execute<Doctor[]>("SELECT * FROM doctors");
    console.log("fetching doctors");

    return (
        <>
            <p>Total Doctors:{doctors.length}</p>
            <DoctorLists doctors={doctors} />
        </>
    );
};

export default DynamicPage;

const DoctorLists = async ({ doctors }: DoctorListsProps) => {
        const [doctor] = await db.execute<Doctor[]>("SELECT * FROM doctors");
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