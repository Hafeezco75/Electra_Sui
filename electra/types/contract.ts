// Contract Types based on Sui Move implementation

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

export interface MeterRegistry {
  id: string;
  initial_energy_units: number;
  total_users: number;
  owner: string;
}

export interface MeterAttestation {
  user_meter: string;
  attestor: string;
  attestor_signature: string;
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
  token_id: string;
  quantity: number;
}

export interface FraudFlag {
  user: string;
  meter_id: string;
  reason: string;
  timestamp: number;
}

export type UserRole = "producer" | "consumer";

export const CONTRACT_ADDRESS = "0x230be396e592d646cbe17e7a987afd1f18cf5676f48eab78471829605a653354";
export const NETWORK = "testnet";
