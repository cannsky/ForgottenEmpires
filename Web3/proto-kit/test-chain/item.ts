// This code is not completed.
// This code is not audited.

import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod
} from "@proto-kit/module";

import {
    StateMap,
    assert
} from "@proto-kit/protocol";

import {
    PublicKey,
    Struct,
    UInt32,
    Bool
} from "o1js";

export class ItemKey extends Struct({
    owner: PublicKey,
    id: UInt32,
}) {}

export class ItemEntity extends Struct({
    statxp: UInt32,
    damage: UInt32,
    defense: UInt32,
    consumable: Bool,
    upgradable: Bool,
    consumed: Bool,
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

    @runtimeMethod()
    public upgradeDamage(address: PublicKey, id: UInt32) {
        // Get item
        const item = this.items.get(new ItemKey({ owner: address, id: id })).value;
        // Get current stat xp value of the item
        const currentStatXP = item.statxp;
        // Get current damage value of the item
        const currentDamage = item.damage;
        // Check if the stat xp is enough for an upgrade
        assert(currentStatXP.value.greaterThanOrEqual(1), "not enough stat xp");
        // Calculate new damage value of the item
        const newDamage = currentDamage.value.add(1);
        // Calculate new stat xp of the item
        const newStatXP = currentStatXP.value.sub(1);
        // Set new stat xp and damage value of the item
        this.items.set(
            new ItemKey({ owner: address, id: id }), 
            new ItemEntity({ 
                statxp: newStatXP, 
                damage: newDamage, 
                defense: item.defense,
                consumable: item.consumable,
                upgradable: item.upgradable,
                consumed: item.consumed,
             })
        );
    }

    @runtimeMethod()
    public upgradeDefense(address: PublicKey, id: UInt32) {
        // Get item
        const item = this.items.get(new ItemKey({ owner: address, id: id })).value;
        // Get current stat xp value of the item
        const currentStatXP = item.statxp;
        // Get current defense value of the item
        const currentDefense = item.defense;
        // Check if the stat xp is enough for an upgrade
        assert(currentStatXP.value.greaterThanOrEqual(1), "not enough stat xp");
        // Calculate new defense value of the item
        const newDefense = currentDefense.value.add(1);
        // Calculate new stat xp of the item
        const newStatXP = currentStatXP.value.sub(1);
        // Set new stat xp and defense value of the item
        this.items.set(
            new ItemKey({ owner: address, id: id }), 
            new ItemEntity({ 
                statxp: newStatXP, 
                damage: item.damage, 
                defense: newDefense,
                consumable: item.consumable,
                upgradable: item.upgradable,
                consumed: item.consumed,
            })
        );
    }

    // methods will be added later...
}