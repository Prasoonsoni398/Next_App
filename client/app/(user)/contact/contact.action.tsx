"use server";

interface ContactActionProps {
  fullName: string;
  email: string;
  message: string;
}

import { db } from "@/config/db";
import { redirect } from "next/navigation";

export const contactAction = async (formData: FormData) => {
  // console.log("previousState", previousState);
  try {
    const { fullName, email, message } = Object.fromEntries(
      formData.entries(),
    ) as {
      fullName: string;
      email: string;
      message: string;
    };

    await db.execute(
      `INSERT INTO contact_form (full_name, email, message)
     VALUES (?, ?, ?)`,
      [fullName, email, message],
    );

    return {
      success: true,
      message: "Form submitted successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Error while submitting form",
    };
  }
};

// redirect() is a server-only function. It throws a special Next.js response to perform a server-side redirect — which only works during server-side rendering (SSR), server actions, or loaders.
