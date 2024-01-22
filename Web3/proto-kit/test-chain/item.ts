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
}) {}

export class ItemEntity extends Struct({
    damage: UInt32,
}) {}

export class EquipedItemKey extends Struct({
    owner: PublicKey,
    slot: UInt32
}) {}

export class EquipedItemEntity extends Struct({
    itemid: UInt32
}) {}

@runtimeModule()
export class Item extends RuntimeModule<{}> {

    @state() public items = StateMap.from<ItemKey, ItemEntity>(ItemKey, ItemEntity);

    @state() public equipedItems = StateMap.from<EquipedItemKey, EquipedItemEntity>(EquipedItemKey, EquipedItemEntity);

    @runtimeMethod()
    public equipItem(address: PublicKey, equipeditemslot: UInt32, itemid: UInt32) {
        // Get inventory slot
        const equipmentSlot = this.equipedItems.get(new EquipedItemKey({ owner: address, slot: equipeditemslot }).value;
        // Get current item id of the inventory slot
        const currentItemID = equipmentSlot.itemid;
        // If this slot is full return error
        assert(currentItemID.value.greaterThanOrEqual(1), "This slot is already filled with an another item.");
        // Set the new item of the equipment slot
        this.equipedItems.set(
            address, 
            new EquipedItemEntity({ itemid: itemid })
        );
    }

    @runtimeMethod()
    public unEquipItem(address: PublicKey, equipeditemslot: UInt32) {
        // Get inventory slot
        const equipmentSlot = this.equipedItems.get(new EquipedItemKey({ owner: address, slot: equipeditemslot }).value;
        // Get current item id of the inventory slot
        const currentItemID = equipmentSlot.itemid;
        // If this slot is full return error
        assert(currentItemID.value.lessThanOrEqual(0), "This slot is already empty.");
        // Unequip the item from the equipment slot
        this.equipedItems.set(
            address, 
            new EquipedItemEntity({ itemid: 0 })
        );
    }

    @runtimeMethod()
    public getEquipmentSlotItem(address: PublicKey, equipeditemslot: UInt32) {
        // Return item id of the equipment Slot
        return this.equipedItems.get(new EquipedItemKey({ owner: address, slot: equipeditemslot }).value.itemid;
    }

    // methods will be added later...
}