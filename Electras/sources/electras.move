module electras::electras;

use std::string;
use sui::event;
use sui::table;
use sui::coin::TreasuryCap;
use sui::coin::Coin;
use sui::sui::SUI;
use std::bcs;
use sui::object::{uid_to_inner};
use sui::dynamic_object_field as dof;
use sui::table::{Table, add, borrow_mut};
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

public struct Listing has key, store {
    id: UID,
    price: u64,
    seller: address,
}

public struct Marketplace<phantom SUI> has store {
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

public fun register_user(user: &signer, meter_id: string::String, unit_per_hour: u64, current_time: u64, user_address: address, ctx: &mut TxContext) {
    let id = object::new(ctx); 

    let user_meter = UserMeter {
        id,
        meter_id,
        user_address,
        unit_per_hour,
        timestamp: current_time, 
    };
    table::add(&mut user_meters, user_address, user_meter);
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
    let user_meter_bytes = object::id_to_bytes(&user_meter);
    vector::append(&mut bytes, user_meter_bytes);

    let kwh_bytes = bcs::to_bytes(&kwh); 
    vector::append(&mut bytes, kwh_bytes);

    let timestamp_bytes = bcs::to_bytes(&timestamp);
    vector::append(&mut bytes, timestamp_bytes);

    bytes
}

public fun post_attestation(attestation: &MeterAttestation, token: UID, signer: address, energy: u64, time: u64, public_key: vector<u8>): bool {
    let message = serialize_attestation(attestation.user_meter, attestation.kwh, attestation.timestamp);
    let is_valid = attestation.attestor == signer && ed25519_verify(
        &public_key,
        &message,
        &attestation.attestor_signature,
    );
    let obj_ids = uid_to_inner(&token);
    event::emit(MeterAttestationEvent{ user_meter: obj_ids, attestor: signer, kwh: energy, timestamp: time});
    object::delete(token);
    is_valid
}

public fun is_producer(producer_registry: &ProducerRegistry, producer_addr: address, ctx: &mut TxContext): bool{
    let is_producer: bool = table::contains(&producer_registry.producers, producer_addr);
    assert!(is_producer, ENotProducer);
    is_producer
}

public fun attestation_is_valid(attestation: &MeterAttestation, public_key: vector<u8>, current_time: u64, ctx: &mut TxContext): bool {
    let message = serialize_attestation(attestation.user_meter, attestation.kwh, attestation.timestamp);

    if (attestation.attestor == @0x0) {
        return false
    };

    let is_valid = ed25519_verify(
        &public_key,
        &message,
        &attestation.attestor_signature,
    );

    if (attestation.timestamp > current_time) {
        return false
    };
    is_valid
}

#[allow(lint(self_transfer))]
public fun mint_by_attestation(registry: &mut AttestationRegistry, producer_registry: &ProducerRegistry, attestor_hash: vector<u8>, amount: u64, time: u64, ctx: &mut TxContext) {

    let attestation = table::remove(&mut registry.attestations, attestor_hash);
    assert!(attestation_is_valid(&attestation, attestor_hash, time, ctx), EInvalidAttestation);

    let sender = ctx.sender();
    assert!(is_producer(producer_registry, sender, ctx), ENotProducer);

    let token = EnergyToken {
        id: object::new(ctx),
        amount: amount,
        producer: sender,
        attestation: attestation,
        status: 0,
    };
    let attestation_hash = token.attestation.attestor_signature;
    let kwh = token.attestation.kwh;
    let timestamp = token.attestation.timestamp;

    transfer::public_transfer(token, sender);

    event::emit(ProductionEvent {producer: sender, attestation_hash, kwh, timestamp});
}

public fun list_tokens<T: key + store>(marketplace: &mut Marketplace<SUI>, list_item: T, token: UID, quantity: u64, price: u64, seller: address, ctx: &mut TxContext) {
    let mut listing = Listing {
        id: object::new(ctx),
        price: price,
        seller: seller,
    };
    let token_ids = uid_to_inner(&token);
    dof::add<bool, T>(&mut listing.id, true, list_item);
    
    marketplace.items.add(uid_to_inner(&token), listing);
    event::emit(ListingEvent { token_id: token_ids, price: price, seller: seller});

    object::delete(token);
}

public fun buy_listing_tokens<T: key + store, SUI>(marketplace: &mut Marketplace<SUI>, buyer: address, listing_id: ID, paid: Coin<SUI>, ctx: &mut TxContext) {
    let Listing { mut id, price, seller } = marketplace.items.remove(listing_id);
    assert!(price == paid.value(), EAmountIncorrect);

    if (marketplace.payments.contains(seller)) {
        marketplace.payments.borrow_mut(seller).join(paid)
    } else {
        marketplace.payments.add(seller, paid)
    };
    let item = dof::remove<bool, T>(&mut id, true);
    id.delete();
    transfer::public_transfer(item, buyer);
}

public fun flag_fraud(registry: &mut FraudRegistry, user: address, object_id: ID, meter_id: string::String, reason: string::String, current_time: u64, _ctx: &mut TxContext) {
    let  fraud_report = FraudFlag {
        user: user,
        meter_id,
        reason,
        timestamp: current_time,
    };
    let users = fraud_report.user;
    let time = fraud_report.timestamp;

    if (registry.reports.contains(object_id)) {
        let reports = borrow_mut(&mut registry.reports, object_id);
        vector::push_back(reports, fraud_report);
    } else {
        let mut reports = vector::empty<FraudFlag>();
        vector::push_back(&mut reports, fraud_report);
        add(&mut registry.reports, object_id, reports);
    };
    event::emit(FraudAlertEvent { user: users, meter_id: meter_id, reason: reason, timestamp: time })
}


public fun transferEnergyToken() {}


