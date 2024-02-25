'use client'

import Input from "@/components/global/Input";
import Submit from "@/components/login/Submit";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();

  const name = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("")

  const submit = async () => {
    if (name.current != null && password.current != null) {
      const response = await fetch("/api/login",
        {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.current.value, password: password.current.value })
        })

      if (response.status != 200) {
        setError(await response.json())
        console.log(await response.json())
      } else {
        localStorage.setItem("token", await response.json())
        router.push("/home")
      }
    }
  }

  return (
    <div className="flexCenter h-100vh">
      <div className="flex column gap-25px">
        <div>
          <Input label="Nom" inputRef={name} />
        </div>
        <div>
          <Input label="Mot de passe" inputRef={password} />
        </div>
        <div>
          <p className="red">{error}</p>
        </div>
        <div>
          <Submit onSubmit={submit} />
        </div>
      </div>
    </div>
  );
}
