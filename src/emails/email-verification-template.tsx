import * as React from "react";

interface EmailVerificationTemplateProps {
  name: string;
  token: string;
}

export const EmailVerificationTemplate: React.FC<
  Readonly<EmailVerificationTemplateProps>
> = ({ name, token }) => (
  <div>
    <h5>Welcome, {name}!</h5>
    <p>Please click on the below link to verify your email:</p>
    <p>{token}</p>
  </div>
);
