import {error, json} from '@sveltejs/kit';
import type {RequestHandler} from './$types';
import {OPENAI_API_KEY} from '$env/static/private';
import {PineconeStore} from "langchain/vectorstores";
import {OpenAIEmbeddings} from "langchain/embeddings";
import {pineconeIndex} from "../../../lib/pinecone";
import {VectorDBQAChain} from "langchain/chains";
import {OpenAI} from "langchain";

export const POST = (async ({request}) => {


    const {text} = await request.json();
    if (!text) {
        throw error(400, 'Missing text');
    }
    if (text.length > 200) {
        throw error(400, 'Text too long');
    }

    try {
        const vectorStore = await PineconeStore.fromExistingIndex(
            new OpenAIEmbeddings({
                openAIApiKey: OPENAI_API_KEY,
            }),
            { pineconeIndex }
        );


        /* Search the vector DB independently with meta filters */
        // const results = await vectorStore.similaritySearch("How to get to Rennes ?", 1);

        const model = new OpenAI({
            openAIApiKey: OPENAI_API_KEY,
        });
        const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
            k: 1,
            returnSourceDocuments: true,
        });
        const response = await chain.call({ query: text });
        const {text: responseText, sourceDocuments} = response;

        return json({
            text: responseText,
            source: sourceDocuments[0]?.pageContent ?? "No source document found",
        })
    } catch (e) {
        console.log(e)
        throw error(500, 'Internal Server Error')
    }


}) satisfies RequestHandler;
