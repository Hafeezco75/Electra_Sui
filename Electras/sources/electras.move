module electras::electras;

use std::string;
use sui::event;
use sui::coin::TreasuryCap;
use sui::token;
use sui::tx_context;
use sui::table::{Table, new, add, borrow_mut};
use sui::crypto::{verify_signature, PublicKey, Signature};
use sui::ed25519::ed25519_verify;

public struct ELECTRICITY has key, store {}

/// A receipt for redeemed electricity
public struct ElectricityReceipt has key, store {
    id: object::ID,
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
}

public struct Escrow has key, store {
    id: ID,
    buyer: address,
    seller: address,
    status: u8,
}

public struct ProducerRegistry has key {
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

public fun mint_electricity(amount: u64, ctx: &mut TxContext): Token<ELECTRICITY> {
    token::mint<ELECTRICITY>(amount, ctx)
}

public fun redeem_electricity(token: Token<ELECTRICITY>, ctx: &mut TxContext): ElectricityReceipt {
    let amount = token::value(&token);
    let _burned = token::spend(token, ctx);
    ElectricityReceipt { id: object::new(ctx), amount }
}


public fun initialize(platform_owner: address, oracle: address) {

}

public fun post_attestation(attestation: &MeterAttestation, signer: address, public_key: PublicKey): bool {
    attestation.attestor == signer && ed25519_verify(
        &attestation.attestor_signature,
        &attestation.user_meter,
        &attestation.kwh,
        &attestation.timestamp,
    )
}

public fun is_producer(producer_addr: address): bool{
    let sender = ctx.sender();
    let is_producer = table::contains(&producer_registry.producers, &sender);
    assert!(is_producer, ENotProducer);
}

public fun mint_by_attestation(attestor_hash: vector<u8>, ctx: &mut TxContext) {

    let attestation = table::borrow(&registry.attestations, &attestor_hash);
    assert!(attestation_is_valid(&attestation), EInvalidAttestation);

    let sender = ctx.sender();
    assert!(is_producer(sender), ENotProducer);

    let token = EnergyToken {
        id: object::new(ctx),
        amount: u64,
        producer: sender,
        attestation: attestation,
        status: 0,
    };
    move_to(sender, token);

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
    event::emit(ListingEvent { token_id: ID, price: u64, seller: address,})
}

public fun buy_listing_tokens<T: key + store, marketplace: &mut Marketplace>(buyer: address, listing_id: ID, payment: u64, ctx: &mut TxContext) {
    let Listing { token_id, price, seller } = marketplace.items.remove()
    assert!(price == paid.value(), EAmountIncorrect);
    if (marketplace.payment.contains(seller)) {
        marketplace.payment.borrow_mut(seller).join()
    } else {
        marketplace.payments.add(seller, paid)
    };
    let item = dof::remove(&mut id, true);
    id.delete();
    item
}


public fun flag_fraud(registry: &mut FraudRegistry, object_id: ID, meter_id: string::String, reason: string::String, evidence_hash: vector<u8>, ctx: &mut TxContext) {
    let  fraud_report = FraudFlag {
        user: address,
        meter_id,
        reason,
        timestamp: ctx.timestamp(),
    };
    if (registry.reports.contains(object_id)) {
        let reports = borrow_mut(&mut registry.reports, object_id);
        vector::push_back(reports, fraud_report);
    } else {
        let mut reports = vector::empty<FraudFlag>();
        vector::push_back(&mut reports, fraud_report);
        add(&mut registry.reports, object_id, reports);
    };
    event::emit(FraudAlertEvent { user: address, meter_id: string::String, reason: string::String, timestamp: u64 })
}

public fun mintEnergyToken() {}


public fun redeemEnergyToken() {}


public fun transferEnergyToken() {}


