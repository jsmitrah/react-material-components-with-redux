import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function ContactInputField() {
  const [phone, setPhone] = useState("");
  return (
    <PhoneInput
      placeholder="Enter phone number"
      searchPlaceholder="Search"
      inputStyle={{
        border: "none",
        borderRadius: 0,
        backgroundColor: "none",
        width: "auto",
        background: "transparent"
      }}
      containerStyle={{
        border: "none",
        borderBottom: "1px solid",
        borderRadius: 0,
        textAlign: "left",
        background: "transparent"
      }}
      buttonStyle={{
        border: "none",
        borderRadius: 0,
        background: "transparent"
      }}
      searchStyle={{ background: "transparent" }}
      country={"us"}
      value={phone}
      onChange={phone => setPhone(phone)}
    />
  );
}
export default ContactInputField;
