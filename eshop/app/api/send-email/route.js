import { Resend } from "resend";
import { EmailTemplate } from "../../_components/email-template";
import { Body } from "@react-email/components";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req) {
  //const Body = await req.json();

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["apion2005@gmail.com"],
      subject: "Orders From Eshop",
      react: EmailTemplate({ firstName: 'Alawy'}),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}