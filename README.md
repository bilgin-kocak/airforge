# AirForge: Accessible Smart Contract Generation for AirDAO

## Project Overview

AirForge is an innovative tool designed to streamline the process of creating, compiling, and deploying smart contracts on the AirDAO and other EVM networks. By leveraging AI-powered code generation and a user-friendly interface, AirForge makes blockchain development more accessible to developers of all skill levels.

## Features

- **AI-Powered Contract Generation**: Describe your desired smart contract functionality in natural language, and AirForge will generate the corresponding Solidity code.
- **Real-time Compilation**: Compile your generated contracts directly within the application, receiving immediate feedback on syntax and structure.
- **One-Click Deployment**: Deploy your contracts to the AirDAO network with a single click, simplifying the process of bringing your ideas to life.
- **Interactive UI**: User-friendly interface that guides developers through the entire process from contract description to deployment.
- **AirDAO Integration**: Seamlessly interact with the AirDAO network, aligning with their mission of creating the most accessible Layer 1 in the crypto industry.

## Technology Stack

- Frontend: React, Material-UI
- Backend: FastAPI (Python)
- Smart Contract: Solidity
- Blockchain Interaction: ethers.js
- AI Model: Anthropic's Claude API

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/bilgin-kocak/airforge.git
   cd airforge
   ```

2. Install dependencies:

   ```
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory with the following content:

   ```
   CLAUDE_API_KEY=your_claude_api_key
   ```

4. Run the application:

   ```
   # Backend
   cd backend
   uvicorn main:app --reload

   # Frontend (in a new terminal)
   cd frontend
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to use AirForge.

## Usage

1. Connect your wallet using the "Connect" button in the top right corner.
2. In the text area, describe the smart contract you want to create.
3. Click "Generate Contract" to receive AI-generated Solidity code.
4. Review the generated code and explanations.
5. Click "Compile Contract" to check for any errors.
6. Once compiled successfully, click "Deploy Contract" to deploy to the AirDAO network.

## Contributing

We welcome contributions to AirForge! Please feel free to submit issues, create pull requests, or fork the repository to make your own changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- AirDAO for sponsoring and providing the blockchain infrastructure
- Anthropic for the Claude AI model used in contract generation

## Contact

For any questions or feedback, please reach out to us at [kocakbilgin@gmail.com](mailto:kocakbilgin@gmail.com)

## Hackathon Submission Details

This project is submitted for the IstanHack 2024 hackathon, specifically for Side Track 2: Best infrastructure dapp.

### How was your experience developing on AirDAO?

Developing on AirDAO has been an enlightening and rewarding experience. The platform's focus on accessibility and developer-friendly tools aligns perfectly with our project's goals. We found the documentation comprehensive and the community supportive, which significantly eased the integration process. The emphasis on user experience in AirDAO's mission resonated with us, inspiring us to create a tool that makes smart contract development more approachable for developers of all levels.

Working with AirDAO's infrastructure highlighted the potential for creating more accessible blockchain solutions. We appreciated the smooth deployment process and the robustness of the network. This experience has reinforced our belief in the importance of user-centric design in blockchain technology, and we're excited to continue building on this foundation.
