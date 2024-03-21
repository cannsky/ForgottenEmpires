mergeInto(LibraryManager.library, {

  JSCreateGuild: async function(callbackObjectNameStr, callbackMethodNameStr) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const message = await createGuild();
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  JSJoinGuild: async function(callbackObjectNameStr, callbackMethodNameStr, guildID) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const message = await joinGuild(guildID);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  JSLeaveGuild: async function(callbackObjectNameStr, callbackMethodNameStr, guildID) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const message = await leaveGuild(guildID);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  JSCreateTeam: async function(callbackObjectNameStr, callbackMethodNameStr) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const message = await createTeam();
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  JSInvitePlayerToTeam: async function(callbackObjectNameStr, callbackMethodNameStr, playerAddressStr, teamID) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const playerAddress = UTF8ToString(playerAddressStr);
	const message = await invitePlayerToTeam(playerAddress, teamID);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  JSLeaveTeam: async function(callbackObjectNameStr, callbackMethodNameStr, teamID) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const message = await leaveTeam(teamID);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  JSChangeWorld async function(callbackObjectNameStr, callbackMethodNameStr, characterID, worldID) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const message = await changeWorld(characterID, worldID);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  JSUpgradeFireRune async function(callbackObjectNameStr, callbackMethodNameStr) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const message = await upgradeFireRune();
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  JSUpgradeWaterRune async function(callbackObjectNameStr, callbackMethodNameStr) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const message = await upgradeWaterRune();
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  JSUpgradeAirRune async function(callbackObjectNameStr, callbackMethodNameStr) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const message = await upgradeAirRune();
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  JSUpgradeEarthRune async function(callbackObjectNameStr, callbackMethodNameStr) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const message = await upgradeEarthRune();
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  DebugMessage: function(messageStr) {
	const message = UTF8ToString(messageStr);
	console.log(message);
  }

});