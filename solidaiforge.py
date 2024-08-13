import streamlit as st
import requests
import anthropic
import json
import re
import os

# Replace with your actual API key
CLAUDE_API_KEY = os.getenv("CLAUDE_API_KEY")
CLAUDE_API_URL = "https://api.anthropic.com/v1/messages"

CLAUDE_CLIENT = anthropic.Anthropic(api_key=os.environ.get("CLAUDE_API_KEY"))

DEFAULT_DESCRIPTION = """Create a Solidity smart contract for a simple ERC20 token with the following features:
1. The token should be named "ExampleToken" with the symbol "EXT".
2. Set a fixed total supply of 1,000,000 tokens.
3. Include functions for transferring tokens between addresses.
4. Implement a function to check the balance of an address.
5. Add a minting function that only the contract owner can use.
6. Include events for transfers and minting.
Please provide the contract code along with brief explanations for each main component."""

def parse_llm_output(output):
    # Extract code
    code_match = re.search(r'`solidity(.*?)`', output, re.DOTALL)
    code = code_match.group(1).strip() if code_match else ""
    
    # Extract explanation
    explanation = re.sub(r'`solidity.*?`', '', output, flags=re.DOTALL)
    explanation = explanation.strip()

    first_explanation = output.split('```')[0]
    last_explanation = output.split('```')[-1]
    
    return code, first_explanation, last_explanation


def generate_smart_contract(description):
    headers = {
        "Content-Type": "application/json",
        "X-API-Key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"  # Add this line
    }
    
    data = {
        "model": "claude-3-sonnet-20240229",
        "messages": [
            {
                "role": "system",
                "content": "You are an expert Solidity developer. Generate a Solidity smart contract based on the user's description."
            },
            {
                "role": "user",
                "content": f"Create a Solidity smart contract with the following description: {description}"
            }
        ],
        "max_tokens": 1000
    }

    prompt = f"Create a Solidity smart contract with the following description: {description}"
    
    try:
        response = CLAUDE_CLIENT.messages.create(
                    model="claude-3-5-sonnet-20240620",
                    max_tokens=1024,
                    messages=[{"role": "user", "content": prompt}],
                )
        return response.content[0].text.strip()
        # response = requests.post(CLAUDE_API_URL, headers=headers, json=data)
        # response.raise_for_status()  # Raises an HTTPError for bad responses
        
        # response_data = response.json()
        # return response_data['content'][0]['text']
    except requests.exceptions.RequestException as e:
        return f"Error: {str(e)}"

def main():
    st.title("SolidAI Forge")
    st.write("Generate Solidity smart contracts using AI")

    description = st.text_area("Describe your smart contract:", value=DEFAULT_DESCRIPTION, height=300)
    
    if st.button("Generate Contract"):
        if description:
            with st.spinner("Generating smart contract..."):
                llm_output = generate_smart_contract(description)
                if llm_output.startswith("Error:"):
                    st.error(llm_output)
                else:
                    code, first_explanation, last_explanation = parse_llm_output(llm_output)
                    
                    st.subheader("Generated Solidity Contract")
                    st.write(first_explanation)
                    st.code(code, language="solidity")
                    
                    st.subheader("Explanation")
                    st.write(last_explanation)
        else:
            st.warning("Please provide a description for your smart contract.")


if __name__ == "__main__":
    main()