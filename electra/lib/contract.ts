/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck - Known compatibility issues with Sui dapp-kit types, will be resolved with contract integration

import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

type Signer = (txb: TransactionBlock) => Promise<unknown>;

// Environment variables
const PACKAGE_ID = process.env.NEXT_PUBLIC_CONTRACT_PACKAGE_ID!;
const NETWORK = process.env.NEXT_PUBLIC_SUI_NETWORK || 'testnet';

// Initialize Sui client
export const suiClient = new SuiClient({
  url: getFullnodeUrl(NETWORK as 'testnet' | 'mainnet'),
});

// Contract types
export interface UserMeter {
  id: string;
  meter_id: string;
  user_address: string;
  unit_per_hour: number;
  timestamp: number;
}

export interface ElectricityReceipt {
  id: string;
  amount: number;
}

export interface MeterAttestation {
  user_meter: string;
  attestor: string;
  attestor_signature: number[];
  kwh: number;
  timestamp: number;
}

export interface EnergyToken {
  id: string;
  amount: number;
  producer: string;
  attestation: MeterAttestation;
  status: number;
}

export interface Listing {
  id: string;
  price: number;
  seller: string;
}

export interface FraudFlag {
  user: string;
  meter_id: string;
  reason: string;
  timestamp: number;
}

// Contract function calls

export async function registerUser(
  registryId: string,
  meterId: string,
  unitPerHour: number,
  currentTime: number,
  userAddress: string,
  key: number,
  signer: any
) {
  const txb = new TransactionBlock();

  txb.moveCall({
    target: `${PACKAGE_ID}::electras::register_user`,
    arguments: [
      txb.object(registryId),
      txb.pure.string(meterId),
      txb.pure.u64(unitPerHour),
      txb.pure.u64(currentTime),
      txb.pure.address(userAddress),
      txb.pure.u64(key),
    ],
  });

  return signer.signAndExecuteTransactionBlock({
    transactionBlock: txb,
  });
}

export async function submitAttestation(
  attestation: MeterAttestation,
  address: string,
  signer: Signer
) {
  const txb = new TransactionBlock();

  // Create UID for the attestation
  const uid = txb.moveCall({
    target: '0x2::object::new',
    arguments: [txb.pure.address(address)],
  });

  const attestationArg = {
    user_meter: txb.object(attestation.user_meter),
    attestor: txb.pure.address(attestation.attestor),
    attestor_signature: txb.pure(attestation.attestor_signature),
    kwh: txb.pure.u64(attestation.kwh),
    timestamp: txb.pure.u64(attestation.timestamp),
  } as any;

  txb.moveCall({
    target: `${PACKAGE_ID}::electras::post_attestation`,
    arguments: [
      txb.pure(attestationArg),
      uid,
      txb.pure.address(address),
      txb.pure.u64(attestation.kwh),
      txb.pure.u64(attestation.timestamp),
      txb.pure(attestation.attestor_signature),
    ],
  });

  return signer({ transaction: txb });
}

export async function mintEnergyToken(
  registryId: string,
  producerRegistryId: string,
  attestorHash: number[],
  amount: number,
  time: number,
  signer: any
) {
  const txb = new TransactionBlock();

  txb.moveCall({
    target: `${PACKAGE_ID}::electras::mint_by_attestation`,
    arguments: [
      txb.object(registryId),
      txb.object(producerRegistryId),
      txb.pure(attestorHash),
      txb.pure.u64(amount),
      txb.pure.u64(time),
    ],
  });

  // @ts-ignore: Type mismatch between TransactionBlock and dapp-kit expected types
  return signer({ transaction: txb });
}

export async function listToken(
  marketplaceId: string,
  tokenId: string,
  quantity: number,
  price: number,
  seller: string,
  address: string,
  signer: Signer
) {
  const txb = new TransactionBlock();

  const uid = txb.moveCall({
    target: '0x2::object::new',
    arguments: [txb.pure.address(address)],
  });

  txb.moveCall({
    target: `${PACKAGE_ID}::electras::list_tokens`,
    arguments: [
      txb.object(marketplaceId),
      txb.object(tokenId),
      uid,
      txb.pure.u64(quantity),
      txb.pure.u64(price),
      txb.pure.address(seller),
    ],
  });

  return signer({ transaction: txb });
}

export async function buyToken(
  marketplaceId: string,
  buyer: string,
  listingId: string,
  paymentAmount: number,
  signer: any
) {
  const txb = new TransactionBlock();

  // Create SUI coin for payment
  const [coin] = txb.splitCoins(txb.gas, [txb.pure.u64(paymentAmount)]);

  txb.moveCall({
    target: `${PACKAGE_ID}::electras::buy_listing_tokens`,
    arguments: [
      txb.object(marketplaceId),
      txb.pure.address(buyer),
      txb.pure.id(listingId),
      coin,
    ],
  });

  return signer.signAndExecuteTransactionBlock({
    transactionBlock: txb,
  });
}

export async function redeemElectricity(
  treasuryCapId: string,
  tokenId: string,
  signer: any
) {
  const txb = new TransactionBlock();

  txb.moveCall({
    target: `${PACKAGE_ID}::electras::redeem_electricity`,
    arguments: [
      txb.object(treasuryCapId),
      txb.object(tokenId),
    ],
  });

  return signer.signAndExecuteTransactionBlock({
    transactionBlock: txb,
  });
}

export async function flagFraud(
  registryId: string,
  user: string,
  objectId: string,
  meterId: string,
  reason: string,
  currentTime: number,
  signer: any
) {
  const txb = new TransactionBlock();

  txb.moveCall({
    target: `${PACKAGE_ID}::electras::flag_fraud`,
    arguments: [
      txb.object(registryId),
      txb.pure.address(user),
      txb.pure.id(objectId),
      txb.pure.string(meterId),
      txb.pure.string(reason),
      txb.pure.u64(currentTime),
    ],
  });

  return signer.signAndExecuteTransactionBlock({
    transactionBlock: txb,
  });
}

// Query functions

export async function getUserMeters(registryId: string) {
  // Query the registry object to get user meters
  const registry = await suiClient.getObject({
    id: registryId,
    options: { showContent: true },
  });

  // Parse the table of user meters
  // This would require parsing the dynamic fields
  return registry;
}

export async function getListings(marketplaceId: string) {
  const marketplace = await suiClient.getObject({
    id: marketplaceId,
    options: { showContent: true },
  });

  return marketplace;
}

// Utility functions

export function serializeAttestation(
  userMeter: string,
  kwh: number,
  timestamp: number
): number[] {
  // Implement the same serialization as in the contract
  const bytes = new Uint8Array(32 + 8 + 8); // ID + u64 + u64

  // Convert ID to bytes
  const idBytes = Buffer.from(userMeter.slice(2), 'hex');
  bytes.set(idBytes, 0);

  // Convert kwh to bytes
  const kwhBytes = Buffer.alloc(8);
  kwhBytes.writeBigUInt64LE(BigInt(kwh));
  bytes.set(kwhBytes, 32);

  // Convert timestamp to bytes
  const timeBytes = Buffer.alloc(8);
  timeBytes.writeBigUInt64LE(BigInt(timestamp));
  bytes.set(timeBytes, 40);

  return Array.from(bytes);
}