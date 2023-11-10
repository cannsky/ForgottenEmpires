mergeInto(LibraryManager.library, {

  BuyPotion: async function(callbackObjectNameStr, callbackMethodNameStr) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const return = await buyPotion();
	console.log(return);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, return);
  },

  UsePotion: async function(callbackObjectNameStr, callbackMethodNameStr) {
  	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const return = await usePotion();
	console.log(return);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, return);
  },

  ConnectWallet: async function(callbackObjectNameStr, callbackMethodNameStr) {
  	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const return = await connectWallet();
	console.log(return);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, return);
  },

  DebugMessage: function(messageStr) {
	console.log(DebugMessage);
  }

});