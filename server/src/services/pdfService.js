import fs from 'fs/promises';
import pdf from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { setUserVectorStore, getUserVectorStore } from '../store/vectorStore.js';

export const ingestPdfForUser = async ({ userId, filepath, filename }) => {
  const dataBuffer = await fs.readFile(filepath);
  const parsed = await pdf(dataBuffer);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200
  });

  const docs = await splitter.createDocuments([parsed.text], [{ source: filename }]);
  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY })
  );

  setUserVectorStore(userId, { vectorStore, filename });

  return { pages: parsed.numpages, chunks: docs.length, filename };
};

export const queryPdfContext = async ({ userId, question }) => {
  const userStore = getUserVectorStore(userId);
  if (!userStore) {
    throw new Error('No PDF found. Upload a PDF first.');
  }

  const docs = await userStore.vectorStore.similaritySearch(question, 4);
  const context = docs.map((doc, idx) => `Context ${idx + 1}: ${doc.pageContent}`).join('\n\n');

  return { context, filename: userStore.filename };
};
