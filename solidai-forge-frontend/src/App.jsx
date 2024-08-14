import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ReactMarkdown from "react-markdown";
import "@rainbow-me/rainbowkit/styles.css";
import Footer from "./components/Footer";
// import { Parallax } from "react-parallax";
// import { motion } from "framer-motion";
// import { FaRocket, FaCode, FaPaperPlane } from "react-icons/fa";
// import { Button, FeatureCard, LoadingSpinner } from "./components/CustomComponents";
// import "./styles/styles.css";
// import { parallaxMouseMovement, parallaxScroll } from "@/utils/parallax";

// import { init_wow } from "@/utils/initWowjs";
// import { headerChangeOnScroll } from "@/utils/changeHeaderOnScroll";

const DEFAULT_DESCRIPTION = `Create a Solidity smart contract for a simple ERC20 token with the following features:
1. The token should be named "ExampleToken" with the symbol "EXT".
2. Set a fixed total supply of 1,000,000 tokens.
3. Include functions for transferring tokens between addresses.
4. Implement a function to check the balance of an address.
5. Add a minting function that only the contract owner can use.
6. Include events for transfers and minting.
Please provide the contract code along with brief explanations for each main component.`;

export default function App() {
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
  const [generatedCode, setGeneratedCode] = useState("");
  const [firstExplanation, setFirstExplanation] = useState("");
  const [lastExplanation, setLastExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [compiledContract, setCompiledContract] = useState(null);
  const [deployedAddress, setDeployedAddress] = useState("");

  const { address, isConnected } = useAccount();

  // const API_URL = "http://localhost:8000";
  const API_URL = "https://airforge-backend-f32c6563548d.herokuapp.com";

  const handleGenerateContract = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(API_URL + "/generate_contract", {
        description,
      });
      setGeneratedCode(response.data.code);
      setFirstExplanation(response.data.first_explanation);
      setLastExplanation(response.data.last_explanation);
    } catch (err) {
      setError(
        "An error occurred while generating the contract. Please try again."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const compileContract = async () => {
    try {
      const response = await axios.post(API_URL + "/compile_contract", {
        code: generatedCode,
      });
      setCompiledContract(response.data);
      console.log("Contract compiled successfully");
    } catch (err) {
      console.error("Compilation failed:", err);
      setError(
        "Contract compilation failed. Please check the code and try again."
      );
    }
  };

  const deployContract = async () => {
    if (!isConnected) {
      setError("Please connect your wallet first.");
      return;
    }
    if (!compiledContract) {
      setError("Please compile the contract first.");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const factory = new ethers.ContractFactory(
        compiledContract.abi,
        compiledContract.bytecode,
        signer
      );
      const contract = await factory.deploy();
      await contract.deployed();
      console.log("Contract deployed to:", contract.address);
      setDeployedAddress(contract.address);
    } catch (err) {
      console.error("Deployment failed:", err);
      setError("Contract deployment failed. Please try again.");
    }
  };

  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     minHeight: "100vh", // Ensures the footer stays at the bottom
    //   }}
    // >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      <Container maxWidth="md" sx={{ width: "100%" }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          AirForge
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Generate, Compile, and Deploy Solidity Smart Contracts
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <ConnectButton />
        </Box>
        <Paper elevation={3} sx={{ p: 3, my: 3, width: "100%" }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Describe your smart contract"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleGenerateContract}
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? <CircularProgress size={24} /> : "Generate Contract"}
          </Button>
        </Paper>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {firstExplanation && (
          <Paper elevation={3} sx={{ p: 3, my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Explanation
            </Typography>
            <Typography variant="body1">{firstExplanation}</Typography>
          </Paper>
        )}
        {generatedCode && (
          <Paper elevation={3} sx={{ p: 3, my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Generated Solidity Contract
            </Typography>
            <Box
              component="pre"
              sx={{
                backgroundColor: "#f5f5f5",
                p: 2,
                borderRadius: 1,
                overflowX: "auto",
              }}
            >
              <code>{generatedCode}</code>
            </Box>
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button variant="contained" onClick={compileContract}>
                Compile Contract
              </Button>
              <Button
                variant="contained"
                onClick={deployContract}
                disabled={!compiledContract || !isConnected}
              >
                Deploy Contract
              </Button>
            </Box>
          </Paper>
        )}
        {lastExplanation && (
          <Paper elevation={3} sx={{ p: 3, my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Additional Explanation
            </Typography>
            <Box
              sx={{
                "& a": { color: "primary.main" },
                "& code": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  padding: "2px 4px",
                  borderRadius: "4px",
                },
                "& pre": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  padding: "8px",
                  borderRadius: "4px",
                  overflowX: "auto",
                },
              }}
            >
              <ReactMarkdown>{lastExplanation}</ReactMarkdown>
            </Box>
          </Paper>
        )}
        {deployedAddress && (
          <Paper elevation={3} sx={{ p: 3, my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Deployed Contract Address
            </Typography>
            <Typography variant="body1">{deployedAddress}</Typography>
          </Paper>
        )}
      </Container>
    </Box>
    //   <Footer />
    // </Box>
  );
}
