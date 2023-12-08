mergeInto(LibraryManager.library, {

  BP: async function(callbackObjectNameStr, callbackMethodNameStr) {
	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	console.log("test");
	const message = await buyPotion();
	console.log(message);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  UP: async function(callbackObjectNameStr, callbackMethodNameStr) {
  	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const message = await usePotion();
	console.log(message);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  CW: async function(callbackObjectNameStr, callbackMethodNameStr) {
  	const callbackObjectName = UTF8ToString(callbackObjectNameStr);
	const callbackMethodName = UTF8ToString(callbackMethodNameStr);
	const message = await connectWallet();
	console.log(message);
	unityGameInstance.SendMessage(callbackObjectName, callbackMethodName, message);
  },

  DebugMessage: function(messageStr) {
	const message = UTF8ToString(messageStr);
	console.log(message);
  }

});