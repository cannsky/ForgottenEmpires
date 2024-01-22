// This code is not completed.
// This code is not audited.

import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod,
} from "@proto-kit/module";

import {
    StateMap,
    assert
} from "@proto-kit/protocol";

import {
    PublicKey,
    Struct,
    UInt32
} from "o1js";

export class InventoryKey extends Struct({
    owner: PublicKey,
    id: UInt32,
}) {}

export class InventoryEntity extends Struct({
    itemid: UInt32
}) {}

@runtimeModule()
export class PlayerInventory extends RuntimeModule<{}> {

    @state() public playerInventorySlots = StateMap.from<InventoryKey, InventoryEntity>(InventoryKey, InventoryEntity);

    // For testing
    @runtimeMethod()
    public addItem(address: PublicKey, inventoryslotid: UInt32, itemid: UInt32) {
        // Get inventory slot
        const inventorySlot = this.playerInventorySlots.get(new InventoryKey({ owner: address, id: inventoryslotid }).value;
        // Get current item of the inventory slot
        const currentItemID = inventorySlot.itemid;
        // If this slot is full return error
        assert(currentItemID.value.greaterThanOrEqual(1), "This slot is already filled with an another item.");
        // Set the new item of the inventory slot
        this.playerInventorySlots.set(
            address, 
            new InventoryEntity({ itemid: itemid })
        );
    }

    // methods will be added later...
}