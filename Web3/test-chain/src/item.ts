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
    State,
    assert
} from "@proto-kit/protocol";

import {
    UInt64
} from "@proto-kit/library";

import {
    PublicKey,
    Struct,
    Bool
} from "o1js";

export class ItemKey extends Struct({
    owner: PublicKey,
    id: UInt64,
}) {}

export class ItemEntity extends Struct({
    statxp: UInt64,
    damage: UInt64,
    defense: UInt64,
    consumable: Bool,
    upgradable: Bool,
    consumed: Bool,
    type: UInt64,
    value: UInt64,
}) {}

export class EquipedItemKey extends Struct({
    owner: PublicKey,
    slot: UInt64,
}) {}

export class EquipedItemEntity extends Struct({
    itemid: UInt64,
}) {}

export class ConsumedItemKey extends Struct({
    owner: PublicKey,
    itemid: UInt64,
}) {}

export class ConsumedItemEntity extends Struct({
    type: UInt64,
    value: UInt64,
}) {}

@runtimeModule()
export class Item extends RuntimeModule<{}> {

    @state() public items = StateMap.from<ItemKey, ItemEntity>(ItemKey, ItemEntity);

    @state() public equipedItems = StateMap.from<EquipedItemKey, EquipedItemEntity>(EquipedItemKey, EquipedItemEntity);

    @state() public consumedItems = StateMap.from<ConsumedItemKey, ConsumedItemEntity>(ConsumedItemKey, ConsumedItemEntity);

    @state() public itemCount = State.from<UInt64>(UInt64);

    @runtimeMethod()
    public newItem(itemType: UInt64) {
        // Check if item type is lower than 2, if zero type it is a removed item (or consumed?)
        assert(itemType.lessThanOrEqual(UInt64.from(2)), "There are only 2 item types in the game.");
        // Get item count
        const itemCount = this.itemCount.get().value;
        // Add 1 to item count
        const newItemCount = UInt64.from(itemCount).add(UInt64.from(1));
        // Update item count
        this.itemCount.set(newItemCount);
        // Add new item to the address
        this.items.set(
            new ItemKey({ 
                owner: this.transaction.sender.value, 
                id: newItemCount
            }),
            new ItemEntity({ 
                statxp: UInt64.from(1), 
                damage: UInt64.from(1), 
                defense: UInt64.from(1),
                consumable: Bool(false),
                upgradable: Bool(true),
                consumed: Bool(false),
                type: UInt64.from(itemType),
                value: UInt64.from(1),
            })
        );
    }

    @runtimeMethod()
    public equipItem(equipeditemslot: UInt64, itemid: UInt64) {
        // Check if there is an item with item id on the player or not
        assert(this.items.get(new ItemKey({ 
            owner: this.transaction.sender.value, 
            id: itemid
        })).isSome, "there is no item specified for this address");
        // Get inventory slot
        const equipmentSlot = this.equipedItems.get(new EquipedItemKey({ owner: this.transaction.sender.value, slot: equipeditemslot })).value;
        // Get current item id of the inventory slot
        const currentItemID = equipmentSlot.itemid;
        // If this slot is full return error
        assert(currentItemID.lessThan(UInt64.from(1)), "This slot is already filled with an another item.");
        // Set the new item of the equipment slot
        this.equipedItems.set(
            new EquipedItemKey({ owner: this.transaction.sender.value, slot: equipeditemslot }),
            new EquipedItemEntity({ itemid: itemid })
        );
    }

    @runtimeMethod()
    public unequipItem(equipeditemslot: UInt64) {
        // Get inventory slot
        const equipmentSlot = this.equipedItems.get(new EquipedItemKey({ owner: this.transaction.sender.value, slot: equipeditemslot })).value;
        // Get current item id of the inventory slot
        const currentItemID = equipmentSlot.itemid;
        // If this slot is full return error
        assert(currentItemID.greaterThan(UInt64.from(0)), "This slot is already empty.");
        // Unequip the item from the equipment slot
        this.equipedItems.set(
            new EquipedItemKey({ owner: this.transaction.sender.value, slot: equipeditemslot }),
            new EquipedItemEntity({ itemid: UInt64.from(UInt64.from(0)) })
        );
    }

    @runtimeMethod()
    public getEquippedItem(equipeditemslot: UInt64) {
        // Return item id of the equipment Slot
        return this.equipedItems.get(new EquipedItemKey({ owner: this.transaction.sender.value, slot: equipeditemslot })).value.itemid;
    }

    @runtimeMethod()
    public upgradeDamage(id: UInt64) {
        // Check if there is an item with item id on the player or not
        assert(this.items.get(new ItemKey({ 
            owner: this.transaction.sender.value, 
            id: id
        })).isSome, "there is no item specified for this address");
        // Get item
        const item = this.items.get(new ItemKey({ owner: this.transaction.sender.value, id: id })).value;
        // Get current stat xp value of the item
        const currentStatXP = item.statxp;
        // Get current damage value of the item
        const currentDamage = item.damage;
        // Check if the stat xp is enough for an upgrade
        assert(currentStatXP.greaterThanOrEqual(UInt64.from(1)), "not enough stat xp");
        // Calculate new damage value of the item
        const newDamage = UInt64.from(currentDamage).add(UInt64.from(1));
        // Calculate new stat xp of the item
        const newStatXP = UInt64.from(currentStatXP).sub(UInt64.from(1));
        // Set new stat xp and damage value of the item
        this.items.set(
            new ItemKey({ owner: this.transaction.sender.value, id: id }), 
            new ItemEntity({ 
                statxp: newStatXP, 
                damage: newDamage, 
                defense: item.defense,
                consumable: item.consumable,
                upgradable: item.upgradable,
                consumed: item.consumed,
                type: item.type,
                value: item.value,
             })
        );
    }

    @runtimeMethod()
    public upgradeDefense(id: UInt64) {
        // Check if there is an item with item id on the player or not
        assert(this.items.get(new ItemKey({ 
            owner: this.transaction.sender.value, 
            id: id 
        })).isSome, "there is no item specified for this address");
        // Get item
        const item = this.items.get(new ItemKey({ owner: this.transaction.sender.value, id: id })).value;
        // Get current stat xp value of the item
        const currentStatXP = item.statxp;
        // Get current defense value of the item
        const currentDefense = item.defense;
        // Check if the stat xp is enough for an upgrade
        assert(currentStatXP.greaterThanOrEqual(UInt64.from(1)), "not enough stat xp");
        // Calculate new defense value of the item
        const newDefense = UInt64.from(currentDefense).add(UInt64.from(1));
        // Calculate new stat xp of the item
        const newStatXP = UInt64.from(currentStatXP).sub(UInt64.from(1));
        // Set new stat xp and defense value of the item
        this.items.set(
            new ItemKey({ owner: this.transaction.sender.value, id: id }), 
            new ItemEntity({ 
                statxp: newStatXP, 
                damage: item.damage, 
                defense: newDefense,
                consumable: item.consumable,
                upgradable: item.upgradable,
                consumed: item.consumed,
                type: item.type,
                value: item.value,
            })
        );
    }

    @runtimeMethod()
    public consumeItem(id: UInt64) {
        // Check if there is an item with item id on the player or not
        assert(this.items.get(new ItemKey({ 
            owner: this.transaction.sender.value, 
            id: id 
        })).isSome, "there is no item specified for this address");
        // Get item
        const item = this.items.get(new ItemKey({ owner: this.transaction.sender.value, id: id })).value;
        // Get item's consumable value
        const isConsumable = item.consumable;
        // Check if item is consumable or not
        assert(isConsumable.not(), "this item is not consumable");
        // Get is item consumed or not
        const isConsumed= item.consumed;
        // Check if item is consumed or not
        assert(isConsumed.not(), "this item is already consumed");
        // Consume item
        this.items.set(
            new ItemKey({ owner: this.transaction.sender.value, id: id }), 
            new ItemEntity({ 
                statxp: item.statxp, 
                damage: item.damage, 
                defense: item.defense,
                consumable: item.consumable,
                upgradable: item.upgradable,
                consumed: Bool(true),
                type: item.type,
                value: item.value,
            })
        );
        // Add consumed item to the consumed items
        this.consumedItems.set(
            new ConsumedItemKey({ owner: this.transaction.sender.value, itemid: id }), 
            new ConsumedItemEntity({ 
                type: item.type,
                value: item.value,
            })
        );
    }

    @runtimeMethod()
    public getTotalItemDamage(itemOwner: PublicKey, itemId: UInt64) {
        // Check if there is an item or not at specified item key
        assert(this.items.get(new ItemKey({ 
            owner: itemOwner, 
            id: itemId
        })).isSome, "you don't have the specified item");
        // Get item
        const item = this.items.get(new ItemKey({ 
            owner: itemOwner, 
            id: itemId
        })).value;
        // Get item value
        const itemValue = item.value;
        // Get item damage
        const itemDamage = item.damage;
        // Get total damage
        const totalDamage = UInt64.from(itemDamage).mul(UInt64.from(itemValue));
        // Return total damage calculated
        return totalDamage;
    }

    @runtimeMethod()
    public getTotalItemDefense(itemOwner: PublicKey, itemId: UInt64) {
        // Check if there is an item or not at specified item key
        assert(this.items.get(new ItemKey({ 
            owner: itemOwner, 
            id: itemId
        })).isSome, "you don't have the specified item");
        // Get item
        const item = this.items.get(new ItemKey({ 
            owner: itemOwner, 
            id: itemId
        })).value;
        // Get item value
        const itemValue = item.value;
        // Get item defense
        const itemDefense = item.defense;
        // Get total defense
        const totalDefense = UInt64.from(itemDefense).mul(UInt64.from(itemValue));
        // Return total damage calculated
        return totalDefense;
    }
}