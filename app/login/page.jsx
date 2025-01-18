"use client";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const BaseApiUrl = "https://istd-api.vercel.app/api";
const LoginPage = () => {
    const router = useRouter();

  const clientId = "976004726633-qd21qspr0t0hep43vup331of8aq1u8je.apps.googleusercontent.com";
  // 768974449019-60pn6e18b4grspfbhr7bs388k5g97sm2.apps.googleusercontent.com


  const onSignupSuccess = async (res) => {
    console.log(res.email);
    console.log(res.name);

    const response = await fetch(`${BaseApiUrl}/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: res.name, email: res.email }),
    });
    const json = await response.json();

    if (json) {
      localStorage.setItem("token", json.authToken);
      router.push("/dashboard");
    }
  };

  const onSignupFailure = () => {
    console.log("Some error are occuring please try again.");
  };
    return ( <div>
        <div className="grid grid-cols-1 gap-3 mt-5 justify-items-center w-full">
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                buttonText="Signup With Google"
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  onSignupSuccess(decoded);
                  console.log(decoded);
                }}
                onError={onSignupFailure}
              />
            </GoogleOAuthProvider>
          </div>
    </div> );
}
 
export default LoginPage;