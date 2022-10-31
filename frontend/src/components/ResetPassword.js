import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

function ResetPassword() {
  const [resetEmail, setResetEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  return (
    <div className="reset-password-form">
      <label htmlFor="reset-email">Email:</label>
      <input
        type="text"
        name="reset-email"
        id="reset-email"
        value={resetEmail}
        onChange={(e) => setResetEmail(e.target.value)}
        placeholder="E-mail address"
      ></input>
      <button
        onClick={async () => {
          await sendPasswordResetEmail(resetEmail);
        }}
      >
        Send password reset
      </button>
      {error ? (
        <div>
          <p>Error: {error.message}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ResetPassword;
