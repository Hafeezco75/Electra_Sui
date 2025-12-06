module electras::oracles;


use sui::event;
//use sui::sui::SUI;
use stork::state::{StorkState, get_stork_sui_address};
use stork::stork::get_temporal_numeric_value_unchecked;

const ELECTRICITY_RATE_PER_KWH_NAIRA: u64 = 209500; // in naira (1 SUI = 1_000_000_000 mist)

const DEFAULT_USER_WATTS_WH: u64 = 100; // Default user_units in Watt-hours (Wh)
const KWH_TO_WATTHOUR: u64 = 1000; // 1 kWh = 1000 Wh
const ELECTRICITY_RATE_PER_WH_NAIRA: u64 = ELECTRICITY_RATE_PER_KWH_NAIRA / KWH_TO_WATTHOUR; 

//const ELECTRICITY_RATE_PER_HOUR: u64 = ₦209.50/kWh.

public fun default_user_watts_wh(): u64 {
    DEFAULT_USER_WATTS_WH
}

public struct TemporalNumericValueEvent has copy, drop {
    timestamp_ns: u64,
    magnitude: u128,
    negative: bool,
}

public struct SinglePriceFeeInMistEvent has copy, drop {
    price_in_mist: u64,
}

public struct SuiStorkAddressEvent has copy, drop {
    user_address: address,
}

public fun calculate_electricity_cost_in_mist(usage_in_wh: u64): u64 {
    let cost_in_mist = usage_in_wh * ELECTRICITY_RATE_PER_WH_NAIRA; // in mist
    cost_in_mist
}

public fun calculate_electricity_cost_in_sui(usage_in_wh: u64): u64 {
    let cost_in_mist = calculate_electricity_cost_in_mist(usage_in_wh);
    let cost_in_sui = cost_in_mist / 1_000_000_000; // convert mist to SUI
    cost_in_sui
}

public fun get_temporal_value_unchecked(stork_state: &mut StorkState, feed_data: vector<u8>, ctx: &mut TxContext) {
    let price = get_temporal_numeric_value_unchecked(stork_state, feed_data);

    let timestamp = price.get_timestamp_ns();
    let i128 = price.get_quantized_value();

    let magnitude = i128.get_magnitude();
    let negative = i128.is_negative();

    event::emit(TemporalNumericValueEvent {
        timestamp_ns: timestamp,
        magnitude: magnitude,
        negative: negative,
    });
}


public fun get_single_price_fee_in_mist(stork_state: &StorkState): u64 {
    let price_in_mist = get_single_price_fee_in_mist(stork_state);

    event::emit(SinglePriceFeeInMistEvent {
        price_in_mist: price_in_mist,
    });

    price_in_mist
}

public fun get_user_sui_address(stork_state: &StorkState): address {
    let stork_sui_address = get_stork_sui_address(stork_state);

    event::emit(SuiStorkAddressEvent {
        user_address: stork_sui_address,
    });
    stork_sui_address
}

// public fun single(id: vector<u8>, temporal_numeric_value_timestamp_ns: u64, temporal_numeric_value_magnitude: u128,
//         temporal_numeric_value_negative: bool, publisher_merkle_root: vector<u8>,
//         value_compute_alg_hash: vector<u8>, r: vector<u8>, s: vector<u8>, v: u8,
//     ): UpdateTemporalNumericValueEvmInput {
//         id,
//         temporal_numeric_value_timestamp_ns,
//         temporal_numeric_value_magnitude,
//         temporal_numeric_value_negative,
//         publisher_merkle_root,
//         value_compute_alg_hash,
//         r,
//         s,
//         v,
//     }