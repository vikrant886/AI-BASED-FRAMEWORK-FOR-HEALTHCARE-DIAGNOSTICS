import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Brain, HeartPulse, XCircle, TestTube, Microscope } from "lucide-react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [selectedService, setSelectedService] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const COLORS = {
    velvetRed: "#8C1D40",
    deepGreen: "#2D5A27",
    royalBlack: "#121212",
    royalWhite: "#F5F5F5",
  };

  const validCredentials = { username: "admin", password: "hospital123" };

  const services = [
    { name: "Brain Tumor", type: "brain-tumor", icon: <Brain size={48} /> },
    { name: "Heart Disease", type: "heart-disease", icon: <HeartPulse size={48} /> },
    { name: "X-Ray Analysis", type: "x-ray", icon: <XCircle size={48} /> },
    { name: "Blood Reports", type: "blood-report", icon: <TestTube size={48} /> },
    { name: "Medical Scans", type: "medical-scan", icon: <Microscope size={48} /> },
  ];

  const handlePrediction = async () => {
    if (!uploadedFile) {
      alert("Please upload a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      // Make API call to Flask backend
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.prediction) {
        setPrediction(data.prediction);
      } else {
        alert("Prediction failed");
      }
    } catch (error) {
      console.error("Error making prediction:", error);
      alert("There was an error with the prediction.");
    }
  };

  const handleLogin = () => {
    if (
      credentials.username === validCredentials.username &&
      credentials.password === validCredentials.password
    ) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => setIsLoggedIn(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setPrediction(null);
    setUploadedFile(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  if (!isLoggedIn) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: COLORS.royalWhite }}
      >
        <Card className="w-[350px] shadow-lg">
          <CardHeader>
            <CardTitle>Healthcare AI Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="mb-4"
            />
            <Input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="mb-4"
            />
            <Button
              onClick={handleLogin}
              className="w-full"
              style={{ backgroundColor: COLORS.velvetRed }}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedService) {
    return (
      <div
        className="min-h-screen p-8"
        style={{ backgroundColor: COLORS.royalWhite }}
      >
        <div className="flex justify-between mb-8">
          <h2
            className="text-2xl font-bold"
            style={{ color: COLORS.deepGreen }}
          >
            Hospital Name
          </h2>
          <Button
            onClick={handleLogout}
            style={{ backgroundColor: COLORS.velvetRed }}
          >
            Logout
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.name}
              onClick={() => handleServiceSelect(service)}
              className="cursor-pointer hover:shadow-xl transition-shadow"
            >
              <CardHeader className="flex items-center justify-center">
                {service.icon}
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold">{service.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: COLORS.royalWhite }}
    >
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.deepGreen }}>
          Hospital Name
        </h2>
        <Button
          onClick={handleLogout}
          style={{ backgroundColor: COLORS.velvetRed }}
        >
          Logout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{selectedService.name} Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Input type="file" onChange={handleFileUpload} className="mb-4" />
          <Button
            onClick={handlePrediction}
            disabled={!uploadedFile}
            style={{ backgroundColor: COLORS.deepGreen }}
          >
            Analyze
          </Button>
          {prediction && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3>Prediction Result:</h3>
              <p>{prediction}</p>
            </div>
          )}
          <Button
            onClick={() => setSelectedService(null)}
            variant="outline"
            className="mt-4"
          >
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
