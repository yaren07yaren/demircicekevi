import { db, auth } from "../firebase";
import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  deleteDoc, 
  writeBatch
} from "firebase/firestore";
import { FlowerItem } from "../types";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error("Firestore Error Detailed: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Fetch all products from collection "products".
 * If the collection is empty, seed it with the default FLOWER_PRODUCTS.
 */
export async function getProductsFromFirestore(defaultProducts: FlowerItem[]): Promise<FlowerItem[]> {
  const path = "products";
  try {
    const querySnapshot = await getDocs(collection(db, path));
    const products: FlowerItem[] = [];
    
    querySnapshot.forEach((docSnap) => {
      products.push(docSnap.data() as FlowerItem);
    });

    // If Firestore is empty (first time load), seed it with default products
    if (products.length === 0 && defaultProducts.length > 0) {
      console.log("No products found in Firestore. Seeding default products...");
      await seedProducts(defaultProducts);
      return defaultProducts;
    }

    // Return products sorted by ID or numeric ID if applicable
    return products.sort((a, b) => {
      const idA = Number(a.id) || 0;
      const idB = Number(b.id) || 0;
      if (idA && idB) return idA - idB;
      return a.id.localeCompare(b.id);
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

/**
 * Seed default products using a Firestore batch write
 */
async function seedProducts(defaultProducts: FlowerItem[]): Promise<void> {
  const path = "products";
  try {
    const batch = writeBatch(db);
    defaultProducts.forEach((product) => {
      const docRef = doc(db, path, product.id);
      batch.set(docRef, product);
    });
    await batch.commit();
    console.log(`Successfully seeded ${defaultProducts.length} default products to Firestore.`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Save or update a product document in Firestore
 */
export async function saveProductToFirestore(product: FlowerItem): Promise<void> {
  const path = `products/${product.id}`;
  try {
    await setDoc(doc(db, "products", product.id), product);
    console.log(`Product ${product.id} successfully saved to Firestore.`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Delete a product document from Firestore
 */
export async function deleteProductFromFirestore(productId: string): Promise<void> {
  const path = `products/${productId}`;
  try {
    await deleteDoc(doc(db, "products", productId));
    console.log(`Product ${productId} successfully deleted from Firestore.`);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
