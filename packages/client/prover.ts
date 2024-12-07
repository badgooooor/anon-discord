import { noirBackend, noirInstance } from "./instance";

export const generateProof = async (
  server_id: string,
  user_id: string,
  required_role_id: string,
  user_role_ids: string[]
) => {
  try {
    const { witness } = await noirInstance.execute({
      server_id,
      user_id,
      required_role_id,
      user_role_ids: fillEmptyField(user_role_ids, 5)
    });
    const proof = await noirBackend.generateProof(witness);

    return proof;
  } catch (err) {
    console.error('Error on generating proof', err);
  }
}

// Utility: Fill empty fields
const fillEmptyField = (arr: any[], requiredLength: number): any[] => {
  const currentLength = arr.length;
  if (currentLength >= requiredLength) {
    return arr;
  }
  
  return arr.concat(Array(requiredLength - currentLength).fill('0'));
}
