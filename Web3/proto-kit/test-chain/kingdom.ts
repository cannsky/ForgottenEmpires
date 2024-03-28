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
    UInt64,
    Provable,
    Bool
} from "o1js";

export class WarRequest extends Struct({
    kingdomoneid: UInt64,
    kingdomtwoid: UInt64,
    favor: UInt64,
    active: Bool,
}) {}

export class PeaceRequest extends Struct({
    warid: UInt64,
    kingdomoneid: UInt64,
    kingdomtwoid: UInt64,
    favorone: UInt64,
    favortwo: UInt64,
    active: Bool,
}) {}

export class KingdomWar extends Struct({
    kingdomoneid: UInt64,
    kingdomtwoid: UInt64,
    active: Bool
}) {}

export class KingdomEntity extends Struct({
    leader: PublicKey,
    memberCount: UInt64,
    warid: UInt64
}) {}

@runtimeModule()
export class Kingdom extends RuntimeModule<{}> {

    @state() public kingdoms = StateMap.from<UInt64, KingdomEntity>(UInt64, KingdomEntity);

    @state() public playerKingdoms = StateMap.from<PublicKey, UInt64>(PublicKey, UInt64);

    @state() public playerRequestVoteCounts = StateMap.from<PublicKey, UInt64>(PublicKey, UInt64);

    @state() public kingdomWarRequests = StateMap.from<UInt64, WarRequest> (UInt64, WarRequest);

    @state() public kingdomPeaceRequests = StateMap.from<UInt64, PeaceRequest> (UInt64, PeaceRequest);

    @state() public kingdomWars = StateMap.from<UInt64, KingdomWar> (UInt64, KingdomWar);

    @state() public kingdomCount = State.from<UInt64>(UInt64);

    @state() public kingdomWarCount = State.from<UInt64>(UInt64);

    @state() public kingdomWarRequestCount = State.from<UInt64>(UInt64);

    @state() public kingdomPeaceRequestCount = State.from<UInt64>(UInt64);

    @runtimeMethod()
    public changeKingdom(kingdomId: UInt64) {
        // Make sure player doesn't have a kingdom
        assert(this.playerKingdoms.get(this.transaction.sender).isSome.not(), "You cannot be in two kingdoms at the same time");
        // Check if there is a kingdom in the specified id
        assert(this.kingdoms.get(kingdomId).isSome, "There is no kingdom in the specified id");
        // Get player's current kingdom id
        const currentKingdomId = this.playerKingdoms.get(this.transaction.sender);
        // Check if the new kingdom is equal to old kingdom
        assert(currentKingdomId.equal(kingdomId).not(), "Selected kingdom cannot be the same kingdom");
        // Get kingdom
        const kingdom = this.kingdoms.get(kingdomId);
        // Get the member count of the kingdom
        const kingdomMemberCount = kingdom.memberCount;
        // Increase member count of the kingdom by 1
        const newKingdomMemberCount = kingdomMemberCount.add(1);
        // Update the kingdom with new member count
        this.kingdoms.set(
            kingdomId,
            new KingdomEntity({
                leader: kingdom.leader,
                memberCount: newKingdomMemberCount,
                warid: kingdom.warid
            })
        );
        // Set players kingdom
        this.playerKingdoms.set(
            this.transaction.sender,
            kingdomId
        )
    }

    @runtimeMethod()
    public newWarRequest(kingdomId: UInt64) {
        // Make sure player has a kingdom
        assert(this.playerKingdoms.get(this.transaction.sender).isSome, "You need to be in a kingdom");
        // Check if there is a kingdom in the specified id
        assert(this.kingdoms.get(kingdomId).isSome, "There is no kingdom in the specified id");
        // Get player's current kingdom id
        const currentKingdomId = this.playerKingdoms.get(this.transaction.sender);
        // Check if the new kingdom is equal to old kingdom
        assert(currentKingdomId.equal(kingdomId).not(), "Selected kingdom cannot be the same kingdom");
        // Get player kingdom id
        const playerKingdomId = this.playerKingdoms.get(this.transaction.sender);
        // Get kingdom war request count
        const currentWarRequestCount = this.kingdomWarRequestCount.get();
        // add 1 to current kingdom war request count
        const newWarRequestCount = currentWarRequestCount.add(1);
        // Create new war request
        this.kingdomWarRequests.set(
            newWarRequestCount,
            new WarRequest({
                kingdomoneid: playerKingdomId,
                kingdomtwoid: kingdomId,
                favor: UInt64.from(0),
                active: Bool(true)
            })
        );
    }

    @runtimeMethod()
    public newPeaceRequest(warId: UInt64) {
        // Make sure player has a kingdom
        assert(this.playerKingdoms.get(this.transaction.sender).isSome, "You need to be in a kingdom");
        // Check if there is a kingdom war in the specified id
        assert(this.kingdomWars.get(warId).isSome, "There is no kingdom war in the specified id");
        // Get war
        const kingdomWar = this.kingdomWars.get(warId).value;
        // Ensure player is in one of the kingdoms
        assert(this.playerKingdoms.get(this.transaction.sender).equal(kingdomWar.kingdomoneid)
            .or(this.playerKingdoms.get(this.transaction.sender).equal(kingdomWar.kingdomtwoid)), "You are not in any of the two kingdoms")
        // Get kingdom peace request count
        const currentPeaceRequestCount = this.kingdomPeaceRequestCount.get();
        // add 1 to current kingdom peace request count
        const newPeaceRequestCount = currentPeaceRequestCount.add(1);
        // Create new peace request
        this.kingdomPeaceRequests.set(
            newPeaceRequestCount,
            new PeaceRequest({
                warid: warId;
                kingdomoneid: kingdomWar.kingdomoneid,
                kingdomtwoid: kingdomWar.kingdomtwoid,
                favorone: UInt64.from(0),
                favortwo: UInt64.from(0),
                active: Bool(true)
            })
        );
    }

    @runtimeMethod()
    public favorWarRequest(warRequestId: UInt64, voteCount: UInt64) {
        // Make sure player has a kingdom
        assert(this.playerKingdoms.get(this.transaction.sender).isSome, "You need to be in a kingdom");
        // Check if there is a war request or not
        assert(this.kingdomWarRequests.get(warRequestId).isSome, "There is no war request in the given war request.")
        // Get the war request
        const warRequest = this.kingdomWarRequests.get(warRequestId).value;
        // Ensure war request is active
        assert(warRequest.active.equal(Bool(true)), "This war request is not active")
        // Make sure that player is in kingdom one
        assert(this.playerKingdoms.get(this.transaction.sender).equal(warRequest.kingdomoneid), "You are not in the same kingdom as this request");
        // Make sure kingdoms exits
        assert(this.kingdoms.get(warRequest.kingdomoneid).isSome
            .and(this.kingdoms.get(warRequest.kingdomtwoid).isSome), "Kingdoms don't exist");
        // Make sure that none of the kingdoms are at war
        assert(this.kingdoms.get(warRequest.kingdomoneid).value.warId.equal(UInt64.from(0))
            .and(this.kingdoms.get(warRequest.kingdomtwoid).value.warId.equal(UInt64.from(0))), "Each kingdom should be in peace to favor war request")
        // Ensure player has vote counts
        assert(this.playerRequestVoteCounts.get(this.transaction.sender).isSome, "You don't have vote counts");
        // Get player vote count
        const playerVoteCount = this.playerRequestVoteCounts.get(this.transaction.sender);
        // Ensure player has amount of counts available
        assert(playerVoteCount.greaterThanOrEqual(voteCount), "You don't have enough vote counts");
        // Decrease player vote count
        const newPlayerVoteCount = playerVoteCount.sub(voteCount);
        // Update player new vote count
        this.playerRequestVoteCounts.set(this.transaction.sender, newPlayerVoteCount);
        // Get war request favors
        const currentRequestFavors = warRequest.favor;
        // Add amount of new favors to the current request favors
        const newRequestFavors = currentRequestFavors.add(voteCount);
        // Update war request
        this.kingdomWarRequests.set(
            warRequestId,
            new WarRequest({
                kingdomoneid: warRequest.kingdomoneid,
                kingdomtwoid: warRequest.kingdomtwoid,
                favor: newRequestFavors,
                active: newRequest.active
            })
        );
        // Check if war request favor is less than 1000 or not
        assert(newRequestFavors.greaterThanOrEqual(1000), "Favor added but favor is still low.");
        // Get war count
        const currentWarCount = this.kingdomWarCount.get();
        // Increase war count by 1
        const newWarCount = currentWarCount.add(1);
        // Update new war count
        this.kingdomWarCount.set(newWarCount);
        // Create new war entity
        this.kingdomWars.set(
            newWarCount,
            new KingdomWar({
                kingdomoneid: warRequest.kingdomoneid,
                kingdomtwoid: warRequest.kingdomtwoid,
                active: Bool(true)
            })
        );
        // Get kingdom one
        const kingdomOne = this.kingdoms.get(warRequest.kingdomoneid).value;
        // Update kingdom one war id
        this.kingdoms.set(
            warRequest.kingdomoneid,
            new KingdomEntity({
                leader: kingdomOne.leader,
                memberCount: kingdomOne.memberCount,
                warid: newWarCount
            })
        );
        // Get kingdom two
        const kingdomTwo = this.kingdoms.get(warRequest.kingdomtwoid).value;
        // Update kingdom two war id
        this.kingdoms.set(
            warRequest.kingdomtwoid,
            new KingdomEntity({
                leader: kingdomTwo.leader,
                memberCount: kingdomTwo.memberCount,
                warid: newWarCount
            })
        );
        // Disable war request
        this.kingdomWarRequests.set(
            warRequestId,
            new WarRequest({
                kingdomoneid: warRequest.kingdomoneid,
                kingdomtwoid: warRequest.kingdomtwoid,
                favor: newRequestFavors,
                active: Bool(false)
            })
        );
    }

    @runtimeMethod()
    public favorPeaceRequest(peaceRequestId: UInt64, voteCount: UInt64) {
        // Make sure player has a kingdom
        assert(this.playerKingdoms.get(this.transaction.sender).isSome, "You need to be in a kingdom");
        // Check if there is a peace request or not
        assert(this.kingdomPeaceRequests.get(peaceRequestId).isSome, "There is no peace request in the given war request")
        // Get the peace request
        const peaceRequest = this.kingdomPeaceRequests.get(peaceRequestId).value;
        // Ensure peace request is active
        assert(peaceRequest.active.equal(Bool(true)), "This peace request is not active")
        // Make sure that player is in any of the kingdoms
        assert(this.playerKingdoms.get(this.transaction.sender).equal(peaceRequest.kingdomoneid)
            .or(this.playerKingdoms.get(this.transaction.sender).equal(peaceRequest.kingdomtwoid)), "You are not in any of the kingdoms");
        // Make sure kingdoms exits
        assert(this.kingdoms.get(peaceRequest.kingdomoneid).isSome
            .and(this.kingdoms.get(peaceRequest.kingdomtwoid).isSome), "Kingdoms don't exist");
        // Make sure that there is a war
        assert(this.kingdomWars.get(peaceRequest.warid).isSome, "There is no war with specified id");
        // Get kingdom war
        const kingdomWar = this.kingdomWars.get(peaceRequest.warid).value;
        // Make sure that the war is active
        assert(kingdomWar.active.equal(Bool(true)));
        // Make sure that peace request has the same kingdoms
        assert(peaceRequest.kingdomoneid.equal(kingdomWar.kingdomoneid)
            .and(peaceRequest.kingdomtwoid.equal(kingdomWar.kingdomtwoid)), "Peace request kingdoms don't match with kingdom war kingdoms");
        // Ensure player has vote counts
        assert(this.playerRequestVoteCounts.get(this.transaction.sender).isSome, "You don't have vote counts");
        // Get player vote count
        const playerVoteCount = this.playerRequestVoteCounts.get(this.transaction.sender);
        // Ensure player has amount of counts available
        assert(playerVoteCount.greaterThanOrEqual(voteCount), "You don't have enough vote counts");
        // Decrease player vote count
        const newPlayerVoteCount = playerVoteCount.sub(voteCount);
        // Update player new vote count
        this.playerRequestVoteCounts.set(this.transaction.sender, newPlayerVoteCount);
        // Get player kingdom
        const playerKingdom = this.playerKingdoms.get(this.transaction.sender).value;
        // Get favor one
        const currentFavorOne = peaceRequest.favorone;
        // Get favor two
        const currentFavorTwo = peaceRequest.favortwo
        // Increase favor one if player is in kingdom one
        const newFavorOne = Provable.if(playerKingdom.equal(peaceRequest.kingdomoneid),
            currentFavorOne.add(voteCount),
            currentFavorOne
        );
        // Increase favor two if player is in kingdom two
        const newFavorTwo = Provable.if(playerKingdom.equal(peaceRequest.kingdomtwoid),
            currentFavorTwo.add(voteCount),
            currentFavorTwo
        );
        // Update peace request
        this.kingdomPeaceRequests.set(
            peaceRequestId,
            new PeaceRequest({
                warid: peaceRequest.warid,
                kingdomoneid: peaceRequest.kingdomoneid,
                kingdomtwoid: peaceRequest.kingdomtwoid,
                favorone: newFavorOne,
                favortwo: newFavorTwo,
                active: peaceRequest.active
            })
        );
        // Check if both favors are greater than 1000 or not
        assert(newFavorOne.greaterThanOrEqual(1000).and(newFavorTwo.greaterThanOrEqual(1000)), "Both favors should be enough to make peace");
        // Finish battle between two kingdoms
        this.kingdomWars.set(
            peaceRequest.warid,
            new KingdomWar({
                kingdomoneid: kingdomWar.kingdomoneid,
                kingdomtwoid: kingdomWar.kingdomtwoid,
                active: Bool(false)
            })
        );
        // Get kingdom one
        const kingdomOne = this.kingdoms.get(peaceRequest.kingdomoneid).value;
        // Set kingdom one war id to zero for peace
        this.kingdoms.set(
            peaceRequest.kingdomoneid,
            new KingdomEntity({
                leader: kingdomOne.leader,
                memberCount: kingdomOne.memberCount,
                warid: UInt64.from(0)
            })
        );
        // Get kingdom two
        const kingdomTwo = this.kingdoms.get(peaceRequest.kingdomtwoid).value;
        // Set kingdom two war id to zero for peace
        this.kingdoms.set(
            peaceRequest.kingdomtwoid,
            new KingdomEntity({
                leader: kingdomTwo.leader,
                memberCount: kingdomTwo.memberCount,
                warid: UInt64.from(0)
            })
        );
        // Disable peace request
        this.kingdomPeaceRequests.set(
            peaceRequestId,
            new PeaceRequest({
                warid: peaceRequest.warid,
                kingdomoneid: peaceRequest.kingdomoneid,
                kingdomtwoid: peaceRequest.kingdomtwoid,
                favorone: newFavorOne,
                favortwo: newFavorTwo,
                active: Bool(false)
            })
        );
    }

    @runtimeMethod()
    public addPointsToWarRequest(warRequestId: UInt64) {

    }
}