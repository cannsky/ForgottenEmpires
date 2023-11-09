mergeInto(LibraryManager.library, {

  BuyPotion: async function(callbackObjectNameStr, callbackMethodNameStr) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, "wallet:0");
  },

  UsePotion: async function(callbackObjectNameStr, callbackMethodNameStr) {
  	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, "wallet:0");
  },

  ConnectWallet: async function(callbackObjectNameStr, callbackMethodNameStr) {
  	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, "wallet:0");
  }

});