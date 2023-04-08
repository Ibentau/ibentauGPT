# Ibentau powered by GPT

A quick demo on how to make a knowledge based chatbot using OpenAI embedding and GPT-3 APIs

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have an OpenAI API key. To obtain one, sign up at [OpenAI](https://openai.com).
* You have a Pinecone API key. To obtain one, sign up at [Pinecone](https://www.pinecone.io/start/).

## Configuration

To configure your environment, create a `.env` file in the root directory of the project with the following content:

```dotenv
OPENAI_API_KEY=<your_openai_api_key>
PINECONE_API_KEY=<your_pinecone_api_key>
PINECONE_ENVIRONMENT=<your_pinecone_environment>
PINECONE_INDEX=<your_pinecone_index>
```

Replace `<your_openai_api_key>`, `<your_pinecone_api_key>`, `<your_pinecone_environment>`, and `<your_pinecone_index>` with the corresponding API keys and values from OpenAI and Pinecone.

## Installation

To install the required dependencies, follow these steps:

1. Clone the repository:
2. Change into the project directory
3. Install the required packages:

```bash
npm install
```

## Usage

To run the Ibentau chatbot, use the following command:

```bash
npm run generate_embeddings # Generate embeddings for the knowledge base
npm run build # Build the project
npm run preview # Start the chatbot
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
