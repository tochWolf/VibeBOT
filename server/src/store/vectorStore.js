const pdfStoreByUser = new Map();

export const setUserVectorStore = (userId, payload) => {
  pdfStoreByUser.set(userId, payload);
};

export const getUserVectorStore = (userId) => pdfStoreByUser.get(userId);
