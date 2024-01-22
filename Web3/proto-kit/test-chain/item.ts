// This code is not completed.
// This code is not audited.

import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod
} from "@proto-kit/module";

import {
    StateMap
} from "@proto-kit/protocol";

import {
    PublicKey,
    Struct,
    UInt32
} from "o1js";

export class ItemKey extends Struct({
    owner: PublicKey,
    id: UInt32,
    damage: UInt32,
    defense: UInt32,
}) {}

export class ItemEntity extends Struct({
    damage: UInt32,
}) {}

export class EquippedItemKey extends Struct({
    owner: PublicKey,
    slot: UInt32,
}) {}

export class EquippedItemEntity extends Struct({
    itemid: UInt32,
}) {}

@runtimeModule()
export class Item extends RuntimeModule<{}> {

    @state() public items = StateMap.from<ItemKey, ItemEntity>(ItemKey, ItemEntity);

    @state() public equippedItems = StateMap.from<EquippedItemKey, EquippedItemEntity>(EquippedItemKey, EquippedItemEntity);

    @runtimeMethod()
    public equipItem(address: PublicKey, equippeditemslot: UInt32, itemid: UInt32) {
        // Get inventory slot
        const equipmentSlot = this.equippedItems.get(new EquippedItemKey({ owner: address, slot: equippeditemslot }).value;
        // Get current item id of the inventory slot
        const currentItemID = equipmentSlot.itemid;
        // If this slot is full return error
        assert(currentItemID.value.greaterThanOrEqual(1), "This slot is already filled with an another item.");
        // Set the new item of the equipment slot
        this.equippedItems.set(
            new EquippedItemKey({ owner: address, slot: equipeditemslot }),
            new EquippedItemEntity({ itemid: itemid })
        );
    }

    @runtimeMethod()
    public unequipItem(address: PublicKey, equipeditemslot: UInt32) {
        // Get inventory slot
        const equipmentSlot = this.equippedItems.get(new EquippedItemKey({ owner: address, slot: equipeditemslot }).value;
        // Get current item id of the inventory slot
        const currentItemID = equipmentSlot.itemid;
        // If this slot is full return error
        assert(currentItemID.value.lessThanOrEqual(0), "This slot is already empty.");
        // Unequip the item from the equipment slot
        this.equippedItems.set(
            new EquippedItemKey({ owner: address, slot: equipeditemslot }),
            new EquippedItemEntity({ itemid: 0 })
        );
    }

    @runtimeMethod()
    public getEquippedItem(address: PublicKey, equipeditemslot: UInt32) {
        // Return item id of the equipment Slot
        return this.equippedItems.get(new EquippedItemKey({ owner: address, slot: equipeditemslot })).value.itemid;
    }

    // methods will be added later...
}