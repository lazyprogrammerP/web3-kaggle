import { Web3Storage } from "web3.storage";

export const getAccessToken = () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIxMDBhQTA3N2MzODJiOTllOTZiQzc5YmVERmNGZGYwMTkzMDY1ODkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAwNTgyMTgyNTYsIm5hbWUiOiJ3ZWIzLWthZ2dsZSJ9.dHWqVG0Q89Q3V4425IYZe98v3gfpaPOh4nULvHciY00";
};

export default function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}
