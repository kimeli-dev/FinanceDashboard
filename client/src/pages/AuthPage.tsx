import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Lock, User, ChevronsRight, Mail } from "lucide-react";

export default function AuthPage() {
  const [, navigate] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");

  // Login form state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      username: loginUsername,
      password: loginPassword,
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({
      username: registerUsername,
      password: registerPassword,
      name: registerName,
      email: registerEmail,
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Column - Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-gray-900">
        <Card className="w-full max-w-md shadow-lg border-gray-700 bg-gray-800">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-6 w-6 text-primary-600" />
              <CardTitle className="text-2xl font-bold text-white">Smart Cafeteria Card</CardTitle>
            </div>
            <CardDescription>
              Enter your credentials to access your cafeteria card dashboard
            </CardDescription>
          </CardHeader>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Username</span>
                      </div>
                    </Label>
                    <Input 
                      id="username" 
                      placeholder="Enter your username" 
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span>Password</span>
                      </div>
                    </Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <div className="flex items-center">
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                        Logging in...
                      </div>
                    ) : (
                      "Log in"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Full Name</span>
                      </div>
                    </Label>
                    <Input 
                      id="register-name" 
                      placeholder="John Doe" 
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </div>
                    </Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-username">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Username</span>
                      </div>
                    </Label>
                    <Input 
                      id="register-username" 
                      placeholder="johndoe" 
                      value={registerUsername}
                      onChange={(e) => setRegisterUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span>Password</span>
                      </div>
                    </Label>
                    <Input 
                      id="register-password" 
                      type="password" 
                      placeholder="Create a password" 
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? (
                      <div className="flex items-center">
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Right Column - Hero */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-8 hidden md:flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Smart Cafeteria Card System
          </h1>
          <p className="text-lg mb-8">
            Manage your campus dining experience with our digital cafeteria card system. Track your balance, view transactions, and manage your account all in one place.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-white bg-opacity-20 p-2 rounded mr-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Digital Card Management</h3>
                <p className="text-white text-opacity-80">View balance in KES, check transaction history and manage your card security</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-white bg-opacity-20 p-2 rounded mr-4">
                <ChevronsRight className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Seamless Campus Dining</h3>
                <p className="text-white text-opacity-80">Quick payments at all campus cafeterias and dining locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}