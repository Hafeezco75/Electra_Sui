module electras::electras;

use std::string;
use sui::event;
use sui::table;
use sui::coin::TreasuryCap;
use sui::token;
use sui::coin::Coin;
use sui::sui::SUI;
use sui::transfer;
use std::bcs;
use sui::dynamic_object_field as dof;
use sui::table::{Table, new, add, borrow_mut};
use sui::ed25519::ed25519_verify;

public struct ELECTRICITY has key, store {
    id: UID,
}

const EInvalidAttestation: u64 = 1;
const EAmountIncorrect: u64 = 2;
const ENotProducer: u64 = 3;

/// A receipt for redeemed electricity
public struct ElectricityReceipt has key, store {
    id: UID,
    amount: u64,
}

public struct UserMeter has key, store {
    id: UID,
    meter_id: string::String,
    user_address: address,
    unit_per_hour: u64,
    timestamp: u64,
}

public struct MeterAttestation has store {
    user_meter: ID,
    attestor: address,
    attestor_signature: vector<u8>,
    kwh: u64,
    timestamp: u64
}

public struct AttestationRegistry has key {
    id: UID,
    attestations: Table<vector<u8>, MeterAttestation>,
}

public struct EnergyToken has key, store {
    id: UID,
    amount: u64,
    producer: address,
    attestation: MeterAttestation,
    status: u8,
}

public struct FraudFlag has store {
    user: address,
    meter_id: string::String,
    reason: string::String,
    timestamp: u64,
}

public struct FraudRegistry has key {
    id: UID,
    reports: Table<ID, vector<FraudFlag>>,
}

public struct Listing has store {
    token_id: ID,
    price: u64,
    seller: address,
}

public struct Marketplace has store {
    items: Table<ID, Listing>,
    seller_address: address,
    token_quantity: u64,
    price_per_token: u64,
    expiry_time: u64,
    payments: Table<address, Coin<SUI>>,
}

public struct Escrow has key, store {
    id: UID,
    buyer: address,
    seller: address,
    status: u8,
}

public struct ProducerRegistry has key {
    id: UID,
    producers: Table<address, bool>,
}

public struct ProductionEvent has copy, drop {
    producer: address,
    attestation_hash: vector<u8>,
    kwh: u64,
    timestamp: u64,
}

public struct MeterAttestationEvent has copy, drop {
    user_meter: ID,
    attestor: address,
    kwh: u64,
    timestamp: u64,
}
public struct ListingEvent has copy, drop {
    token_id: ID,
    price: u64,
    seller: address,
}
public struct PurchaseEvent has copy, drop {

}
public struct RedeemEvent has copy, drop, store {
    redeemer: address,
    amount: u64,
}
public struct FraudAlertEvent has copy, drop {
    user: address,
    meter_id: string::String,
    reason: string::String,
    timestamp: u64,    
}

public fun mint_electricity(cap: &mut TreasuryCap<ELECTRICITY>, amount: u64, ctx: &mut TxContext): Coin<ELECTRICITY> {
    sui::coin::mint<ELECTRICITY>(cap, amount, ctx)
}

public fun redeem_electricity(cap: &mut TreasuryCap<ELECTRICITY>, token: Coin<ELECTRICITY>, ctx: &mut TxContext): ElectricityReceipt {
    let amount = sui::coin::value(&token);
    sui::coin::burn<ELECTRICITY>(cap, token);
    ElectricityReceipt { id: object::new(ctx), amount }
}

public fun initialize(platform_owner: address, oracle: address) {

}

fun serialize_attestation(user_meter: ID, kwh: u64, timestamp: u64): vector<u8> {
    let mut bytes = vector::empty<u8>();

    // Add user_meter (ID is 32 bytes)
    let user_meter_bytes = object::id_to_bytes(&user_meter); // You may need to implement this
    vector::append(&mut bytes, user_meter_bytes);

    // Add kwh as bytes
    let kwh_bytes = bcs::to_bytes(&kwh); 
    vector::append(&mut bytes, kwh_bytes);

    // Add timestamp as bytes
    let timestamp_bytes = bcs::to_bytes(&timestamp);
    vector::append(&mut bytes, timestamp_bytes);

    bytes
}

public fun post_attestation(attestation: &MeterAttestation, signer: address, public_key: vector<u8>): bool {
    let message = serialize_attestation(attestation.user_meter, attestation.kwh, attestation.timestamp);
    attestation.attestor == signer && ed25519_verify(
        &public_key,
        &message,
        &attestation.attestor_signature,
    )
}

public fun is_producer(producer_registry: &ProducerRegistry, producer_addr: address, ctx: &mut TxContext): bool{
    let sender = ctx.sender();
    let is_producer: bool = table::contains(&producer_registry.producers, producer_addr);
    assert!(is_producer, ENotProducer);
    is_producer
}

public fun attestation_is_valid(ctx: &mut TxContext) {

}

public fun mint_by_attestation(registry: &AttestationRegistry, producer_registry: &ProducerRegistry, attestor_hash: vector<u8>, amount: u64, ctx: &mut TxContext) {

    let attestation = table::borrow(&registry.attestations, attestor_hash);
    assert!(attestation_is_valid(&attestation), EInvalidAttestation);

    let sender = ctx.sender();
    assert!(is_producer(producer_registry, sender, ctx), ENotProducer);

    let token = EnergyToken {
        id: object::new(ctx),
        amount: amount,
        producer: sender,
        attestation: *attestation,
        status: 0,
    };
    transfer::public_transfer(token, sender);

    event::emit(ProductionEvent {producer: sender, attestation_hash: token.attestation.attestor_signature, kwh: token.attestation.kwh, timestamp: token.attestation.timestamp,});
}

public fun list_tokens(marketplace: &mut Marketplace, token: ID, quantity: u64, price: u64, seller: address, ctx: &mut TxContext) {
    let item_id: object::id(&item)
    let mut listing = Listing {
        token_id: object::id(&token),
        price: price,
        seller: seller,
    };
    dof::add(&mut listing.token_id, true, it);
    marketplace.items.add(item_id, listing);
    event::emit(ListingEvent { token_id: token, price: price, seller: seller})
}

public fun buy_listing_tokens(marketplace: &mut Marketplace, buyer: address, listing_id: ID, payment: u64, ctx: &mut TxContext) {
    let Listing { token_id, price, seller } = marketplace.items.remove(listing_id);
    assert!(price == paid.value(), EAmountIncorrect);
    if (marketplace.payments.contains(seller)) {
        marketplace.payments.borrow_mut(seller).join(paid)
    } else {
        marketplace.payments.add(seller, paid)
    };
    let item = dof::remove(&mut id, true);
    id.delete();
    item
}


public fun flag_fraud(registry: &mut FraudRegistry, user: address, object_id: ID, meter_id: string::String, reason: string::String, evidence_hash: vector<u8>, ctx: &mut TxContext) {
    let  fraud_report = FraudFlag {
        user: user,
        meter_id,
        reason,
        timestamp,
    };
    if (registry.reports.contains(object_id)) {
        let reports = borrow_mut(&mut registry.reports, object_id);
        vector::push_back(reports, fraud_report);
    } else {
        let mut reports = vector::empty<FraudFlag>();
        vector::push_back(&mut reports, fraud_report);
        add(&mut registry.reports, object_id, reports);
    };
    event::emit(FraudAlertEvent { user: fraud_report.user, meter_id: meter_id, reason: reason, timestamp: fraud_report.timestamp })
}

public fun mintEnergyToken() {}


public fun redeemEnergyToken() {}


public fun transferEnergyToken() {}


