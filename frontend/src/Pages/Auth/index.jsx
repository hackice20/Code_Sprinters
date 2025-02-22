import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";

const Auth = () => {
  const [tab, setTab] = useState("login");

  return (
    <div className="h-[100vh] inset-0 bg-gradient-to-r from-purple-600/10 to-orange-500/10 flex justify-center items-center">
      <Tabs
        defaultValue="login"
        value={tab}
        onValueChange={setTab}
        className="w-[400px]"
      >
        <TabsList className="flex justify-center space-x-4 bg-white">
          <TabsTrigger
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white w-full"
            value="login"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white w-full"
            value="register"
          >
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="bg-white p-5 rounded-md">
          <Login setTab={setTab}/>
        </TabsContent>
        <TabsContent value="register" className="bg-white p-5 rounded-md">
          <Register setTab={setTab}/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
