import { EmailVerificationTemplate } from "@/emails/email-verification-template";
import { resend } from "@/lib/resend";

export async function sendVerificationEmail(
  name: string,
  email: string,
  token: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Simple CRM <info@cooltechdesign.com>",
      to: email,
      subject: "Simple CRM | Email Verification",
      text: "fallback",
      react: EmailVerificationTemplate({ name, token }),
    });

    if (error) {
      console.error(error);
    }

    return { message: "Verification email sent successfully", success: true };
  } catch (error: any) {
    return { message: error?.message, success: false };
  }
}
