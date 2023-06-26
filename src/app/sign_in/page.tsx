import { SignIn } from "@clerk/nextjs/app-beta";
import React from "react";

const Page = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="flex justify-center">
          <SignIn />
        </div>
      </div>
    </section>
  );
};

export default Page;
