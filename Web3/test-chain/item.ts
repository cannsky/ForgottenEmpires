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
    type: UInt32,
    value: UInt32,
}) {}

export class EquippedItemKey extends Struct({
    owner: PublicKey,
    slot: UInt32,
}) {}

export class EquippedItemEntity extends Struct({
    itemid: UInt32,
}) {}

export class ConsumedItemKey extends Struct({
    owner: PublicKey,
    itemid: UInt32,
}) {}

export class ConsumedItemEntity extends Struct({
    type: UInt32,
    value: UInt32,
}) {}

@runtimeModule()
export class Item extends RuntimeModule<{}> {

    @state() public items = StateMap.from<ItemKey, ItemEntity>(ItemKey, ItemEntity);

    @state() public equippedItems = StateMap.from<EquippedItemKey, EquippedItemEntity>(EquippedItemKey, EquippedItemEntity);

    @state() public consumedItems = StateMap.from<ConsumedItemKey, ConsumedItemEntity>(ConsumedItemKey, ConsumedItemEntity);

    @state() public itemCount = State.from<UInt32>(UInt32);

    @runtimeMethod()
    public newItem(itemType: UInt32) {
        // Check if item type is lower than 2, if zero type it is a removed item (or consumed?)
        assert(itemType.value.lessThanOrEqual(2), "There are only 2 item types in the game.");
        // Get item count
        const itemCount = this.itemCount.get();
        // Add 1 to item count
        itemCount.value.add(1);
        // Update item count
        this.itemCount.set(itemCount);
        // Add new item to the address
        this.items.set(
            new ItemKey({ 
                owner: this.transaction.sender, 
                id: itemCount
            }),
            new ItemEntity({ 
                statxp: UInt32.from(1), 
                damage: UInt32.from(1), 
                defense: UInt32.from(1),
                consumable: Bool(false),
                upgradable: Bool(true),
                consumed: Bool(false),
                type: UInt32.from(itemType),
                value: UInt32.from(0),
            })
        );
    }

    @runtimeMethod()
    public equipItem(equippeditemslot: UInt32, itemid: UInt32) {
        // Check if there is an item with item id on the player or not
        assert(this.items.get(new ItemKey({ 
            owner: this.transaction.sender, 
            id: itemid 
        })).isSome, "there is no item specified for this address");
        // Get inventory slot
        const equipmentSlot = this.equippedItems.get(new EquippedItemKey({ owner: this.transaction.sender, slot: equippeditemslot }).value;
        // Get current item id of the inventory slot
        const currentItemID = equipmentSlot.itemid;
        // If this slot is full return error
        assert(currentItemID.value.greaterThanOrEqual(1), "This slot is already filled with an another item.");
        // Set the new item of the equipment slot
        this.equippedItems.set(
            new EquippedItemKey({ owner: this.transaction.sender, slot: equipeditemslot }),
            new EquippedItemEntity({ itemid: itemid })
        );
    }

    @runtimeMethod()
    public unequipItem(equipeditemslot: UInt32) {
        // Get inventory slot
        const equipmentSlot = this.equippedItems.get(new EquippedItemKey({ owner: this.transaction.sender, slot: equipeditemslot }).value;
        // Get current item id of the inventory slot
        const currentItemID = equipmentSlot.itemid;
        // If this slot is full return error
        assert(currentItemID.value.lessThanOrEqual(0), "This slot is already empty.");
        // Unequip the item from the equipment slot
        this.equippedItems.set(
            new EquippedItemKey({ owner: this.transaction.sender, slot: equipeditemslot }),
            new EquippedItemEntity({ itemid: UInt32.from(0) })
        );
    }

    @runtimeMethod()
    public getEquippedItem(equipeditemslot: UInt32) {
        // Return item id of the equipment Slot
        return this.equippedItems.get(new EquippedItemKey({ owner: this.transaction.sender, slot: equipeditemslot })).value.itemid;
    }

    @runtimeMethod()
    public upgradeDamage(id: UInt32) {
        // Check if there is an item with item id on the player or not
        assert(this.items.get(new ItemKey({ 
            owner: this.transaction.sender, 
            id: id 
        })).isSome, "there is no item specified for this address");
        // Get item
        const item = this.items.get(new ItemKey({ owner: this.transaction.sender, id: id })).value;
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
            new ItemKey({ owner: this.transaction.sender, id: id }), 
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
    public upgradeDefense(id: UInt32) {
        // Check if there is an item with item id on the player or not
        assert(this.items.get(new ItemKey({ 
            owner: this.transaction.sender, 
            id: id 
        })).isSome, "there is no item specified for this address");
        // Get item
        const item = this.items.get(new ItemKey({ owner: this.transaction.sender, id: id })).value;
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
            new ItemKey({ owner: this.transaction.sender, id: id }), 
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
    public consumeItem(id: UInt32) {
        // Check if there is an item with item id on the player or not
        assert(this.items.get(new ItemKey({ 
            owner: this.transaction.sender, 
            id: id 
        })).isSome, "there is no item specified for this address");
        // Get item
        const item = this.items.get(new ItemKey({ owner: this.transaction.sender, id: id })).value;
        // Get item's consumable value
        const isConsumable = item.consumable;
        // Check if item is consumable or not
        assert(isConsumable.not(), "this item is not consumable");
        // Get is item consumed or not
        const isConsumed= item.consumed;
        // Check if item is consumed or not
        assert(isConsumed.not(), "this item is already consumed");
        // Get current type of the item
        const type = item.type;
        // Get current value of the item
        const value = item.value;
        // Consume item
        this.items.set(
            new ItemKey({ owner: this.transaction.sender, id: id }), 
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
            new ConsumedItemKey({ owner: this.transaction.sender, id: id }), 
            new ConsumedItemEntity({ 
                type: item.type,
                value: item.value,
            })
        );
    }

    @runtimeMethod()
    public getTotalItemDamage(ItemOwner: PublicKey, itemId: UInt32) {
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
        // Get item level
        const itemLevel = item.level;
        // Get item damage
        const itemDamage = item.damage;
        // Get total damage
        const totalDamage = itemDamage.mul(itemLevel);
        // Return total damage calculated
        return totalDamage;
    }

    @runtimeMethod()
    public getTotalItemDefense(itemOwner: PublicKey, itemId: UInt32) {
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
        // Get item level
        const itemLevel = item.level;
        // Get item defense
        const itemDefense = item.defense;
        // Get total defense
        const totalDefense = itemDefense.mul(itemLevel);
        // Return total damage calculated
        return totalDefense;
    }

    // methods will be added later...
}